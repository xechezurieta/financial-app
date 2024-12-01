import localFont from 'next/font/local'

import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import SheetProvider from '@/providers/sheet-provider'
import TanstackProvider from '@/providers/tanstack-provider'

import type { Metadata } from 'next'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900'
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900'
})

export const metadata: Metadata = {
	title: 'Financial',
	description: 'Plataforma de control financiero'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<TanstackProvider>
					<SheetProvider />
					{children}

					<Toaster richColors />
				</TanstackProvider>
			</body>
		</html>
	)
}
