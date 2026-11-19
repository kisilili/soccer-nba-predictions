export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-green-900 text-white rounded-xl p-6 md:p-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          Soccer & NBA Predictions
        </h1>
        <p className="text-green-100 text-sm md:text-base max-w-xl mx-auto">
          Free daily predictions based on bookmaker odds. 
          Clear predicted winners for Premier League and NBA games.
        </p>
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          href="/soccer"
          className="bg-white border-2 border-green-800 rounded-xl p-6 hover:bg-green-50 transition"
        >
          <h2 className="text-xl font-bold text-green-900 mb-2">
            Soccer Predictions
          </h2>
          <p className="text-gray-600 text-sm">
            Premier League matches with predicted winners and odds.
          </p>
        </a>

        <a
          href="/nba"
          className="bg-white border-2 border-green-800 rounded-xl p-6 hover:bg-green-50 transition"
        >
          <h2 className="text-xl font-bold text-green-900 mb-2">
            NBA Predictions
          </h2>
          <p className="text-gray-600 text-sm">
            Upcoming NBA games with predicted winners and odds.
          </p>
        </a>
      </section>

      {/* How it works */}
      <section className="bg-white border border-green-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-green-900 mb-3">
          How predictions work
        </h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• We collect odds from major bookmakers</li>
          <li>• The team with the lowest odds is marked as the predicted winner</li>
          <li>• Confidence level is shown (Strong Favorite / Favorite / Slight Favorite)</li>
          <li>• Data updates automatically</li>
        </ul>
      </section>

      {/* Disclaimer */}
      <section className="text-center text-xs text-gray-500 px-4">
        <p>
          This website is for entertainment purposes only. 
          Predictions are based on bookmaker odds and are not financial or betting advice. 
          Please gamble responsibly.
        </p>
      </section>
    </div>
  );
}
