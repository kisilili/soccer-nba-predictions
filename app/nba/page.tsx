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
        <h2 className="text-2xl font-bold text-green-900">NBA Predictions</h2>
        <p className="text-gray-600 text-sm mt-1">
          Upcoming NBA games – Predictions based on bookmaker odds
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
            const away = outcomes.find((o: any) => o.name === match.
