export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-green-900 text-white rounded-2xl p-6 md:p-8 text-center shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          Soccer & NBA Predictions
        </h1>
        <p className="text-green-100 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Free daily predictions based on bookmaker odds.
          Clear predicted winners for Premier League and NBA games.
        </p>
      </section>

      {/* Quick Links */}
      <section className="grid grid-cols-1 gap-4">
        <a
          href="/soccer"
          className="block bg-white border border-green-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-green-900 mb-1">
                Soccer Predictions
              </h2>
              <p className="text-gray-600 text-sm">
                Premier League matches with predicted winners and odds.
              </p>
            </div>
            <span className="text-green-800 font-medium text-sm whitespace-nowrap ml-3">
              View →
            </span>
          </div>
        </a>

        <a
          href="/nba"
          className="block bg-white border border-green-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-green-900 mb-1">
                NBA Predictions
              </h2>
              <p className="text-gray-600 text-sm">
                Upcoming NBA games with predicted winners and odds.
              </p>
            </div>
            <span className="text-green-800 font-medium text-sm whitespace-nowrap ml-3">
              View →
            </span>
          </div>
        </a>
      </section>

      {/* How it works */}
      <section className="bg-white border border-green-200 rounded-2xl p-5 shadow-sm">
        <h2 className="text-lg font-bold text-green-900 mb-3">
          How predictions work
        </h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2">
            <span className="text-green-700">•</span>
            <span>We collect odds from major bookmakers</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-700">•</span>
            <span>The team with the lowest odds is marked as the predicted winner</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-700">•</span>
            <span>Confidence level is shown (Strong Favorite / Favorite / Slight Favorite)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-700">•</span>
            <span>Data updates automatically</span>
          </li>
        </ul>
      </section>

      {/* Disclaimer */}
      <section className="text-center text-xs text-gray-500 px-2">
        <p>
          This website is for entertainment purposes only.
          Predictions are based on bookmaker odds and are not financial or betting advice.
          Please gamble responsibly.
        </p>
      </section>
    </div>
  );
}
