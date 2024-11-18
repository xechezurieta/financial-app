import { Suspense } from 'react'

import DataTableLoader from '@/components/data-table-loader'
import NewTransaction from '@/components/transaction/new-transaction'
import TransactionsTableWrapper from '@/components/transaction/transactions-table-wrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TransactionsPage() {
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
						<TransactionsTableWrapper />
					</Suspense>
				</CardContent>
			</Card>
		</div>
	)
}
