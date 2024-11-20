import { useTransition } from 'react'
import { toast } from 'sonner'

import { createAccount } from '@/actions/account'

export default function useCreateAccount() {
	const [isCreatingAccount, createAccountTransition] = useTransition()
	const onSubmit = (name: string) => {
		createAccountTransition(async () => {
			const account = await createAccount(name)
			if (account && 'error' in account) {
				toast.error('Error creando la cuenta')
				return
			}
			toast.success('Cuenta creada')
		})
	}
	return { isCreatingAccount, onSubmit }
}
