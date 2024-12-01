import { useTransition } from 'react'
import { toast } from 'sonner'

import { createCategory } from '@/features/categories/actions'

export default function useCreateCategory() {
	const [isCreatingCategory, createCategoryTransition] = useTransition()
	const onSubmit = (name: string) => {
		createCategoryTransition(async () => {
			const category = await createCategory(name)
			if (category && 'error' in category) {
				toast.error('Error creando la categoría')
				return
			}
			toast.success('Categoría creada')
		})
	}
	return { isCreatingCategory, onSubmit }
}
