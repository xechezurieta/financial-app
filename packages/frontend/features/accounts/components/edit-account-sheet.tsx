import { useEffect, useState } from 'react'

import LoadingContainer from '@/components/loading-container'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import { getAccount } from '@/features/accounts/actions'
import AccountForm from '@/features/accounts/components/account-form'
import useDeleteAccount from '@/features/accounts/hooks/use-delete-account'
import useEditAccount from '@/features/accounts/hooks/use-edit-account'
import { useOpenAccount } from '@/features/accounts/store/use-open-account'
import { Account } from '@/features/accounts/types'
import { useConfirm } from '@/hooks/use-confirm'

export default function EditAccountSheet() {
	const { confirm, ConfirmDialog } = useConfirm({
		title: 'Eliminar cuenta',
		description: '¿Estás seguro de que quieres eliminar esta cuenta?'
	})
	const { isOpen, onClose, id } = useOpenAccount()
	const { handleEdit, isEditingAccount } = useEditAccount()
	const { handleDelete, isDeletingAccount } = useDeleteAccount()
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
		if (!id) return
		handleEdit({ name, id })
	}

	const onDelete = async () => {
		if (!id) return
		const confirmed = await confirm()
		if (!confirmed) return
		handleDelete({ id, onClose })
	}

	return (
		<>
			<ConfirmDialog />
			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetContent className='space-y-4'>
					<SheetHeader>
						<SheetTitle>Editar cuenta</SheetTitle>
						<SheetDescription>
							Modifica los datos de tu cuenta.
						</SheetDescription>
					</SheetHeader>
					{isLoading ? (
						<LoadingContainer />
					) : (
						<AccountForm
							id={id}
							onSubmit={onSubmit}
							disabled={isEditingAccount || isLoading || isDeletingAccount}
							defaultValues={{
								name: account?.name || ''
							}}
							onDelete={onDelete}
						/>
					)}
				</SheetContent>
			</Sheet>
		</>
	)
}
