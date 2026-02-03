import { CheckoutFormSkeleton, OrderSummarySkeleton } from '@/components/Skeleton';

export default function CheckoutLoading() {
  return (
    <div className="container-default py-12 animate-pulse">
      {/* Back link skeleton */}
      <div className="mb-8">
        <div className="h-5 w-36 bg-secondary-200 rounded-lg" />
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Form side */}
        <div>
          <div className="h-8 w-48 bg-secondary-200 rounded-xl mb-6" />

          {/* Security badge skeleton */}
          <div className="card p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-secondary-200 rounded-xl" />
              <div className="space-y-2">
                <div className="h-5 w-40 bg-secondary-200 rounded" />
                <div className="h-3 w-32 bg-secondary-200 rounded" />
              </div>
            </div>
            <div className="h-4 w-full bg-secondary-200 rounded" />
          </div>

          {/* Form skeleton */}
          <div className="card p-6">
            <CheckoutFormSkeleton />
          </div>
        </div>

        {/* Order summary side */}
        <div>
          <OrderSummarySkeleton />
        </div>
      </div>
    </div>
  );
}
