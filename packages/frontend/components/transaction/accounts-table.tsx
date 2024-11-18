'use client'
import { Row } from '@tanstack/react-table'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { deleteAccounts } from '@/actions/account'
import { columns } from '@/app/(protected)/accounts/colums'
import { DataTable } from '@/components/data-table'
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
