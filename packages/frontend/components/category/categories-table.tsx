'use client'
import { Row } from '@tanstack/react-table'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { deleteCategories } from '@/actions/category'
import { columns } from '@/app/(protected)/categories/colums'
import { DataTable } from '@/components/data-table'
import { Category } from '@/types/types'

export default function CategoriesTable({
	categories
}: {
	categories: Category[]
}) {
	const [isDeleting, startDeleteTransition] = useTransition()
	const handleDelete = (row: Row<Category>[]) => {
		startDeleteTransition(async () => {
			const ids = row.map((r) => r.original.id)
			const data = await deleteCategories(ids)
			if (data && 'error' in data) {
				toast.error('Error eliminando categorías')
				return
			}
			toast.success('Categorías eliminadas')
		})
	}
	return (
		<DataTable
			filterKey='name'
			columns={columns}
			data={categories}
			onDelete={handleDelete}
			disabled={isDeleting}
		/>
	)
}
