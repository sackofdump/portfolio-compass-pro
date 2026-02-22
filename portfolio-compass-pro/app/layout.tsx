import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const metadata = {
  title: 'Portfolio Compass Pro',
  description: 'AI-powered portfolio analysis',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}