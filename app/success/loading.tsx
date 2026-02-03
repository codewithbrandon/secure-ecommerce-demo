export default function SuccessLoading() {
  return (
    <div className="container-default py-12 animate-pulse">
      {/* Success header skeleton */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-secondary-200 rounded-full mx-auto mb-6" />
        <div className="h-10 w-64 bg-secondary-200 rounded-xl mx-auto mb-4" />
        <div className="h-5 w-96 bg-secondary-200 rounded-lg mx-auto" />
      </div>

      {/* Security info card skeleton */}
      <div className="card p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-secondary-200 rounded-lg" />
          <div className="h-7 w-64 bg-secondary-200 rounded-lg" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary-200 rounded-lg" />
                <div className="h-5 w-32 bg-secondary-200 rounded" />
              </div>
              <div className="h-4 w-full bg-secondary-200 rounded" />
              <div className="space-y-1">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-secondary-200 rounded" />
                    <div className="h-3 w-40 bg-secondary-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical details skeleton */}
      <div className="bg-secondary-100 rounded-2xl p-8 mb-8">
        <div className="h-6 w-48 bg-secondary-200 rounded-lg mb-6" />
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-5 w-40 bg-secondary-200 rounded" />
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-secondary-200 rounded" />
                  <div className="h-4 w-48 bg-secondary-200 rounded" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CTA skeleton */}
      <div className="flex justify-center">
        <div className="h-12 w-48 bg-secondary-200 rounded-xl" />
      </div>
    </div>
  );
}
