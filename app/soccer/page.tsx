export default async function SoccerPage() {
  const apiKey = process.env.API_FOOTBALL_KEY;

  let message = "No data yet";
  let matches: any[] = [];

  if (!apiKey) {
    message = "API key is missing";
  } else {
    try {
      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split("T")[0];

      const res = await fetch(
        `https://v3.football.api-sports.io/fixtures?date=${today}&league=39`,
        {
          headers: {
            "x-apisports-key": apiKey,
          },
          next: { revalidate: 300 },
        }
      );

      const data = await res.json();

      if (data?.errors && Object.keys(data.errors).length > 0) {
        message = JSON.stringify(data.errors, null, 2);
      } else if (data?.response) {
        matches = data.response;
        message = `Found ${matches.length} matches`;
      } else {
        message = JSON.stringify(data, null, 2);
      }
    } catch (err) {
      message = "Fetch failed";
    }
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold text-green-900">Soccer Predictions</h1>
      <p className="text-sm text-gray-600">Premier League – Today</p>

      <div className="bg-gray-100 p-3 rounded text-xs">
        <pre>{message}</pre>
      </div>

      {matches.length > 0 ? (
        <div className="space-y-3">
          {matches.map((match: any) => (
            <div
              key={match.fixture.id}
              className="bg-white border border-green-800 rounded-lg p-4"
            >
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>{match.league.name}</span>
                <span>
                  {new Date(match.fixture.date).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex justify-between font-medium">
                <span>{match.teams.home.name}</span>
                <span className="text-gray-400">vs</span>
                <span>{match.teams.away.name}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-6">
          No Premier League matches scheduled for today.
        </p>
      )}
    </div>
  );
}
