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

    // Find the outcome with the lowest odds (favorite)
    const sorted = [...outcomes].sort((a: any, b: any) => a.price - b.price);
    const favorite = sorted[0];
    const second = sorted[1];

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
          Premier League – Predictions based on bookmaker odds
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

                {/* Prediction Box */}
                {prediction && (
                  <div className="bg
