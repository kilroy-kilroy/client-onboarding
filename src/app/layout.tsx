import type { Metadata } from 'next'
import { Anton, Poppins } from 'next/font/google'
import './globals.css'

// Tim Kilroy Brand Typography
const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton'
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'WTF Agency Intelligence System',
  description: 'Turn WTF into Wow, that\'s fantastic. More Revenue. More Profit. More Happy.',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${anton.variable} font-poppins`}>{children}</body>
    </html>
  )
}
