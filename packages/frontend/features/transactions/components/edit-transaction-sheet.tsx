import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'

import LoadingContainer from '@/components/loading-container'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import useCreateAccount from '@/features/accounts/hooks/use-create-account'
import useGetAccounts from '@/features/accounts/hooks/use-get-accounts'
import useCreateCategory from '@/features/categories/hooks/use-create-category'
import useGetCategories from '@/features/categories/hooks/use-get-categories'
import {
	getTransaction,
	updateTransaction
} from '@/features/transactions/actions'
import TransactionForm from '@/features/transactions/components/transaction-form'
import useDeleteTransaction from '@/features/transactions/hooks/use-delete-transaction'
import { useOpenTransaction } from '@/features/transactions/stores/use-open-transaction'
import { Transaction } from '@/features/transactions/types'
import { useConfirm } from '@/hooks/use-confirm'

export default function EditTransactionSheet() {
	const { confirm, ConfirmDialog } = useConfirm({
		title: 'Eliminar transacción',
		description: '¿Estás seguro de que quieres eliminar esta transacción?'
	})
	const { isOpen, onClose, id } = useOpenTransaction()
	const [isEditingTransaction, editTransactionTransition] = useTransition()
	const { isDeletingTransaction, handleDelete } = useDeleteTransaction()
	const [transaction, setTransaction] = useState<Transaction | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const { data: dataCategories } = useGetCategories()
	const categories =
		dataCategories && 'categories' in dataCategories
			? dataCategories.categories
			: []
	const { onSubmit: onCreateCategory } = useCreateCategory()
	const { onSubmit: onCreateAccount } = useCreateAccount()
	const { data } = useGetAccounts()
	useEffect(() => {
		if (id) {
			setIsLoading(true)
			getTransaction(id).then((data) => {
				if (data && 'transaction' in data) {
					setTransaction(data.transaction)
				}
				setIsLoading(false)
			})
		} else {
			setTransaction(null)
		}
	}, [id])

	const onSubmit = ({
		date,
		categoryId,
		payee,
		amount,
		notes,
		accountId,
		userId
	}: {
		date: Date
		categoryId?: string | null
		payee: string
		amount: string
		notes?: string | null
		accountId: string
		userId: string
	}) => {
		editTransactionTransition(async () => {
			if (!id) return
			const transaction = await updateTransaction({
				transactionId: id,
				date,
				categoryId,
				payee,
				amount: +amount,
				notes,
				accountId
			})
			if (transaction && 'error' in transaction) {
				toast.error('Error editando la transacción')
				return
			}
			onClose()
			toast.success('Transacción editada')
		})
	}

	const onDelete = async () => {
		if (!id) return
		const confirmed = await confirm()
		if (!confirmed) return
		handleDelete({
			id,
			onClose
		})
	}

	return (
		<>
			<ConfirmDialog />
			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetContent className='space-y-4'>
					<SheetHeader>
						<SheetTitle>Editar transacción</SheetTitle>
						<SheetDescription>
							Modifica los datos de tu transacción.
						</SheetDescription>
					</SheetHeader>
					{isLoading ? (
						<LoadingContainer />
					) : (
						<TransactionForm
							id={id}
							onSubmit={onSubmit}
							disabled={
								isEditingTransaction || isLoading || isDeletingTransaction
							}
							defaultValues={{
								accountId: transaction?.accountId || '',
								categoryId: transaction?.categoryId || '',
								amount: transaction?.amount.toString() || '',
								date: transaction?.date
									? new Date(transaction.date)
									: new Date(),
								payee: transaction?.payee || '',
								notes: transaction?.notes || ''
							}}
							onDelete={onDelete}
							categoryOptions={categories.map((category) => ({
								label: category.name,
								value: category.id
							}))}
							onCreateCategory={onCreateCategory}
							accountOptions={
								data?.accounts.map((account) => ({
									label: account.name,
									value: account.id
								})) || []
							}
							onCreateAccount={onCreateAccount}
						/>
					)}
				</SheetContent>
			</Sheet>
		</>
	)
}
