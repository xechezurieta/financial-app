'use client'
import { Row } from '@tanstack/react-table'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { DataTable } from '@/components/table/data-table'
import { deleteTransactions } from '@/features/transactions/actions'
import { columns } from '@/features/transactions/components/colums'
import { Transaction } from '@/types/types'

export default function TransactionsTable({
	transactions
}: {
	transactions: Transaction[]
}) {
	const [isDeleting, startDeleteTransition] = useTransition()
	const handleDelete = (row: Row<Transaction>[]) => {
		startDeleteTransition(async () => {
			const ids = row.map((r) => r.original.id)
			const data = await deleteTransactions(ids)
			if (data && 'error' in data) {
				toast.error('Error eliminando transacciones')
				return
			}
			toast.success('Transacciones eliminadas')
		})
	}
	return (
		<DataTable
			filterKey='payee'
			columns={columns}
			data={transactions}
			onDelete={handleDelete}
			disabled={isDeleting}
		/>
	)
}
