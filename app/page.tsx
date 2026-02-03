import Image from 'next/image';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { SecurityBadge } from '@/components/SecurityBadge';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section - Responsive Height */}
      <section className="relative min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px] w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=90"
          alt="Secure online shopping"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Gradient Overlay - Adjusted for mobile readability */}
        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-secondary-900/95 via-secondary-900/80 to-secondary-900/60 sm:to-secondary-900/30" />

        {/* Hero Content */}
        <div className="relative z-10 h-full container-default flex items-center py-12 sm:py-16">
          <div className="w-full max-w-2xl animate-fade-in-up">
            {/* Badge */}
            <div className="mb-4 sm:mb-6">
              <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-secure-500/20 backdrop-blur-sm text-secure-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border border-secure-500/30">
                <ShieldCheckIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">PCI-DSS Level 1</span>
                <span className="xs:hidden">PCI Certified</span>
              </span>
            </div>

            {/* Heading - Responsive Typography */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight">
              Shop with
              <span className="bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent"> Complete</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Security
            </h1>

            {/* Description - Responsive */}
            <p className="text-base sm:text-lg md:text-xl text-secondary-300 mb-6 sm:mb-8 leading-relaxed max-w-lg">
              Experience secure e-commerce with bank-level encryption. Your card data never touches our servers.
            </p>

            {/* CTA Buttons - Stack on mobile */}
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
              <a
                href="#products"
                className="btn-primary py-3.5 sm:py-4 px-6 sm:px-8 text-base sm:text-lg rounded-xl sm:rounded-2xl justify-center shadow-soft-xl hover:shadow-glow-primary"
              >
                Start Shopping
                <ArrowRightIcon className="w-5 h-5" />
              </a>
              <a
                href="#security"
                className="btn bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl border border-white/20 transition-all duration-200 justify-center"
              >
                Learn More
              </a>
            </div>

            {/* Trust Badges - Responsive grid */}
            <div className="grid grid-cols-3 xs:flex xs:flex-wrap items-center gap-3 sm:gap-6">
              <TrustBadge icon={<LockIcon />} text="256-bit SSL" />
              <TrustBadge icon={<ShieldIcon />} text="Stripe" mobileText="Stripe" />
              <TrustBadge icon={<CheckIcon />} text="Zero Storage" mobileText="No Data" />
            </div>
          </div>
        </div>

        {/* Decorative gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-surface-50 to-transparent" />
      </section>

      {/* Main Content - Responsive padding */}
      <div className="container-default py-10 sm:py-12 md:py-16 lg:py-20">
        {/* Security Highlights */}
        <section id="security" className="mb-12 sm:mb-16 md:mb-20">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 px-2">
            <span className="badge-primary mb-3 sm:mb-4">Enterprise Security</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 mb-3 sm:mb-4">Built for Trust</h2>
            <p className="text-base sm:text-lg text-secondary-600 max-w-2xl mx-auto leading-relaxed">
              Every transaction is protected by multiple layers of security.
            </p>
          </div>

          {/* Security Cards - Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <SecurityFeatureCard
              icon={<LockIcon className="w-6 h-6 sm:w-7 sm:h-7" />}
              title="End-to-End Encryption"
              description="256-bit SSL encryption, the same standard used by banks worldwide."
              color="primary"
            />
            <SecurityFeatureCard
              icon={<ShieldIcon className="w-6 h-6 sm:w-7 sm:h-7" />}
              title="Tokenized Payments"
              description="Card details are tokenized by Stripe - we never see actual card numbers."
              color="secure"
            />
            <SecurityFeatureCard
              icon={<CheckIcon className="w-6 h-6 sm:w-7 sm:h-7" />}
              title="PCI-DSS Certified"
              description="Highest industry security standards with Level 1 certification."
              color="accent"
            />
          </div>
        </section>

        {/* Product Grid */}
        <section id="products" className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <span className="badge-neutral mb-2 sm:mb-3">Curated Collection</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900">Featured Products</h2>
            </div>
            <a href="#" className="hidden sm:flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors">
              View all products
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Product Grid - Responsive columns */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Mobile "View All" link */}
          <div className="mt-6 text-center sm:hidden">
            <a href="#" className="btn-secondary inline-flex">
              View All Products
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Trust Indicators - Responsive */}
        <section className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-14">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-secondary-900 mb-2 sm:mb-3">
              Why Customers Trust SecureShop
            </h3>
            <p className="text-sm sm:text-base text-secondary-600 max-w-xl mx-auto">
              Our commitment to security is reflected in every aspect of our platform.
            </p>
          </div>

          {/* Stats Grid - Responsive */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <TrustStat number="256-bit" label="SSL Encryption" icon={<LockIcon className="w-5 h-5 sm:w-6 sm:h-6" />} />
            <TrustStat number="0" label="Cards Stored" icon={<DatabaseIcon className="w-5 h-5 sm:w-6 sm:h-6" />} />
            <TrustStat number="Level 1" label="PCI Compliance" icon={<ShieldIcon className="w-5 h-5 sm:w-6 sm:h-6" />} />
            <TrustStat number="100%" label="Secure" icon={<CheckIcon className="w-5 h-5 sm:w-6 sm:h-6" />} />
          </div>
        </section>
      </div>
    </div>
  );
}

function TrustBadge({ icon, text, mobileText }: { icon: React.ReactNode; text: string; mobileText?: string }) {
  return (
    <div className="flex flex-col xs:flex-row items-center gap-1 xs:gap-2 text-white/80">
      <span className="text-secure-400">{icon}</span>
      <span className="text-xs sm:text-sm font-medium text-center xs:text-left">
        <span className="hidden xs:inline">{text}</span>
        <span className="xs:hidden">{mobileText || text}</span>
      </span>
    </div>
  );
}

function SecurityFeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'primary' | 'secure' | 'accent';
}) {
  const colorClasses = {
    primary: 'from-primary-50 to-primary-100 text-primary-600',
    secure: 'from-secure-50 to-secure-100 text-secure-600',
    accent: 'from-accent-50 to-accent-100 text-accent-600',
  };

  return (
    <div className="card-hover p-5 sm:p-6 md:p-8 group">
      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-secondary-900 mb-2 sm:mb-3">{title}</h3>
      <p className="text-sm sm:text-base text-secondary-600 leading-relaxed">{description}</p>
    </div>
  );
}

function TrustStat({ number, label, icon }: { number: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="text-center p-3 sm:p-4">
      <div className="w-10 h-10 sm:w-12 md:w-14 sm:h-12 md:h-14 bg-white rounded-xl sm:rounded-2xl shadow-soft-sm flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 text-primary-600">
        {icon}
      </div>
      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-900 mb-0.5 sm:mb-1">{number}</div>
      <div className="text-xs sm:text-sm text-secondary-500">{label}</div>
    </div>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}

function LockIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

function ShieldIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function CheckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function DatabaseIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  );
}
