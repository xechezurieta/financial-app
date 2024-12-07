'use client'

import { DataTable } from '@/components/table/data-table'
import { columns } from '@/features/accounts/components/colums'
import useDeleteAccount from '@/features/accounts/hooks/use-delete-account'
import { Account } from '@/features/accounts/types'

export default function AccountsTable({ accounts }: { accounts: Account[] }) {
	const { isDeleting, handleDelete } = useDeleteAccount()
	return (
		<DataTable
			filterKey='name'
			columns={columns}
			data={accounts}
			onDelete={handleDelete}
			disabled={isDeleting}
		/>
	)
}
