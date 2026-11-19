export default async function SoccerPage() {
  const apiKey = process.env.ODDS_API_KEY;

  let matches: any[] = [];
  let errorMessage = "";

  if (!apiKey) {
    errorMessage = "API key is missing";
  } else {
    try {
      // Fetch multiple leagues
      const leagues = [
        "soccer_epl",                 // Premier League
        "soccer_uefa_champs_league",  // Champions League
        "soccer_spain_la_liga",       // La Liga
      ];

      const results = await Promise.all(
        leagues.map((league) =>
          fetch(
            `https://api.the-odds-api.com/v4/sports/\( {league}/odds/?regions=uk&markets=h2h&oddsFormat=decimal&apiKey= \){apiKey}`,
            { next: { revalidate: 300 } }
          ).then((res) => res.json())
        )
      );

      // Combine all matches
      matches = results
        .filter((data) => Array.isArray(data))
        .flat();

      // Sort by commence time
      matches.sort(
        (a, b) =>
          new Date(a.commence_time).getTime() -
          new Date(b.commence_time).getTime()
      );
    } catch (err) {
      errorMessage = "Failed to fetch data";
    }
  }

  function getPrediction(match: any) {
    const bookmaker = match.bookmakers?.[0];
    const market = bookmaker?.markets?.[0];
    const outcomes = market?.outcomes || [];

    if (outcomes.length === 0) return null;

    const sorted = [...outcomes].sort((a: any, b: any) => a.price - b.price);
    const favorite = sorted[0];

    let confidence = "Slight Favorite";
    if (favorite.price <= 1.40) confidence = "Strong Favorite";
    else if (favorite.price <= 1.90) confidence = "Favorite";

    return {
      winner: favorite.name,
      confidence,
      odds: favorite.price,
    };
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-green-900">Soccer Predictions</h2>
        <p className="text-gray-600 text-sm mt-1">
          Premier League • Champions League • La Liga
        </p>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}

      {matches.length > 0 ? (
        <div className="space-y-4">
          {matches.map((match) => {
            const prediction = getPrediction(match);
            const bookmaker = match.bookmakers?.[0];
            const market = bookmaker?.markets?.[0];
            const outcomes = market?.outcomes || [];

            const home = outcomes.find((o: any) => o.name === match.home_team);
            const draw = outcomes.find((o: any) => o.name === "Draw");
            const away = outcomes.find((o: any) => o.name === match.away_team);

            return (
              <div
                key={match.id}
                className="bg-white border border-green-800 rounded-xl p-5 shadow-sm"
              >
                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                  <span className="font-medium">{match.sport_title}</span>
                  <span>
                    {new Date(match.commence_time).toLocaleString("en-GB", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="text-center font-semibold text-lg mb-3">
                  {match.home_team}{" "}
                  <span className="text-gray-400 font-normal">vs</span>{" "}
                  {match.away_team}
                </div>

                {prediction && (
                  <div className="bg-green-900 text-white rounded-lg p-3 mb-4 text-center">
                    <div className="text-xs uppercase tracking-wide opacity-80">
                      Predicted Winner
                    </div>
                    <div className="text-lg font-bold mt-1">
                      {prediction.winner}
                    </div>
                    <div className="text-sm mt-1 opacity-90">
                      {prediction.confidence} • Odds {prediction.odds}
                    </div>
                  </div>
                )}

                {outcomes.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-600 mb-1">Home</div>
                      <div className="font-bold text-green-800 text-lg">
                        {home?.price ?? "-"}
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-600 mb-1">Draw</div>
                      <div className="font-bold text-green-800 text-lg">
                        {draw?.price ?? "-"}
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-600 mb-1">Away</div>
                      <div className="font-bold text-green-800 text-lg">
                        {away?.price ?? "-"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        !errorMessage && (
          <div className="text-center py-12 text-gray-500">
            No upcoming matches at the moment.
          </div>
        )
      )}
    </div>
  );
}
