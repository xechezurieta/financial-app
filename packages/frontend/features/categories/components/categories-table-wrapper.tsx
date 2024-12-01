import { getCategories } from '@/features/categories/categories-api'
import CategoriesTable from '@/features/categories/components/categories-table'

export default async function CategoriesTableWrapper() {
	const data = await getCategories()
	if (!data) return null
	return <CategoriesTable categories={data.categories} />
}
