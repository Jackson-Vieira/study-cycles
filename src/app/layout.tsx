import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ciclo de estudos',
  description:
    'Crie seu ciclo de estudos para estudar de maneira descomplicada',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={cn(inter.className, 'antialiased min-h-svh flex flex-col')}
      >
        {children}
      </body>
    </html>
  )
}
