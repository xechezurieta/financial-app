import { getAPIUrl } from '@/lib/utils'
import { Category } from '@/types/types'

export const getCategories = async () => {
	const apiUrl = getAPIUrl('/categories')
	try {
		const response = await fetch(apiUrl)
		if (!response.ok) {
			return null
		}
		const data: { categories: Category[] } = await response.json()
		return data
	} catch (error) {
		console.error(error)
		return null
	}
}