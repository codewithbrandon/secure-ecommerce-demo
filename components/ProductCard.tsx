'use client';

import Image from 'next/image';
import { Product, formatPrice } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="card-hover group">
      <div className="relative h-64 overflow-hidden bg-secondary-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="badge-neutral backdrop-blur-sm bg-white/90">
            {product.category}
          </span>
        </div>
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          onClick={() => addItem(product)}
          className="absolute bottom-4 left-4 right-4 btn bg-white text-secondary-900 py-3 rounded-xl font-semibold
                     opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0
                     transition-all duration-300 hover:bg-primary-600 hover:text-white"
        >
          <CartPlusIcon className="w-5 h-5" />
          Add to Cart
        </button>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg text-secondary-900 mb-1.5 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-secondary-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-secondary-900">
              {formatPrice(product.price)}
            </span>
          </div>
          <button
            onClick={() => addItem(product)}
            className="btn-primary py-2.5 px-5 text-sm md:hidden"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

function CartPlusIcon({ className }: { className?: string }) {
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
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}
