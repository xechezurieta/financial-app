import { useTransition } from 'react'
import { toast } from 'sonner'

import { createAccount } from '@/actions/account'
import AccountForm from '@/components/account/account-form'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import { useNewAccount } from '@/stores/use-new-account'

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
