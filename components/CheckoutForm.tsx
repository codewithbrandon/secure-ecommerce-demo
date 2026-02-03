'use client';

import { useState, FormEvent } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { SecurityBadge } from './SecurityBadge';
import { ButtonLoading } from './LoadingSpinner';

interface CheckoutFormProps {
  amount: number;
}

export function CheckoutForm({ amount }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentReady, setPaymentReady] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Validate form fields
    if (!email.trim() || !name.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
        receipt_email: email,
        payment_method_data: {
          billing_details: {
            name: name,
            email: email,
          },
        },
      },
    });

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setErrorMessage(error.message || 'Payment failed. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }

    setIsProcessing(false);
  };

  const formatAmount = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div className="space-y-4 animate-fade-in-up">
        <h3 className="heading-4 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
          Contact Information
        </h3>

        <div className="space-y-4">
          <div className="group">
            <label htmlFor="email" className="input-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field transition-all duration-200"
              placeholder="your@email.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="group">
            <label htmlFor="name" className="input-label">
              Cardholder Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field transition-all duration-200"
              placeholder="John Doe"
              required
              autoComplete="name"
            />
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center justify-between">
          <h3 className="heading-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
            Payment Details
          </h3>
          <SecurityBadge variant="compact" />
        </div>

        {/* Stripe PaymentElement */}
        <div className="relative">
          <div className={`bg-secondary-50 p-4 rounded-xl border border-secondary-200 transition-all duration-300 ${paymentReady ? 'border-secure-300 bg-secure-50/30' : ''}`}>
            <PaymentElement
              onReady={() => setPaymentReady(true)}
              options={{
                layout: 'tabs',
              }}
            />
          </div>
          {paymentReady && (
            <div className="absolute -top-2 -right-2 animate-scale-in">
              <span className="flex items-center gap-1 bg-secure-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-soft-sm">
                <CheckIcon className="w-3 h-3" />
                Secure
              </span>
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="flex items-start gap-3 text-sm bg-primary-50 text-primary-700 p-4 rounded-xl border border-primary-100 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <LockIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>
            Your card information is encrypted and sent directly to Stripe.
            We never see or store your card number.
          </p>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl animate-fade-in-up">
          <AlertIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || isProcessing || !paymentReady}
        className="btn-primary w-full py-4 text-lg relative overflow-hidden group"
      >
        {isProcessing ? (
          <>
            <ButtonLoading className="w-5 h-5" />
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <LockIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>Pay {formatAmount(amount)} Securely</span>
          </>
        )}

        {/* Button shine effect */}
        {!isProcessing && (
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        )}
      </button>

      {/* Test Card Info */}
      <div className="text-center bg-secondary-100 p-4 rounded-xl border border-secondary-200 animate-fade-in" style={{ animationDelay: '300ms' }}>
        <p className="text-sm font-medium text-secondary-700 mb-2">Demo Mode - Test Card</p>
        <div className="flex items-center justify-center gap-2">
          <code className="bg-white px-3 py-1.5 rounded-lg text-sm font-mono text-secondary-900 shadow-inner-soft">
            4242 4242 4242 4242
          </code>
        </div>
        <p className="text-xs text-secondary-500 mt-2">Any future date &bull; Any CVC &bull; Any ZIP</p>
      </div>
    </form>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
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

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}
