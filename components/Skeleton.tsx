'use client';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`skeleton ${className}`} />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      {/* Image skeleton */}
      <div className="relative h-64 bg-secondary-100 overflow-hidden">
        <div className="absolute inset-0 shimmer" />
      </div>

      {/* Content skeleton */}
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4 rounded-lg" />
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-2/3 rounded-lg" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-7 w-24 rounded-lg" />
          <Skeleton className="h-10 w-20 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CheckoutFormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Contact section */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-40 rounded-lg" />
        <div className="space-y-3">
          <div>
            <Skeleton className="h-4 w-16 rounded mb-2" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
          <div>
            <Skeleton className="h-4 w-24 rounded mb-2" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>

      {/* Payment section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32 rounded-lg" />
          <Skeleton className="h-8 w-28 rounded-full" />
        </div>
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-xl" />
      </div>

      {/* Button */}
      <Skeleton className="h-14 w-full rounded-xl" />
    </div>
  );
}

export function OrderSummarySkeleton() {
  return (
    <div className="bg-secondary-50 rounded-2xl p-6 space-y-4">
      <Skeleton className="h-6 w-32 rounded-lg" />

      {/* Items */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>
            <Skeleton className="h-5 w-16 rounded" />
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-secondary-200 pt-4 space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-12 rounded" />
        </div>
        <div className="flex justify-between pt-2">
          <Skeleton className="h-6 w-16 rounded" />
          <Skeleton className="h-6 w-20 rounded" />
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[650px] w-full bg-secondary-200 overflow-hidden">
      <div className="absolute inset-0 shimmer" />
      <div className="relative z-10 h-full container-default flex items-center">
        <div className="max-w-2xl space-y-6">
          <Skeleton className="h-8 w-48 rounded-full" />
          <div className="space-y-4">
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-3/4 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-full rounded-lg" />
            <Skeleton className="h-6 w-2/3 rounded-lg" />
          </div>
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-14 w-40 rounded-2xl" />
            <Skeleton className="h-14 w-48 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-fade-in-up">
      {children}
    </div>
  );
}
