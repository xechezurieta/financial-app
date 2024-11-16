'use client'
import { Plus } from 'lucide-react'

import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNewAccount } from '@/stores/use-new-account'

import { columns, Payment } from './colums'

const data: Payment[] = [
	{
		id: '728ed52f',
		amount: 100,
		status: 'pending',
		email: 'm@example.com'
	},
	{
		id: '728ed52f',
		amount: 100,
		status: 'pending',
		email: 'a@example.com'
	}
]

export default function AccountsPage() {
	const newAccount = useNewAccount()
	return (
		<div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
			<Card className='border-none drop-shadow-sm'>
				<CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
					<CardTitle className='text-xl line-clamp-1'>
						Página de cuentas
					</CardTitle>
					<Button onClick={newAccount.onOpen} size='sm'>
						<Plus className='size-4 mr-2' />
						Añadir nueva cuenta
					</Button>
				</CardHeader>
				<CardContent>
					<DataTable
						filterKey='email'
						columns={columns}
						data={data}
						onDelete={() => {}}
					/>
				</CardContent>
			</Card>
		</div>
	)
}
