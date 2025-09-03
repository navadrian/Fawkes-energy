import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'Fawkes Energy - Battery Intelligence for the Electric Revolution',
  description: 'Intelligent systems to monitor and model battery health across life stages. Reducing warranty costs, improving ROI prediction, and enabling circular battery economy.',
  keywords: 'battery intelligence, battery health, electric vehicles, energy storage, battery analytics, SOH, RUL, predictive modeling',
  authors: [{ name: 'Fawkes Energy' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Fawkes Energy - Battery Intelligence for the Electric Revolution',
    description: 'Intelligent systems to monitor and model battery health across life stages.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fawkes Energy - Battery Intelligence',
    description: 'Intelligent systems to monitor and model battery health across life stages.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <head>
        {/* Google Analytics script can be added here later using next/script */}
      </head>
      <body className="font-body">
        {children}
      </body>
    </html>
  )
}
