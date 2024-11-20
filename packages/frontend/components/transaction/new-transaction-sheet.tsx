import { useTransition } from 'react'
import { toast } from 'sonner'

import { createTransaction } from '@/actions/transaction'
import TransactionForm from '@/components/transaction/transaction-form'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import useCreateAccount from '@/hooks/use-create-account'
import useCreateCategory from '@/hooks/use-create-category'
import useGetAccounts from '@/hooks/use-get-accounts'
import useGetCategories from '@/hooks/use-get-categories'
import { useNewTransaction } from '@/stores/transaction/use-new-transaction'

export default function NewTransactionSheet() {
	const { isOpen, onClose } = useNewTransaction()
	const [isCreatingTransaction, createTransactionTransition] = useTransition()
	const { categories } = useGetCategories()
	const { onSubmit: onCreateCategory } = useCreateCategory()
	const { onSubmit: onCreateAccount } = useCreateAccount()
	const { accounts } = useGetAccounts()
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
			onClose()
			toast.success('Transacción creada')
		})
	}
	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className='space-y-4'>
				<SheetHeader>
					<SheetTitle>Nueva transacción</SheetTitle>
					<SheetDescription>Añadir una nueva transacción</SheetDescription>
				</SheetHeader>
				<TransactionForm
					onSubmit={onSubmit}
					disabled={isCreatingTransaction}
					categoryOptions={categories.map((category) => ({
						label: category.name,
						value: category.id
					}))}
					onCreateCategory={onCreateCategory}
					accountOptions={accounts.map((account) => ({
						label: account.name,
						value: account.id
					}))}
					onCreateAccount={onCreateAccount}
				/>
			</SheetContent>
		</Sheet>
	)
}
