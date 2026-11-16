async function getSoccerFixtures() {
  const apiKey = process.env.API_FOOTBALL_KEY;

  if (!apiKey) {
    return { error: "API key not found in environment variables" };
  }

  try {
    const response = await fetch(
      "https://v3.football.api-sports.io/fixtures?next=10&league=39",
      {
        headers: {
          "x-apisports-key": apiKey,
        },
        next: { revalidate: 3600 },
      }
    );

    const data = await response.json();

    // Return the full response so we can see errors
    return data;
  } catch (error) {
    return { error: "Failed to fetch data from API" };
  }
}

export default async function SoccerPage() {
  const data = await getSoccerFixtures();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-green-900">Soccer Predictions</h2>
      <p className="text-gray-600 text-sm">
        Upcoming Premier League matches
      </p>

      {/* Show raw response for debugging */}
      <div className="bg-gray-100 p-4 rounded text-xs overflow-auto">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>

      {data?.errors && Object.keys(data.errors).length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          API Error: {JSON.stringify(data.errors)}
        </div>
      )}

      {data?.response?.length > 0 ? (
        <div className="space-y-3">
          {data.response.map((match: any) => (
            <div
              key={match.fixture.id}
              className="bg-white border border-green-800 rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span>{match.league.name}</span>
                <span>
                  {new Date(match.fixture.date).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center font-medium">
                <span>{match.teams.home.name}</span>
                <span className="text-gray-400">vs</span>
                <span>{match.teams.away.name}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-green-800 rounded-lg shadow p-6 text-center text-gray-500">
          No upcoming matches found.
        </div>
      )}
    </div>
  );
}
