import { useQueryClient } from '@tanstack/react-query'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { createTransaction } from '@/features/transactions/actions'

export default function useCreateTransaction(onClose?: () => void) {
	const [isCreatingTransaction, createTransactionTransition] = useTransition()
	const queryClient = useQueryClient()
	const onSubmit = ({
		userId,
		date,
		categoryId,
		payee,
		amount,
		notes,
		accountId
	}: {
		userId: string
		date: Date
		categoryId?: string | null
		payee: string
		amount: string
		notes?: string | null
		accountId: string
	}) => {
		createTransactionTransition(async () => {
			const transaction = await createTransaction({
				userId,
				date,
				categoryId: categoryId ?? '',
				payee,
				amount: +amount,
				notes: notes ?? '',
				accountId
			})
			if (transaction && 'error' in transaction) {
				toast.error('Error creando la transacción')
				return
			}
			await queryClient.invalidateQueries({
				queryKey: ['summary'],
				exact: false
			})
			toast.success('Transacción creada')
			onClose?.()
		})
	}
	return { isCreatingTransaction, onSubmit }
}
