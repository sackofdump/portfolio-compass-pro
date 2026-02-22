'use client'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'

export default function Home() {
  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <AppWithPaywall />
      </SignedIn>
    </>
  )
}

function LandingPage() {
  return (
    <div style={{
      minHeight: '100vh', background: '#0a0c10',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '24px', fontFamily: 'Inter, sans-serif'
    }}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="21" stroke="#00e5a0" strokeWidth="1.5"/>
        <polygon points="24,8 27,22 24,20 21,22" fill="#00e5a0"/>
        <polygon points="24,40 27,26 24,28 21,26" fill="#ff4d6d" opacity="0.6"/>
        <circle cx="24" cy="24" r="2.5" fill="#e8ecf0"/>
      </svg>
      <h1 style={{ color: '#e8ecf0', fontSize: '28px', fontWeight: 700, margin: 0 }}>
        Portfolio <span style={{ color: '#00e5a0' }}>Compass</span>
      </h1>
      <p style={{ color: '#5a6478', fontFamily: 'Space Mono, monospace', fontSize: '12px', margin: 0 }}>
        Portfolio Diversification &amp; Strategy Analyzer
      </p>
      <SignInButton mode="modal">
        <button style={{
          background: 'linear-gradient(135deg, #00e5a0, #00b87a)',
          color: '#000', border: 'none', borderRadius: '10px',
          padding: '14px 32px', fontSize: '14px', fontWeight: 600,
          cursor: 'pointer', fontFamily: 'DM Sans, sans-serif'
        }}>
          Get Started — It&apos;s Free
        </button>
      </SignInButton>
    </div>
  )
}

function AppWithPaywall() {
  const { user } = useUser()
  const [subscribed, setSubscribed] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetch('/api/check-subscription')
        .then(res => res.json())
        .then(data => setSubscribed(data.subscribed))
        .catch(() => setSubscribed(false))
    }
  }, [user])

  const handleSubscribe = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  if (subscribed === null) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0c10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#00e5a0', fontFamily: 'Space Mono, monospace', fontSize: '12px' }}>Loading...</div>
      </div>
    )
  }

  if (!subscribed) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0a0c10',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '24px', fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{ position: 'fixed', top: '16px', right: '20px' }}>
          <UserButton afterSignOutUrl="/" />
        </div>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="21" stroke="#00e5a0" strokeWidth="1.5"/>
          <polygon points="24,8 27,22 24,20 21,22" fill="#00e5a0"/>
          <polygon points="24,40 27,26 24,28 21,26" fill="#ff4d6d" opacity="0.6"/>
          <circle cx="24" cy="24" r="2.5" fill="#e8ecf0"/>
        </svg>
        <h1 style={{ color: '#e8ecf0', fontSize: '28px', fontWeight: 700, margin: 0 }}>
          Unlock Portfolio <span style={{ color: '#00e5a0' }}>Compass</span>
        </h1>
        <p style={{ color: '#5a6478', fontSize: '14px', margin: 0, textAlign: 'center', maxWidth: '320px' }}>
          Get full access to AI-powered portfolio analysis, strategy cards, health scoring and more.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '320px' }}>
          <button onClick={handleSubscribe} disabled={loading} style={{
            background: 'linear-gradient(135deg, #00e5a0, #00b87a)',
            color: '#000', border: 'none', borderRadius: '10px',
            padding: '14px 32px', fontSize: '14px', fontWeight: 600,
            cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', width: '100%'
          }}>
            {loading ? 'Loading...' : 'Subscribe for $2/mo'}
          </button>
          <button onClick={() => window.location.href = 'https://buy.stripe.com/28E28r6PQ8WQeOXbqN6AM00'} style={{
            background: 'none', color: '#5a6478', border: '1px solid #1e2430',
            borderRadius: '10px', padding: '12px 32px', fontSize: '13px',
            cursor: 'pointer', fontFamily: 'Space Mono, monospace', width: '100%'
          }}>
            Lifetime deal — $20
          </button>
        </div>
        <p style={{ color: '#5a6478', fontFamily: 'Space Mono, monospace', fontSize: '10px', margin: 0 }}>
          Cancel anytime · Secure payment via Stripe
        </p>
      </div>
    )
  }

  // Subscribed — show the full app
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'fixed', top: '16px', right: '20px', zIndex: 9999 }}>
        <UserButton afterSignOutUrl="/" />
      </div>
      <iframe
        src="/api/app"
        style={{ width: '100vw', height: '100vh', border: 'none', display: 'block' }}
      />
    </div>
  )
}
