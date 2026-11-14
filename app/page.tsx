export default function Home() {
  return (
    <div className="space-y-6">
      <section className="bg-white border border-green-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-green-900 mb-2">Welcome</h2>
        <p className="text-gray-700">
          Free soccer and NBA predictions & odds aggregator.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Data updates automatically. This site is for entertainment purposes only.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          href="/soccer"
          className="bg-green-800 text-white rounded-lg p-6 text-center hover:bg-green-900 transition"
        >
          <h3 className="text-xl font-bold">Soccer Predictions</h3>
          <p className="text-sm mt-1 opacity-90">Major leagues & odds</p>
        </a>

        <a
          href="/nba"
          className="bg-green-800 text-white rounded-lg p-6 text-center hover:bg-green-900 transition"
        >
          <h3 className="text-xl font-bold">NBA Predictions</h3>
          <p className="text-sm mt-1 opacity-90">Games & odds</p>
        </a>
      </div>
    </div>
  );
}
