'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/data/products';
import { getStripe } from '@/lib/stripe';
import { CheckoutForm } from '@/components/CheckoutForm';
import { SecurityBadge } from '@/components/SecurityBadge';
import { LoadingSpinner, ProgressBar } from '@/components/LoadingSpinner';
import { CheckoutFormSkeleton, OrderSummarySkeleton } from '@/components/Skeleton';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Redirect to home if cart is empty
    if (items.length === 0) {
      router.push('/');
      return;
    }

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => Math.min(prev + 10, 90));
    }, 100);

    // Create PaymentIntent when page loads
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: items.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
            })),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to initialize checkout');
        }

        setClientSecret(data.clientSecret);
        setLoadingProgress(100);
      } catch (err) {
        console.error('Checkout initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize checkout');
      } finally {
        clearInterval(progressInterval);
        setTimeout(() => setIsLoading(false), 300);
      }
    };

    createPaymentIntent();

    return () => clearInterval(progressInterval);
  }, [items, router]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-50 to-white">
      <div className="container-default py-12">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-secondary-500 hover:text-primary-600 transition-colors mb-8 group"
        >
          <BackIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>Continue Shopping</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="animate-fade-in-up">
            <h1 className="heading-2 mb-2">Secure Checkout</h1>
            <p className="text-body mb-6">Complete your purchase securely</p>

            <SecurityBadge variant="detailed" className="mb-8" />

            {isLoading ? (
              <div className="card p-8">
                <div className="flex flex-col items-center justify-center py-8">
                  <LoadingSpinner size="lg" className="mb-4" />
                  <p className="text-secondary-600 font-medium mb-4">Initializing secure checkout...</p>
                  <ProgressBar progress={loadingProgress} className="w-48" />
                </div>
                <div className="mt-8 opacity-50">
                  <CheckoutFormSkeleton />
                </div>
              </div>
            ) : error ? (
              <div className="card p-8 animate-fade-in">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <AlertIcon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="heading-4 text-red-700 mb-2">Unable to Initialize Checkout</h3>
                  <p className="text-body mb-6">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="btn-primary"
                  >
                    <RefreshIcon className="w-5 h-5" />
                    Try Again
                  </button>
                </div>
              </div>
            ) : clientSecret ? (
              <div className="card p-6 md:p-8 animate-fade-in">
                <Elements
                  stripe={getStripe()}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        colorPrimary: '#4f46e5',
                        colorBackground: '#ffffff',
                        colorText: '#0f172a',
                        colorDanger: '#ef4444',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        borderRadius: '12px',
                        spacingUnit: '4px',
                      },
                      rules: {
                        '.Input': {
                          border: '1px solid #e2e8f0',
                          boxShadow: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.03)',
                          transition: 'border-color 0.2s, box-shadow 0.2s',
                        },
                        '.Input:focus': {
                          border: '1px solid #4f46e5',
                          boxShadow: '0 0 0 4px rgba(79, 70, 229, 0.1)',
                        },
                        '.Label': {
                          fontWeight: '500',
                          fontSize: '14px',
                          marginBottom: '8px',
                        },
                      },
                    },
                  }}
                >
                  <CheckoutForm amount={subtotal} />
                </Elements>
              </div>
            ) : null}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 lg:self-start animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {isLoading ? (
              <OrderSummarySkeleton />
            ) : (
              <div className="bg-secondary-50 rounded-2xl p-6 md:p-8">
                <h2 className="heading-4 mb-6 flex items-center gap-2">
                  <CartIcon className="w-5 h-5 text-secondary-400" />
                  Order Summary
                  <span className="ml-auto badge-neutral">{items.length} items</span>
                </h2>

                <ul className="divide-y divide-secondary-200 mb-6">
                  {items.map((item, index) => (
                    <li
                      key={item.product.id}
                      className="py-4 flex gap-4 animate-fade-in-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-white shadow-soft-sm">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                        <span className="absolute -top-1 -right-1 bg-secondary-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium shadow-soft-sm">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-secondary-900 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-secondary-500 text-sm mt-0.5">
                          {formatPrice(item.product.price)} each
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-secondary-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 border-t border-secondary-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-500">Subtotal</span>
                    <span className="text-secondary-900">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-500">Shipping</span>
                    <span className="text-secure-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-500">Tax</span>
                    <span className="text-secondary-400">Calculated at payment</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-secondary-200">
                    <span className="text-secondary-900">Total</span>
                    <span className="text-secondary-900">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                {/* Security Reassurance */}
                <div className="mt-6 pt-6 border-t border-secondary-200">
                  <h3 className="font-medium text-secondary-900 mb-4 flex items-center gap-2">
                    <ShieldIcon className="w-5 h-5 text-secure-600" />
                    Security Guarantees
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Card data encrypted by Stripe',
                      'We never see your card number',
                      'PCI-DSS Level 1 compliant',
                      'Secure 256-bit SSL connection',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-secondary-600 animate-fade-in" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                        <CheckIcon className="w-4 h-4 text-secure-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}
