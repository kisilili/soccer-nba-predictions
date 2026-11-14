export default function SoccerPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-green-900">Soccer Predictions</h2>
      <p className="text-gray-600">
        Upcoming matches and odds will appear here soon.
      </p>
      <div className="bg-white border border-green-800 rounded-lg shadow p-6 text-center text-gray-500">
        Data loading... (we will connect the free APIs next)
      </div>
    </div>
  );
}
