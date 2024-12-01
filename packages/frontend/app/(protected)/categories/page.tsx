import { Suspense } from 'react'

import DataTableLoader from '@/components/data-table-loader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CategoriesTableWrapper from '@/features/categories/components/categories-table-wrapper'
import NewCategory from '@/features/categories/components/new-category'

export default function CategoriesPage() {
	return (
		<div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
			<Card className='border-none drop-shadow-sm'>
				<CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
					<CardTitle className='text-xl line-clamp-1'>
						Página de categorías
					</CardTitle>
					<NewCategory />
				</CardHeader>
				<CardContent>
					<Suspense fallback={<DataTableLoader />}>
						<CategoriesTableWrapper />
					</Suspense>
				</CardContent>
			</Card>
		</div>
	)
}
