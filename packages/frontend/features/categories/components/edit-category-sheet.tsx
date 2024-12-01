import { Loader2 } from 'lucide-react'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import {
	deleteCategory,
	editCategoryName,
	getCategory
} from '@/features/categories/actions'
import CategoryForm from '@/features/categories/components/category-form'
import { useOpenCategory } from '@/features/categories/stores/use-open-category'
import { useConfirm } from '@/hooks/use-confirm'
import { Category } from '@/types/types'

export default function EditCategorySheet() {
	const { confirm, ConfirmDialog } = useConfirm({
		title: 'Eliminar categoría',
		description: '¿Estás seguro de que quieres eliminar esta categoría?'
	})
	const { isOpen, onClose, id } = useOpenCategory()
	const [isEditingCategory, editCategoryTransition] = useTransition()
	const [isDeletingCategory, deleteCategoryTransition] = useTransition()
	const [category, setCategory] = useState<Category | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (id) {
			setIsLoading(true)
			getCategory(id).then((data) => {
				if (data && 'category' in data) {
					setCategory(data.category)
				}
				setIsLoading(false)
			})
		} else {
			setCategory(null)
		}
	}, [id])

	const onSubmit = ({ name }: { name: string }) => {
		editCategoryTransition(async () => {
			if (!id) return
			const account = await editCategoryName({ name, categoryId: id })
			if (account && 'error' in account) {
				toast.error('Error editando la categoría')
				return
			}
			onClose()
			toast.success('Categoría editada')
		})
	}

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
			onClose()
			toast.success('Categoría eliminada')
		})
	}

	return (
		<>
			<ConfirmDialog />
			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetContent className='space-y-4'>
					<SheetHeader>
						<SheetTitle>Editar categoría</SheetTitle>
						<SheetDescription>
							Modifica los datos de tu categoría.
						</SheetDescription>
					</SheetHeader>
					{isLoading ? (
						<div className='flex justify-center items-center absolute inset-0'>
							<Loader2 className='size-4 text-muted-foreground animate-spin' />
						</div>
					) : (
						<CategoryForm
							id={id}
							onSubmit={onSubmit}
							disabled={isEditingCategory || isLoading || isDeletingCategory}
							defaultValues={{
								name: category?.name || ''
							}}
							onDelete={onDelete}
						/>
					)}
				</SheetContent>
			</Sheet>
		</>
	)
}
