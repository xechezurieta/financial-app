import { useTransition } from 'react'
import { toast } from 'sonner'

import { createAccount } from '@/actions/account'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import AccountForm from '@/features/accounts/components/account-form'
import { useNewAccount } from '@/features/accounts/store/use-new-account'

export default function NewAccountSheet() {
	const { isOpen, onClose } = useNewAccount()
	const [isCreatingAccount, createAccountTransition] = useTransition()
	const onSubmit = ({ name }: { name: string }) => {
		createAccountTransition(async () => {
			const account = await createAccount(name)
			if (account && 'error' in account) {
				toast.error('Error creando la cuenta')
				return
			}
			onClose()
			toast.success('Cuenta creada')
		})
		console.log(name)
	}
	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className='space-y-4'>
				<SheetHeader>
					<SheetTitle>Nueva cuenta</SheetTitle>
					<SheetDescription>
						Crea una nueva cuenta para empezar controlar tus transacciones.
					</SheetDescription>
				</SheetHeader>
				<AccountForm
					onSubmit={onSubmit}
					disabled={isCreatingAccount}
					defaultValues={{
						name: ''
					}}
				/>
			</SheetContent>
		</Sheet>
	)
}
