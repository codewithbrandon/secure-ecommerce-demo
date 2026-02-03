'use client';

interface SecurityBadgeProps {
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
}

export function SecurityBadge({ variant = 'default', className = '' }: SecurityBadgeProps) {
  if (variant === 'compact') {
    return (
      <div className={`security-badge ${className}`}>
        <LockIcon className="w-4 h-4" />
        <span>Secure Checkout</span>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`card p-5 border-secure-200 bg-gradient-to-br from-secure-50 to-white ${className}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-secure-100 rounded-xl flex items-center justify-center">
            <ShieldIcon className="w-5 h-5 text-secure-600" />
          </div>
          <div>
            <span className="font-semibold text-secure-800">PCI-DSS Level 1 Compliant</span>
            <p className="text-xs text-secure-600">Highest security certification</p>
          </div>
        </div>
        <p className="text-sm text-secondary-600 leading-relaxed">
          Your payment information is protected with bank-level encryption.
          Card data is handled directly by Stripe and never touches our servers.
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <div className="security-badge">
        <LockIcon className="w-4 h-4" />
        <span>256-bit SSL</span>
      </div>
      <div className="security-badge">
        <ShieldIcon className="w-4 h-4" />
        <span>PCI Compliant</span>
      </div>
      <div className="security-badge">
        <CheckIcon className="w-4 h-4" />
        <span>Stripe Secured</span>
      </div>
    </div>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
