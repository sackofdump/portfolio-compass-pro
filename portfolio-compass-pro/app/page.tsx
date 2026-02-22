'use client'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <>
      <SignedOut>
        <div style={{
          minHeight: '100vh',
          background: '#0a0c10',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          fontFamily: 'Inter, sans-serif'
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
              color: '#000',
              border: 'none',
              borderRadius: '10px',
              padding: '14px 32px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif'
            }}>
              Get Started — It&apos;s Free
            </button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <PortfolioApp />
      </SignedIn>
    </>
  )
}

function PortfolioApp() {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'fixed',
        top: '16px',
        right: '20px',
        zIndex: 9999
      }}>
        <UserButton afterSignOutUrl="/" />
      </div>
      <iframe
        src="/app.html"
        style={{
          width: '100vw',
          height: '100vh',
          border: 'none',
          display: 'block'
        }}
      />
    </div>
  )
}