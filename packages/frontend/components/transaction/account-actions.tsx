import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { deleteAccount } from '@/actions/account'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useConfirm } from '@/hooks/use-confirm'
import { useOpenAccount } from '@/stores/account/use-open-account'

export default function AccountActions({ id }: { id: string }) {
	const { ConfirmDialog, confirm } = useConfirm({
		title: 'Eliminar cuenta',
		description: '¿Estás seguro de que quieres eliminar esta cuenta?'
	})
	const { onOpen } = useOpenAccount()
	const [isDeletingAccount, deleteAccountTransition] = useTransition()

	const onDelete = async () => {
		if (!id) return
		const confirmed = await confirm()
		if (!confirmed) return
		deleteAccountTransition(async () => {
			const account = await deleteAccount(id)
			if (account && 'error' in account) {
				toast.error('Error eliminando la cuenta')
				return
			}
			toast.success('Cuenta eliminada')
		})
	}

	return (
		<>
			<ConfirmDialog />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='size-8 p-0'>
						<MoreHorizontal className='size-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem
						disabled={isDeletingAccount}
						onClick={() => onOpen(id)}
					>
						<Edit className='mr-2 size-4' />
						Editar
					</DropdownMenuItem>

					<DropdownMenuItem disabled={isDeletingAccount} onClick={onDelete}>
						<Trash className='mr-2 size-4' />
						Eliminar
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
