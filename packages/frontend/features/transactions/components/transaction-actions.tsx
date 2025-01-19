import { Edit, MoreHorizontal, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import useDeleteTransaction from '@/features/transactions/hooks/use-delete-transaction'
import { useOpenTransaction } from '@/features/transactions/stores/use-open-transaction'
import { useConfirm } from '@/hooks/use-confirm'

export default function TransactionActions({ id }: { id: string }) {
	const { ConfirmDialog, confirm } = useConfirm({
		title: 'Eliminar transacción',
		description: '¿Estás seguro de que quieres eliminar esta transacción?'
	})
	const { onOpen } = useOpenTransaction()

	const { isDeletingTransaction, handleDelete } = useDeleteTransaction()

	const onDelete = async () => {
		if (!id) return
		const confirmed = await confirm()
		if (!confirmed) return
		handleDelete({ id })
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
						disabled={isDeletingTransaction}
						onClick={() => onOpen(id)}
					>
						<Edit className='mr-2 size-4' />
						Editar
					</DropdownMenuItem>

					<DropdownMenuItem disabled={isDeletingTransaction} onClick={onDelete}>
						<Trash className='mr-2 size-4' />
						Eliminar
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
