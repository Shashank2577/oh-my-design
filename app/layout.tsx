import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'oh-my-design',
  description: '32 design style showcases',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
