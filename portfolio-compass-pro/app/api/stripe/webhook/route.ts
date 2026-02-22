import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const userId = session.metadata?.userId
    console.log('User subscribed:', userId)
    // TODO: save subscription status to Supabase
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object
    console.log('Subscription cancelled:', subscription)
    // TODO: remove subscription status from Supabase
  }

  return NextResponse.json({ received: true })
}