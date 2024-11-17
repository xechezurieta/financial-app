import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { deleteCategory } from '@/actions/category'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useConfirm } from '@/hooks/use-confirm'
import { useOpenCategory } from '@/stores/category/use-open-category'

export default function CategoryActions({ id }: { id: string }) {
	const { ConfirmDialog, confirm } = useConfirm({
		title: 'Eliminar categoría',
		description: '¿Estás seguro de que quieres eliminar esta categoría?'
	})
	const { onOpen } = useOpenCategory()
	const [isDeletingCategory, deleteCategoryTransition] = useTransition()

	const onDelete = async () => {
		if (!id) return
		const confirmed = await confirm()
		if (!confirmed) return
		deleteCategoryTransition(async () => {
			const category = await deleteCategory(id)
			if (category && 'error' in category) {
				toast.error('Error eliminando la categoría')
				return
			}
			toast.success('Categoría eliminada')
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
						disabled={isDeletingCategory}
						onClick={() => onOpen(id)}
					>
						<Edit className='mr-2 size-4' />
						Editar
					</DropdownMenuItem>

					<DropdownMenuItem disabled={isDeletingCategory} onClick={onDelete}>
						<Trash className='mr-2 size-4' />
						Eliminar
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
