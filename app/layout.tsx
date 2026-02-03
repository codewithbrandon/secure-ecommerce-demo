import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { CartButton, CartSidebar } from '@/components/Cart';
import { SecurityBadge } from '@/components/SecurityBadge';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'SecureShop - PCI-DSS Compliant E-Commerce Demo',
  description: 'Experience secure online shopping with Stripe tokenization and bank-level encryption.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#4f46e5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <CartProvider>
          {/* Header - Responsive */}
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-secondary-100">
            <div className="container-default">
              <div className="flex items-center justify-between h-14 sm:h-16 md:h-18">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
                  <div className="w-8 h-8 sm:w-9 md:w-10 sm:h-9 md:h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg sm:rounded-xl flex items-center justify-center shadow-soft-sm group-hover:shadow-glow-primary transition-shadow">
                    <ShieldCheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-base sm:text-lg md:text-xl text-secondary-900 leading-tight">SecureShop</span>
                    <span className="hidden md:block text-xs text-secondary-400 leading-tight">Enterprise Security</span>
                  </div>
                </Link>

                {/* Desktop Security Badge */}
                <div className="hidden lg:block">
                  <SecurityBadge variant="compact" />
                </div>

                {/* Mobile Security Indicator + Cart */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Mobile security indicator */}
                  <div className="flex lg:hidden items-center gap-1.5 text-secure-600">
                    <LockIcon className="w-4 h-4" />
                    <span className="hidden xs:inline text-xs font-medium">Secure</span>
                  </div>

                  {/* Cart Button */}
                  <CartButton />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="min-h-screen">{children}</main>

          {/* Footer - Responsive */}
          <footer className="bg-secondary-900 text-secondary-400">
            {/* Main Footer */}
            <div className="container-default py-10 sm:py-12 md:py-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                {/* Brand - Full width on mobile */}
                <div className="col-span-2 md:col-span-1">
                  <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <ShieldCheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="font-bold text-base sm:text-lg text-white">SecureShop</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed max-w-xs">
                    Enterprise-grade payment security with Stripe tokenization and PCI-DSS compliance.
                  </p>
                </div>

                {/* Security Features */}
                <div>
                  <h3 className="font-semibold text-white text-sm sm:text-base mb-3 sm:mb-4">Security</h3>
                  <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secure-500 flex-shrink-0" />
                      <span>256-bit SSL</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secure-500 flex-shrink-0" />
                      <span>PCI-DSS Level 1</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secure-500 flex-shrink-0" />
                      <span>Tokenized Cards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secure-500 flex-shrink-0" />
                      <span>Zero Storage</span>
                    </li>
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="font-semibold text-white text-sm sm:text-base mb-3 sm:mb-4">Resources</h3>
                  <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                    <li><a href="#security" className="hover:text-white transition-colors">Security</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Integration</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
                  </ul>
                </div>

                {/* Demo Info */}
                <div className="col-span-2 md:col-span-1">
                  <h3 className="font-semibold text-white text-sm sm:text-base mb-3 sm:mb-4">Test Demo</h3>
                  <p className="text-xs sm:text-sm mb-3 sm:mb-4">
                    Try the secure checkout with a test card.
                  </p>
                  <div className="bg-secondary-800 rounded-lg sm:rounded-xl p-3 sm:p-4 inline-block">
                    <p className="text-2xs sm:text-xs text-secondary-400 mb-1">Test Card</p>
                    <code className="text-white font-mono text-xs sm:text-sm">4242 4242 4242 4242</code>
                    <p className="text-2xs sm:text-xs text-secondary-500 mt-1 sm:mt-2">Any date • Any CVC</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-secondary-800">
              <div className="container-default py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                <p className="text-xs sm:text-sm text-center sm:text-left">
                  Secure E-Commerce Demo &mdash; Next.js & Stripe
                </p>
                <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
                  <a href="#" className="hover:text-white transition-colors">Privacy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms</a>
                  <a href="#" className="hover:text-white transition-colors">Security</a>
                </div>
              </div>
            </div>
          </footer>

          {/* Cart Sidebar */}
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}
