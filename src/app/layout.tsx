import type { Metadata } from 'next'
import { Inter, Orbitron, Fira_Code } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/effects/CustomCursor'
import { ThemeProvider } from '@/components/ThemeProvider'
import { withBasePath } from '@/lib/utils'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://aakash-kharb.github.io/AakashKharb/'),
  title: 'Aakash Kharb',
  description: 'Aakash Kharb builds useful AI products, machine learning systems, and cloud software.',
  keywords: ['Aakash Kharb', 'AI Engineer', 'Machine Learning', 'Cloud Engineering', 'Software Developer', 'Portfolio'],
  authors: [{ name: 'Aakash Kharb' }],
  creator: 'Aakash Kharb',
  icons: {
    icon: withBasePath('/favicon.png'),
    shortcut: withBasePath('/favicon.png'),
    apple: withBasePath('/favicon.png'),
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aakash-kharb.github.io/AakashKharb/',
    title: 'Aakash Kharb — AI / ML Engineer',
    description: 'Useful AI products, machine learning systems, and cloud software.',
    siteName: 'Aakash Kharb Portfolio',
    images: [{ url: '/og.png', width: 1731, height: 909, alt: 'Aakash — AI / ML Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aakash Kharb — AI / ML Engineer',
    description: 'Useful AI products, machine learning systems, and cloud software.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${orbitron.variable} ${firaCode.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CustomCursor />
          <Navigation />
          <main id="main-content" className="relative z-10">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
