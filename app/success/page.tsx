'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { TokenizationDiagram } from '@/components/TokenizationDiagram';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const paymentIntent = searchParams.get('payment_intent');
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (paymentIntent) {
      clearCart();
    }
    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [paymentIntent, clearCart]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-50 to-white relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && <Confetti />}

      <div className="container-default py-12">
        {/* Success Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="relative inline-block mb-6">
            {/* Animated success circle */}
            <div className="w-24 h-24 bg-secure-100 rounded-full flex items-center justify-center relative">
              <svg className="w-12 h-12 text-secure-600" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="opacity-20"
                />
                <path
                  d="M7 13l3 3 7-7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="checkmark-animate"
                />
              </svg>
              {/* Pulse rings */}
              <div className="absolute inset-0 rounded-full border-2 border-secure-400 pulse-ring" />
              <div className="absolute inset-0 rounded-full border-2 border-secure-400 pulse-ring" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>

          <h1 className="heading-1 text-secondary-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-body-lg max-w-xl mx-auto mb-4">
            Thank you for your order. Your transaction was processed securely using
            industry-leading encryption and tokenization.
          </p>
          {paymentIntent && (
            <div className="inline-flex items-center gap-2 bg-secondary-100 px-4 py-2 rounded-full">
              <span className="text-sm text-secondary-500">Payment ID:</span>
              <code className="text-sm font-mono text-secondary-700">{paymentIntent.slice(0, 20)}...</code>
              <button
                onClick={() => navigator.clipboard.writeText(paymentIntent)}
                className="text-primary-600 hover:text-primary-700"
              >
                <CopyIcon className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Tokenization Diagram */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="card p-8 md:p-12">
            <TokenizationDiagram />
          </div>
        </div>

        {/* Security Details Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* What We Received */}
          <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-secure-100 rounded-xl flex items-center justify-center">
                <CheckIcon className="w-5 h-5 text-secure-600" />
              </div>
              <h3 className="heading-4">What We Received</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Payment confirmation token',
                'Transaction ID for tracking',
                'Amount verification',
                'Last 4 digits (for your reference)',
                'Payment status confirmation',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-secondary-600">
                  <div className="w-5 h-5 rounded-full bg-secure-100 flex items-center justify-center flex-shrink-0">
                    <CheckIcon className="w-3 h-3 text-secure-600" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What We Never Saw */}
          <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <XIcon className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="heading-4">What We Never Saw</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Your full card number',
                'Card expiration date',
                'CVV/CVC security code',
                'PIN or passwords',
                'Bank account details',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-secondary-600">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <XIcon className="w-3 h-3 text-red-600" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Security Certifications */}
        <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 rounded-3xl p-8 md:p-12 text-white mb-16 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Enterprise-Grade Security</h2>
            <p className="text-secondary-300">Your transaction was protected by multiple security layers</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CertificationCard
              icon={<LockIcon />}
              title="256-bit SSL"
              description="Bank-level encryption"
            />
            <CertificationCard
              icon={<ShieldIcon />}
              title="PCI-DSS Level 1"
              description="Highest certification"
            />
            <CertificationCard
              icon={<KeyIcon />}
              title="Tokenization"
              description="Zero card storage"
            />
            <CertificationCard
              icon={<GlobeIcon />}
              title="3D Secure"
              description="Additional verification"
            />
          </div>
        </div>

        {/* For Business Clients */}
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-8 md:p-12 mb-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-primary mb-4">For Retail Business Clients</span>
            <h2 className="heading-2 mb-4">Implement This Security for Your Business</h2>
            <p className="text-body-lg mb-8">
              This demo showcases the security infrastructure available for your e-commerce platform.
              Protect your customers and reduce your PCI compliance scope.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-5 shadow-soft-sm">
                <div className="text-3xl font-bold text-primary-600 mb-1">99.9%</div>
                <div className="text-sm text-secondary-600">Fraud Prevention</div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-soft-sm">
                <div className="text-3xl font-bold text-primary-600 mb-1">0</div>
                <div className="text-sm text-secondary-600">Data Breaches</div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-soft-sm">
                <div className="text-3xl font-bold text-primary-600 mb-1">+25%</div>
                <div className="text-sm text-secondary-600">Conversion Rate</div>
              </div>
            </div>

            <a href="#" className="btn-primary inline-flex">
              Learn More About Integration
              <ArrowRightIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '700ms' }}>
          <Link href="/" className="btn-primary inline-flex">
            <ShoppingBagIcon className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10px',
            backgroundColor: ['#4f46e5', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'][Math.floor(Math.random() * 5)],
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </div>
  );
}

function CertificationCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-5 text-center hover:bg-white/20 transition-colors">
      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3 text-white">
        {icon}
      </div>
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm text-secondary-300">{description}</p>
    </div>
  );
}

// Icons
function CheckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function CopyIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ShoppingBagIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}

function ArrowRightIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}
