import { TriangleAlert } from 'lucide-react'

import { useOpenCategory } from '@/features/categories/stores/use-open-category'
import { cn } from '@/lib/utils'
import { useOpenTransaction } from '@/stores/transaction/use-open-transaction'

type CategoryColumnProps = {
	id: string
	category: string | null
	categoryId: string | null
}

export default function CategoryColumn({
	id,
	category,
	categoryId
}: CategoryColumnProps) {
	const { onOpen: onOpenCategory } = useOpenCategory()
	const { onOpen: onOpenTransaction } = useOpenTransaction()
	const handleOpenCategory = () => {
		categoryId ? onOpenCategory(categoryId) : onOpenTransaction(id)
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
