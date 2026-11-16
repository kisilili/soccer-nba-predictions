export default async function SoccerPage() {
  const apiKey = process.env.ODDS_API_KEY;

  let message = "Loading...";
  let matches: any[] = [];

  if (!apiKey) {
    message = "Odds API key is missing";
  } else {
    try {
      const res = await fetch(
        `https://api.the-odds-api.com/v4/sports/soccer_epl/odds/?regions=uk&markets=h2h&oddsFormat=decimal&apiKey=${apiKey}`,
        {
          next: { revalidate: 300 }, // cache for 5 minutes
        }
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        matches = data;
        message = `Found ${matches.length} Premier League matches`;
      } else {
        message = JSON.stringify(data, null, 2);
      }
    } catch (err) {
      message = "Failed to fetch data";
    }
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold text-green-900">Soccer Predictions</h1>
      <p className="text-sm text-gray-600">Premier League – Upcoming matches & odds</p>

      <div className="bg-gray-100 p-3 rounded text-xs mb-4">
        <pre>{message}</pre>
      </div>

      {matches.length > 0 ? (
        <div className="space-y-4">
          {matches.map((match) => {
            const bookmaker = match.bookmakers?.[0];
            const market = bookmaker?.markets?.[0];
            const outcomes = market?.outcomes || [];

            return (
              <div
                key={match.id}
                className="bg-white border border-green-800 rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>{match.sport_title}</span>
                  <span>
                    {new Date(match.commence_time).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="font-medium text-lg mb-3">
                  {match.home_team} vs {match.away_team}
                </div>

                {outcomes.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    {outcomes.map((outcome: any) => (
                      <div
                        key={outcome.name}
                        className="bg-green-50 border border-green-200 rounded p-2"
                      >
                        <div className="text-gray-600 text-xs">{outcome.name}</div>
                        <div className="font-bold text-green-800">{outcome.price}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          No upcoming matches found at the moment.
        </p>
      )}
    </div>
  );
}
