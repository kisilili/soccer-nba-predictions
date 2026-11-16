export default async function SoccerPage() {
  const apiKey = process.env.ODDS_API_KEY;

  let matches: any[] = [];
  let errorMessage = "";

  if (!apiKey) {
    errorMessage = "API key is missing";
  } else {
    try {
      const res = await fetch(
        `https://api.the-odds-api.com/v4/sports/soccer_epl/odds/?regions=uk&markets=h2h&oddsFormat=decimal&apiKey=${apiKey}`,
        {
          next: { revalidate: 300 },
        }
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        matches = data;
      } else {
        errorMessage = data?.message || "Failed to load matches";
      }
    } catch (err) {
      errorMessage = "Failed to fetch data";
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-green-900">Soccer Predictions</h2>
        <p className="text-gray-600 text-sm mt-1">
          Premier League – Upcoming matches & odds
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
            const bookmaker = match.bookmakers?.[0];
            const market = bookmaker?.markets?.[0];
            const outcomes = market?.outcomes || [];

            // Sort outcomes: Home - Draw - Away
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

                <div className="text-center font-semibold text-lg mb-4">
                  {match.home_team}{" "}
                  <span className="text-gray-400 font-normal">vs</span>{" "}
                  {match.away_team}
                </div>

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
            No upcoming Premier League matches at the moment.
          </div>
        )
      )}
    </div>
  );
}
