import Header from '@/components/header/header'

export default function ProtectedLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Header />
			<main className='px-3 lg:px-14'>{children}</main>
		</>
	)
}
