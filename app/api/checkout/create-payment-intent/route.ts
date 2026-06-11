import { AuthenticateUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";


export async function POST(request: NextRequest) {
    if (!process.env.STRIPE_SECRET_KEY) {
        return NextResponse.json({ error: 'Stripe key not configured.' }, { status: 500 })
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { orderId, amount } = await request.json();
    const user = await AuthenticateUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'eur',
            receipt_email: user.email,
            metadata: {
                userId: user.id,
                orderId: orderId
            },
            automatic_payment_methods: { enabled: true }
        })
        return NextResponse.json({ paymentIntent });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}