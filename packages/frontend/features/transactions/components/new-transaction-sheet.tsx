import { useTransition } from 'react'
import { toast } from 'sonner'

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
import TransactionForm from '@/features/transactions/components/transaction-form'
import useCreateTransaction from '@/features/transactions/hooks/use-create-transaction'
import { useNewTransaction } from '@/features/transactions/stores/use-new-transaction'

export default function NewTransactionSheet() {
	const { isOpen, onClose } = useNewTransaction()
	const { isCreatingTransaction, onSubmit } = useCreateTransaction(onClose)
	const { data: dataCategories } = useGetCategories()
	const categories =
		dataCategories && 'categories' in dataCategories
			? dataCategories.categories
			: []
	const { onSubmit: onCreateCategory } = useCreateCategory()
	const { onSubmit: onCreateAccount } = useCreateAccount()
	const { data } = useGetAccounts()

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
					accountOptions={
						data?.accounts.map((account) => ({
							label: account.name,
							value: account.id
						})) || []
					}
					onCreateAccount={onCreateAccount}
				/>
			</SheetContent>
		</Sheet>
	)
}
