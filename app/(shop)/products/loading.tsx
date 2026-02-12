export default function Loading() {
  return (
    <div className="p-8">
      <div className="animate-pulse space-y-6">
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border p-4 rounded shadow space-y-4">
              <div className="h-40 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
