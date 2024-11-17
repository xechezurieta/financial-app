import { Suspense } from 'react'

import AccountsTableWrapper from '@/components/account/accounts-table-wrapper'
import NewAccount from '@/components/account/new-account'
import DataTableLoader from '@/components/data-table-loader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AccountsPage() {
	return (
		<div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
			<Card className='border-none drop-shadow-sm'>
				<CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
					<CardTitle className='text-xl line-clamp-1'>
						Página de cuentas
					</CardTitle>
					<NewAccount />
				</CardHeader>
				<CardContent>
					<Suspense fallback={<DataTableLoader />}>
						<AccountsTableWrapper />
					</Suspense>
				</CardContent>
			</Card>
		</div>
	)
}
