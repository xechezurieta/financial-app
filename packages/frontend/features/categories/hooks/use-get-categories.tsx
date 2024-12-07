import { useEffect, useState, useTransition } from 'react'

import { getCategoriesAction } from '@/features/categories/actions'
import { Category } from '@/features/categories/types'

export default function useGetCategories() {
	const [isPending, startTransition] = useTransition()
	const [categories, setCategories] = useState<Category[]>([])
	useEffect(() => {
		startTransition(async () => {
			const categories = await getCategoriesAction()
			if (categories && 'error' in categories) {
				setCategories([])
				return
			}
			setCategories(categories.categories)
		})
	}, [startTransition])
	return { isPending, categories }
}
