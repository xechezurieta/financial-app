import { Suspense } from 'react'

import DataTableLoader from '@/components/data-table-loader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import NewTransaction from '@/features/transactions/components/new-transaction'
import TransactionsTableWrapper from '@/features/transactions/components/transactions-table-wrapper'

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default async function TransactionsPage(props: {
	searchParams: SearchParams
}) {
	const params = await props.searchParams
	return (
		<div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
			<Card className='border-none drop-shadow-sm'>
				<CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
					<CardTitle className='text-xl line-clamp-1'>
						Página de transacciones
					</CardTitle>
					<NewTransaction />
				</CardHeader>
				<CardContent>
					<Suspense fallback={<DataTableLoader />}>
						<TransactionsTableWrapper params={params} />
					</Suspense>
				</CardContent>
			</Card>
		</div>
	)
}
