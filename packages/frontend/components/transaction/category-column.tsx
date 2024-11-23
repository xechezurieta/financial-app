import { TriangleAlert } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useOpenCategory } from '@/stores/category/use-open-category'

type CategoryColumnProps = {
	id: string
	category: string | null
	categoryId: string | null
}

export default function CategoryColumn({
	category,
	categoryId
}: CategoryColumnProps) {
	const { onOpen: onOpenCategory } = useOpenCategory()
	const handleOpenCategory = () => {
		if (!categoryId) return
		onOpenCategory(categoryId)
	}
	return (
		<button
			className={cn('flex items-center cursor-pointer hover:underline', {
				'text-rose-500': !category
			})}
			onClick={handleOpenCategory}
		>
			{!category && <TriangleAlert className='mr-2 size-4 shrink-0' />}
			{category || 'Sin categoría'}
		</button>
	)
}