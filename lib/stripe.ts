import { loadStripe, Stripe } from '@stripe/stripe-js';

// Singleton pattern to ensure Stripe is only loaded once
let stripePromise: Promise<Stripe | null>;

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!key) {
      console.error(
        'Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable. ' +
        'Copy .env.local.example to .env.local and add your Stripe test keys.'
      );
      return Promise.resolve(null);
    }

    stripePromise = loadStripe(key);
  }

  return stripePromise;
}

// Server-side Stripe instance (used in API routes only)
// This file should NOT be imported in client components
export function getServerStripe() {
  const Stripe = require('stripe');
  const key = process.env.STRIPE_SECRET_KEY;

  if (!key) {
    throw new Error(
      'Missing STRIPE_SECRET_KEY environment variable. ' +
      'Add your Stripe secret key to .env.local'
    );
  }

  return new Stripe(key, {
    apiVersion: '2023-10-16',
    typescript: true,
  });
}
