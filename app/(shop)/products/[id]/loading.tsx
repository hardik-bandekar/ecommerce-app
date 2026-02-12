export default function Loading() {
  return (
    <div className="p-8 max-w-4xl mx-auto animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="h-80 bg-gray-300 rounded"></div>

        <div className="space-y-6">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-20 bg-gray-300 rounded"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}
