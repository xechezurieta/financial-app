'use client'
import { Row } from '@tanstack/react-table'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { DataTable } from '@/components/table/data-table'
import { deleteAccounts } from '@/features/accounts/actions'
import { columns } from '@/features/accounts/components/colums'
import { Account } from '@/types/types'

export default function AccountsTable({ accounts }: { accounts: Account[] }) {
	const [isDeleting, startDeleteTransition] = useTransition()
	const handleDelete = (row: Row<Account>[]) => {
		startDeleteTransition(async () => {
			const ids = row.map((r) => r.original.id)
			const data = await deleteAccounts(ids)
			if (data && 'error' in data) {
				toast.error('Error eliminando cuentas')
				return
			}
			toast.success('Cuentas eliminadas')
		})
	}
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
