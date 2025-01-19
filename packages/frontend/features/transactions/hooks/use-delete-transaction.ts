import { useQueryClient } from '@tanstack/react-query'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { deleteTransaction } from '@/features/transactions/actions'

export default function useDeleteTransaction() {
	const [isDeletingTransaction, deleteTransactionTransition] = useTransition()
	const queryClient = useQueryClient()
	const handleDelete = ({
		id,
		onClose
	}: {
		id: string
		onClose?: () => void
	}) => {
		deleteTransactionTransition(async () => {
			const transaction = await deleteTransaction(id)
			if (transaction && 'error' in transaction) {
				toast.error('Error eliminando la transacción')
				return
			}
			await queryClient.invalidateQueries({
				queryKey: ['summary'],
				exact: false
			})
			onClose?.()
			toast.success('Transacción eliminada')
		})
	}
	return { isDeletingTransaction, handleDelete }
}
