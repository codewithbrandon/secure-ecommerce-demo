import { HeroSkeleton, ProductGridSkeleton } from '@/components/Skeleton';

export default function HomeLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero Skeleton */}
      <HeroSkeleton />

      {/* Content Skeleton */}
      <div className="container-default py-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="h-6 w-32 bg-secondary-200 rounded-full mx-auto mb-4" />
          <div className="h-10 w-64 bg-secondary-200 rounded-xl mx-auto mb-4" />
          <div className="h-5 w-96 bg-secondary-200 rounded-lg mx-auto" />
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card p-8">
              <div className="w-14 h-14 bg-secondary-200 rounded-2xl mb-5" />
              <div className="h-6 w-3/4 bg-secondary-200 rounded-lg mb-3" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-secondary-200 rounded" />
                <div className="h-4 w-5/6 bg-secondary-200 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Products Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="h-5 w-32 bg-secondary-200 rounded-full mb-3" />
            <div className="h-9 w-48 bg-secondary-200 rounded-xl" />
          </div>
        </div>

        {/* Product Grid */}
        <ProductGridSkeleton count={6} />
      </div>
    </div>
  );
}
