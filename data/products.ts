export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 'prod_1',
    name: 'Premium Wireless Headphones',
    description: 'High-fidelity audio with active noise cancellation and 30-hour battery life.',
    price: 29999, // $299.99
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Electronics',
  },
  {
    id: 'prod_2',
    name: 'Organic Cotton T-Shirt',
    description: 'Sustainably sourced, ultra-soft cotton tee in classic fit.',
    price: 4999, // $49.99
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    category: 'Apparel',
  },
  {
    id: 'prod_3',
    name: 'Smart Fitness Watch',
    description: 'Track your health metrics, GPS routing, and smart notifications.',
    price: 19999, // $199.99
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'Electronics',
  },
  {
    id: 'prod_4',
    name: 'Artisan Coffee Beans',
    description: 'Single-origin, ethically sourced beans roasted to perfection. 12oz bag.',
    price: 2499, // $24.99
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop',
    category: 'Food & Beverage',
  },
  {
    id: 'prod_5',
    name: 'Leather Messenger Bag',
    description: 'Handcrafted full-grain leather bag with laptop compartment.',
    price: 24999, // $249.99
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop',
    category: 'Accessories',
  },
  {
    id: 'prod_6',
    name: 'Minimalist Desk Lamp',
    description: 'Adjustable LED lamp with touch controls and USB charging port.',
    price: 8999, // $89.99
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
    category: 'Home',
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}
