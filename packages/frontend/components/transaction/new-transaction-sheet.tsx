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
import { useNewTransaction } from '@/stores/transaction/use-new-transaction'

export default function NewTransactionSheet() {
	const { isOpen, onClose } = useNewTransaction()
	const [isCreatingTransaction, createTransactionTransition] = useTransition()
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
		categoryId: string
		payee: string
		amount: number
		notes: string
		accountId: string
	}) => {
		createTransactionTransition(async () => {
			const transaction = await createTransaction({
				userId,
				date,
				categoryId,
				payee,
				amount,
				notes,
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
					categoryOptions={categoryOptions}
					onCreateCategory={onCreateCategory}
					accountOptions={accountOptions}
					onCreateAccount={onCreateAccount}
				/>
			</SheetContent>
		</Sheet>
	)
}
