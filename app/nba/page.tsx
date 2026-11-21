export default async function NbaPage() {
  const apiKey = process.env.ODDS_API_KEY;
  let matches: any[] = [];
  let errorMessage = "";

  if (!apiKey) {
    errorMessage = "API key is missing";
  } else {
    try {
      const res = await fetch(
        `https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?regions=us&markets=h2h&oddsFormat=decimal&apiKey=${apiKey}`,
        { next: { revalidate: 300 } }
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

  function getPrediction(match: any) {
    const outcomes = match.bookmakers?.[0]?.markets?.[0]?.outcomes || [];
    if (outcomes.length === 0) return null;

    const sorted = [...outcomes].sort((a: any, b: any) => a.price - b.price);
    const favorite = sorted[0];
    const odds = favorite.price;

    let confidence = "Slight Favorite";
    if (odds <= 1.40) confidence = "Strong Favorite";
    else if (odds <= 1.90) confidence = "Favorite";

    const probability = Math.round((1 / odds) * 100);

    return {
      winner: favorite.name,
      confidence,
      odds,
      probability,
    };
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-green-900">NBA Predictions</h2>
        <p className="text-gray-600 text-sm mt-1">
          Upcoming NBA games – Predictions based on bookmaker odds
        </p>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm">
          {errorMessage}
        </div>
      )}

      {matches.length > 0 ? (
        <div className="space-y-4">
          {matches.map((match) => {
            const prediction = getPrediction(match);
            const outcomes = match.bookmakers?.[0]?.markets?.[0]?.outcomes || [];
            const home = outcomes.find((o: any) => o.name === match.home_team);
            const away = outcomes.find((o: any) => o.name === match.away_team);

            return (
              <div key={match.id} className="bg-white border border-green-800 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between text-sm text-gray-500 mb-3">
                  <span>NBA</span>
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
                  {match.home_team} <span className="text-gray-400">vs</span> {match.away_team}
                </div>

                {prediction && (
                  <div className="bg-green-900 text-white rounded-xl p-4 mb-4 text-center">
                    <
