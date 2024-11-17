import CategoriesTable from '@/components/category/categories-table'
import { getCategories } from '@/services/categories-api'

export default async function CategoriesTableWrapper() {
	const data = await getCategories()
	if (!data) return null
	return <CategoriesTable categories={data.categories} />
}
