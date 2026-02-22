import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { isUserSubscribed } from '@/lib/supabase'

export async function GET() {
  const { userId } = await auth()
  
  if (!userId) {
    return NextResponse.json({ subscribed: false })
  }

  const subscribed = await isUserSubscribed(userId)
  return NextResponse.json({ subscribed })
}