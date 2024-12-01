import { useTransition } from 'react'
import { toast } from 'sonner'

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import { createCategory } from '@/features/categories/actions'
import CategoryForm from '@/features/categories/components/category-form'
import { useNewCategory } from '@/features/categories/stores/use-new-category'

export default function NewCategorySheet() {
	const { isOpen, onClose } = useNewCategory()
	const [isCreatingCategory, createCategoryTransition] = useTransition()
	const onSubmit = ({ name }: { name: string }) => {
		createCategoryTransition(async () => {
			const category = await createCategory(name)
			if (category && 'error' in category) {
				toast.error('Error creando la categoría')
				return
			}
			onClose()
			toast.success('Categoría creada')
		})
	}
	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className='space-y-4'>
				<SheetHeader>
					<SheetTitle>Nueva categoría</SheetTitle>
					<SheetDescription>
						Crea una nueva categoría para empezar controlar tus transacciones.
					</SheetDescription>
				</SheetHeader>
				<CategoryForm
					onSubmit={onSubmit}
					disabled={isCreatingCategory}
					defaultValues={{
						name: ''
					}}
				/>
			</SheetContent>
		</Sheet>
	)
}
