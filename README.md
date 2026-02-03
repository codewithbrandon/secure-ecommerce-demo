# Secure E-Commerce Demo

A modern, secure e-commerce application demonstrating PCI-DSS compliant payment processing with Stripe. Built with Next.js 14, TypeScript, and Tailwind CSS.

![Hero Section](./screenshots/hero.png)

## Features

### Security-First Design
- **PCI-DSS Level 1 Compliant** - Card data never touches your servers
- **Stripe Tokenization** - Sensitive payment data is handled entirely by Stripe
- **256-bit SSL Encryption** - All data transmitted securely
- **Server-side Validation** - Payment amounts validated on the backend to prevent manipulation

### Modern E-Commerce Experience
- Responsive product catalog with beautiful UI
- Real-time shopping cart with quantity management
- Smooth animations and loading states
- Mobile-first responsive design

### Educational Components
- **Interactive Tokenization Diagram** - Visual demonstration of how payment security works
- **Security Badges** - Clear trust indicators throughout the checkout flow
- **Data Flow Visualization** - Shows exactly what data is (and isn't) transmitted

## Screenshots

### Home Page
![Home Page](./screenshots/home.png)
*Product catalog with security highlights and trust indicators*

### Shopping Cart
![Shopping Cart](./screenshots/cart.png)
*Slide-out cart with real-time total calculation*

### Secure Checkout
![Checkout Page](./screenshots/checkout.png)
*PCI-compliant checkout with Stripe Elements*

### Payment Success
![Success Page](./screenshots/success.png)
*Order confirmation with tokenization flow diagram*

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Stripe** | Payment processing |
| **React Context** | Shopping cart state management |

## Project Structure

```
secure-ecommerce-demo/
├── app/
│   ├── api/
│   │   └── create-payment-intent/
│   │       └── route.ts          # Stripe PaymentIntent API
│   ├── checkout/
│   │   ├── page.tsx              # Checkout page
│   │   └── loading.tsx           # Loading state
│   ├── success/
│   │   ├── page.tsx              # Order confirmation
│   │   └── loading.tsx           # Loading state
│   ├── layout.tsx                # Root layout with cart provider
│   ├── page.tsx                  # Home page with products
│   └── globals.css               # Global styles & Tailwind
├── components/
│   ├── Cart.tsx                  # Shopping cart slide-out
│   ├── CheckoutForm.tsx          # Stripe payment form
│   ├── ProductCard.tsx           # Product display card
│   ├── SecurityBadge.tsx         # Trust indicators
│   ├── TokenizationDiagram.tsx   # Interactive security diagram
│   ├── LoadingSpinner.tsx        # Loading components
│   └── Skeleton.tsx              # Skeleton loaders
├── context/
│   └── CartContext.tsx           # Cart state management
├── data/
│   └── products.ts               # Product catalog
├── lib/
│   └── stripe.ts                 # Stripe configuration
└── public/
    └── screenshots/              # Add your screenshots here
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Stripe account (for API keys)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/codewithbrandon/secure-ecommerce-demo.git
   cd secure-ecommerce-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

   Add your Stripe keys to `.env.local`:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
   STRIPE_SECRET_KEY=sk_test_your_secret_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Testing Payments

Use Stripe's test card numbers:

| Card Number | Description |
|-------------|-------------|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 3220` | 3D Secure authentication |
| `4000 0000 0000 9995` | Declined payment |

- **Expiry**: Any future date
- **CVC**: Any 3 digits
- **ZIP**: Any 5 digits

## Security Features Explained

### 1. Stripe Elements
The payment form uses Stripe Elements, which creates a secure iframe for card input. This means:
- Card numbers never touch your server
- PCI compliance is handled by Stripe
- Reduced security liability for your business

### 2. Payment Intents API
```typescript
// Server-side: Create PaymentIntent with validated amount
const paymentIntent = await stripe.paymentIntents.create({
  amount: calculatedTotal, // Always calculate server-side
  currency: 'usd',
  automatic_payment_methods: { enabled: true },
});
```

### 3. Server-Side Validation
All prices are validated server-side to prevent client-side manipulation:
```typescript
// Look up product server-side (prevents price manipulation)
const product = getProductById(item.productId);
const itemTotal = product.price * quantity;
```

### 4. Tokenization Flow
1. Customer enters card in Stripe's secure iframe
2. Stripe encrypts and tokenizes the card data
3. Only a token (not card number) is sent to your server
4. Your server uses the token to complete the payment

## Customization

### Adding Products
Edit `data/products.ts` to add or modify products:
```typescript
export const products: Product[] = [
  {
    id: 'prod_new',
    name: 'New Product',
    description: 'Product description',
    price: 9999, // Price in cents ($99.99)
    image: 'https://example.com/image.jpg',
    category: 'Category',
  },
];
```

### Styling
The project uses Tailwind CSS with custom design tokens. Modify `tailwind.config.js` to customize:
- Colors (primary, secondary, secure, accent)
- Shadows
- Animations
- Typography

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted with `npm run build && npm start`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (starts with `pk_`) | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key (starts with `sk_`) | Yes |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [Stripe](https://stripe.com) for payment processing
- [Next.js](https://nextjs.org) for the React framework
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Unsplash](https://unsplash.com) for product images

---

Built with security in mind by [@codewithbrandon](https://github.com/codewithbrandon)
