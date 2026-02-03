import { NextRequest, NextResponse } from 'next/server';
import { getServerStripe } from '@/lib/stripe';
import { getProductById } from '@/data/products';

interface CartItem {
  productId: string;
  quantity: number;
}

interface RequestBody {
  items: CartItem[];
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();

    // Validate request
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: items array is required' },
        { status: 400 }
      );
    }

    // Calculate total server-side (never trust client-side calculations for payment amounts)
    let total = 0;
    const lineItems: { name: string; quantity: number; amount: number }[] = [];

    for (const item of body.items) {
      // Validate item structure
      if (!item.productId || typeof item.quantity !== 'number' || item.quantity < 1) {
        return NextResponse.json(
          { error: 'Invalid item in cart' },
          { status: 400 }
        );
      }

      // Look up product server-side (prevents price manipulation)
      const product = getProductById(item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${item.productId}` },
          { status: 400 }
        );
      }

      // Limit quantity to prevent abuse
      const quantity = Math.min(item.quantity, 10);
      const itemTotal = product.price * quantity;
      total += itemTotal;

      lineItems.push({
        name: product.name,
        quantity,
        amount: itemTotal,
      });
    }

    // Validate total amount
    if (total < 50) {
      // Stripe minimum is $0.50
      return NextResponse.json(
        { error: 'Order total must be at least $0.50' },
        { status: 400 }
      );
    }

    // Create PaymentIntent server-side
    // This keeps the secret key secure and validates the amount
    const stripe = getServerStripe();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        // Store order info in metadata for webhook processing
        items: JSON.stringify(lineItems.map(i => ({ name: i.name, qty: i.quantity }))),
      },
    });

    // Return only the client_secret - never expose the full PaymentIntent
    // The client_secret allows the frontend to confirm the payment
    // without exposing sensitive details
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: total,
    });
  } catch (error) {
    console.error('PaymentIntent creation error:', error);

    // Return generic error to client (don't expose internal details)
    return NextResponse.json(
      { error: 'Failed to create payment intent. Please try again.' },
      { status: 500 }
    );
  }
}
