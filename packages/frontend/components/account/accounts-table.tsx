'use client'
import { columns } from '@/app/(protected)/accounts/colums'
import { Account } from '@/types/types'

import { DataTable } from '../data-table'

export default function AccountsTable({ accounts }: { accounts: Account[] }) {
	return (
		<DataTable
			filterKey='name'
			columns={columns}
			data={accounts}
			onDelete={() => {}}
		/>
	)
}
