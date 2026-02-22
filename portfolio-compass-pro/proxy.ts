export { auth as default } from '@clerk/nextjs/server'

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|sign-in|sign-up).*)'],
}