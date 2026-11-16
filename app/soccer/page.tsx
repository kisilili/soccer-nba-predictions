export default async function SoccerPage() {
  const apiKey = process.env.API_FOOTBALL_KEY;

  let message = "No data yet";

  if (!apiKey) {
    message = "API key is missing";
  } else {
    try {
      const res = await fetch(
        "https://v3.football.api-sports.io/fixtures?next=5&league=39",
        {
          headers: {
            "x-apisports-key": apiKey,
          },
          next: { revalidate: 60 },
        }
      );

      const data = await res.json();
      message = JSON.stringify(data, null, 2);
    } catch (err) {
      message = "Fetch failed";
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Soccer Debug</h1>
      <pre className="bg-gray-100 p-4 text-xs overflow-auto whitespace-pre-wrap">
        {message}
      </pre>
    </div>
  );
}
