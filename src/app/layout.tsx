import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackgroundElements from '@/components/BackgroundElements'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Online Board Games',
  description: 'Play board games online with friends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-screen relative`}>
        <BackgroundElements />
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
} 