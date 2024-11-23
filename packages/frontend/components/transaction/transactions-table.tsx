'use client'
import { Row } from '@tanstack/react-table'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { deleteTransactions } from '@/actions/transaction'
import { columns } from '@/app/(protected)/transactions/colums'
import { DataTable } from '@/components/data-table'
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
