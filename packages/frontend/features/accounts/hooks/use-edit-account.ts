import { useTransition } from 'react'
import { toast } from 'sonner'

import { editAccountName } from '@/features/accounts/actions'

export default function useEditAccount() {
	const [isEditingAccount, editAccountTransition] = useTransition()
	const handleEdit = ({
		name,
		id,
		onClose
	}: {
		name: string
		id: string
		onClose?: () => void
	}) => {
		editAccountTransition(async () => {
			const account = await editAccountName({ name, accountId: id })
			if (account && 'error' in account) {
				toast.error('Error editando la cuenta')
				return
			}
			toast.success('Cuenta editada')
			onClose?.()
		})
	}
	return { isEditingAccount, handleEdit }
}
