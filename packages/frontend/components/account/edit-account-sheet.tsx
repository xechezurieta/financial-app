import { Loader2 } from 'lucide-react'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'

import { createAccount, getAccount } from '@/actions/account'
import AccountForm from '@/components/account/account-form'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import { useOpenAccount } from '@/stores/use-open-account'
import { Account } from '@/types/types'

export default function EditAccountSheet() {
	const { isOpen, onClose, id } = useOpenAccount()
	const [isCreatingAccount, createAccountTransition] = useTransition()
	const [account, setAccount] = useState<Account | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (id) {
			setIsLoading(true)
			getAccount(id).then((data) => {
				if (data && 'account' in data) {
					setAccount(data.account)
				}
				setIsLoading(false)
			})
		} else {
			setAccount(null)
		}
	}, [id])

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
	}

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className='space-y-4'>
				<SheetHeader>
					<SheetTitle>Editar cuenta</SheetTitle>
					<SheetDescription>Modifica los datos de tu cuenta.</SheetDescription>
				</SheetHeader>
				{isLoading ? (
					<div className='flex justify-center items-center absolute inset-0'>
						<Loader2 className='size-4 text-muted-foreground animate-spin' />
					</div>
				) : (
					<AccountForm
						id={id}
						onSubmit={onSubmit}
						disabled={isCreatingAccount || isLoading}
						defaultValues={{
							name: account?.name || ''
						}}
					/>
				)}
			</SheetContent>
		</Sheet>
	)
}
