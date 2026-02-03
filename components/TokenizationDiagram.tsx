'use client';

import { useEffect, useState } from 'react';

export function TokenizationDiagram() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 2500);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const steps = [
    {
      id: 0,
      title: 'Card Entry',
      description: 'You entered card details in Stripe\'s secure iframe',
      icon: <CreditCardIcon />,
      color: 'primary',
    },
    {
      id: 1,
      title: 'Encryption',
      description: '256-bit SSL encryption applied instantly',
      icon: <LockIcon />,
      color: 'amber',
    },
    {
      id: 2,
      title: 'Tokenization',
      description: 'Card number converted to secure token',
      icon: <KeyIcon />,
      color: 'purple',
    },
    {
      id: 3,
      title: 'Secure Transfer',
      description: 'Only the token reaches our servers',
      icon: <ShieldIcon />,
      color: 'secure',
    },
    {
      id: 4,
      title: 'Payment Complete',
      description: 'Transaction processed without exposing card data',
      icon: <CheckCircleIcon />,
      color: 'secure',
    },
  ];

  const colorClasses: Record<string, { bg: string; border: string; text: string; glow: string }> = {
    primary: {
      bg: 'bg-primary-100',
      border: 'border-primary-400',
      text: 'text-primary-600',
      glow: 'shadow-[0_0_30px_rgba(79,70,229,0.3)]',
    },
    amber: {
      bg: 'bg-amber-100',
      border: 'border-amber-400',
      text: 'text-amber-600',
      glow: 'shadow-[0_0_30px_rgba(245,158,11,0.3)]',
    },
    purple: {
      bg: 'bg-purple-100',
      border: 'border-purple-400',
      text: 'text-purple-600',
      glow: 'shadow-[0_0_30px_rgba(147,51,234,0.3)]',
    },
    secure: {
      bg: 'bg-secure-100',
      border: 'border-secure-400',
      text: 'text-secure-600',
      glow: 'shadow-[0_0_30px_rgba(16,185,129,0.3)]',
    },
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="heading-4 mb-2">How Your Payment Was Protected</h3>
        <p className="text-body">Watch the secure tokenization process</p>
      </div>

      {/* Animation Controls */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="btn-ghost text-sm"
        >
          {isAnimating ? (
            <>
              <PauseIcon className="w-4 h-4" />
              Pause
            </>
          ) : (
            <>
              <PlayIcon className="w-4 h-4" />
              Play
            </>
          )}
        </button>
        <button
          onClick={() => setActiveStep((prev) => (prev + 1) % 5)}
          className="btn-ghost text-sm"
        >
          <ForwardIcon className="w-4 h-4" />
          Next Step
        </button>
      </div>

      {/* Desktop Flow Diagram */}
      <div className="hidden lg:block">
        <div className="relative flex items-center justify-between max-w-4xl mx-auto">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                {/* Background line */}
                <line
                  x1={`${12.5 + i * 25}%`}
                  y1="50%"
                  x2={`${12.5 + (i + 1) * 25}%`}
                  y2="50%"
                  stroke="#e2e8f0"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Animated line */}
                <line
                  x1={`${12.5 + i * 25}%`}
                  y1="50%"
                  x2={`${12.5 + (i + 1) * 25}%`}
                  y2="50%"
                  stroke={activeStep > i ? '#10b981' : '#e2e8f0'}
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="transition-all duration-500"
                  style={{
                    strokeDasharray: '100%',
                    strokeDashoffset: activeStep > i ? '0%' : '100%',
                  }}
                />
              </g>
            ))}
          </svg>

          {/* Data Packet Animation */}
          {isAnimating && (
            <div
              className="absolute w-4 h-4 bg-gradient-to-r from-primary-500 to-secure-500 rounded-full z-20 transition-all duration-500"
              style={{
                left: `${12.5 + activeStep * 25}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 20px rgba(79, 70, 229, 0.5)',
              }}
            >
              <div className="absolute inset-0 rounded-full animate-ping bg-primary-400 opacity-50" />
            </div>
          )}

          {/* Steps */}
          {steps.map((step, index) => {
            const colors = colorClasses[step.color];
            const isActive = activeStep === index;
            const isCompleted = activeStep > index;

            return (
              <div
                key={step.id}
                className="relative z-10 flex flex-col items-center"
                style={{ width: '20%' }}
              >
                {/* Icon Circle */}
                <button
                  onClick={() => {
                    setActiveStep(index);
                    setIsAnimating(false);
                  }}
                  className={`
                    relative w-16 h-16 rounded-2xl flex items-center justify-center
                    transition-all duration-500 cursor-pointer
                    ${isActive ? `${colors.bg} ${colors.border} border-2 ${colors.glow} scale-110` : ''}
                    ${isCompleted ? 'bg-secure-100 border-2 border-secure-400' : ''}
                    ${!isActive && !isCompleted ? 'bg-secondary-100 border-2 border-secondary-200' : ''}
                  `}
                >
                  <div className={`w-7 h-7 ${isActive ? colors.text : isCompleted ? 'text-secure-600' : 'text-secondary-400'} transition-colors duration-300`}>
                    {isCompleted && !isActive ? <CheckIcon className="w-7 h-7" /> : step.icon}
                  </div>

                  {/* Pulse ring when active */}
                  {isActive && (
                    <div className={`absolute inset-0 rounded-2xl ${colors.border} border-2 animate-ping opacity-30`} />
                  )}
                </button>

                {/* Label */}
                <div className={`mt-4 text-center transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                  <p className={`font-semibold text-sm ${isActive ? 'text-secondary-900' : 'text-secondary-600'}`}>
                    {step.title}
                  </p>
                  <p className={`text-xs mt-1 max-w-[120px] ${isActive ? 'text-secondary-600' : 'text-secondary-400'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile/Tablet Vertical Flow */}
      <div className="lg:hidden">
        <div className="relative max-w-sm mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-secondary-200">
            <div
              className="absolute top-0 left-0 w-full bg-secure-500 transition-all duration-500"
              style={{ height: `${(activeStep / 4) * 100}%` }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const colors = colorClasses[step.color];
              const isActive = activeStep === index;
              const isCompleted = activeStep > index;

              return (
                <div
                  key={step.id}
                  className={`relative flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${isActive ? 'bg-white shadow-soft-md' : ''}`}
                >
                  {/* Icon */}
                  <button
                    onClick={() => {
                      setActiveStep(index);
                      setIsAnimating(false);
                    }}
                    className={`
                      relative w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                      transition-all duration-300
                      ${isActive ? `${colors.bg} ${colors.border} border-2 ${colors.glow}` : ''}
                      ${isCompleted ? 'bg-secure-100 border-2 border-secure-400' : ''}
                      ${!isActive && !isCompleted ? 'bg-secondary-100 border-2 border-secondary-200' : ''}
                    `}
                  >
                    <div className={`w-5 h-5 ${isActive ? colors.text : isCompleted ? 'text-secure-600' : 'text-secondary-400'}`}>
                      {isCompleted && !isActive ? <CheckIcon className="w-5 h-5" /> : step.icon}
                    </div>
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold ${isActive ? 'text-secondary-900' : 'text-secondary-600'}`}>
                      {step.title}
                    </p>
                    <p className={`text-sm mt-0.5 ${isActive ? 'text-secondary-600' : 'text-secondary-400'}`}>
                      {step.description}
                    </p>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-secure-500 animate-pulse" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Data Visualization */}
      <div className="mt-12 max-w-2xl mx-auto">
        <div className="bg-secondary-900 rounded-2xl p-6 overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-secondary-400 text-xs font-mono ml-2">Data Flow Visualization</span>
          </div>

          <div className="font-mono text-sm space-y-3">
            {/* Card Input */}
            <div className={`transition-all duration-500 ${activeStep >= 0 ? 'opacity-100' : 'opacity-30'}`}>
              <span className="text-secondary-500">// Your card input</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-purple-400">card:</span>
                <span className={`transition-all duration-500 ${activeStep >= 2 ? 'blur-sm text-red-400 line-through' : 'text-white'}`}>
                  "4242 4242 4242 4242"
                </span>
                {activeStep >= 2 && (
                  <span className="text-red-400 animate-fade-in">← NEVER SENT</span>
                )}
              </div>
            </div>

            {/* Arrow */}
            <div className={`text-secondary-500 transition-all duration-500 ${activeStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
              ↓ <span className="text-amber-400">256-bit encryption</span>
            </div>

            {/* Token */}
            <div className={`transition-all duration-500 ${activeStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
              <span className="text-secondary-500">// Tokenized result</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-purple-400">token:</span>
                <span className="text-secure-400">
                  "tok_1N{activeStep >= 2 ? <TypewriterText text="x7K9mPqRsTuV" /> : '...'}"
                </span>
                {activeStep >= 3 && (
                  <span className="text-secure-400 animate-fade-in">← SAFE TO SEND</span>
                )}
              </div>
            </div>

            {/* What we receive */}
            <div className={`transition-all duration-500 ${activeStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
              <span className="text-secondary-500">// What our server receives</span>
              <div className="bg-secondary-800 rounded-lg p-3 mt-1">
                <div className="text-secondary-300">{'{'}</div>
                <div className="pl-4">
                  <span className="text-blue-400">"payment_intent"</span>: <span className="text-secure-400">"pi_3N..."</span>,
                </div>
                <div className="pl-4">
                  <span className="text-blue-400">"amount"</span>: <span className="text-amber-400">29999</span>,
                </div>
                <div className="pl-4">
                  <span className="text-blue-400">"card_last4"</span>: <span className="text-white">"4242"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-blue-400">"card_number"</span>: <span className="text-red-400">null</span>
                  <span className="text-secondary-500"> // Never received!</span>
                </div>
                <div className="text-secondary-300">{'}'}</div>
              </div>
            </div>

            {/* Success */}
            {activeStep >= 4 && (
              <div className="animate-fade-in-up flex items-center gap-2 text-secure-400 pt-2">
                <CheckCircleIcon className="w-5 h-5" />
                <span>Payment successful - your card data remained secure!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveStep(index);
              setIsAnimating(false);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeStep === index
                ? 'w-8 bg-primary-600'
                : activeStep > index
                ? 'bg-secure-500'
                : 'bg-secondary-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  return <>{displayText}<span className="animate-pulse">|</span></>;
}

// Icons
function CreditCardIcon() {
  return (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ForwardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
    </svg>
  );
}
