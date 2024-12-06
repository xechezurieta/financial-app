/* 'use client' */

import { Suspense } from 'react'

import DataCharts from '@/features/summary/components/data-charts'
import DataChartsSkeleton from '@/features/summary/components/data-charts-skeleton'
import DataGrid from '@/features/summary/components/data-grid'
import DataGridSkeleton from '@/features/summary/components/data-grid-skeleton'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default async function Dashboard(props: { searchParams: SearchParams }) {
	const params = await props.searchParams

	return (
		<div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
			<Suspense fallback={<DataGridSkeleton />}>
				<DataGrid key={params.toString()} params={params} />
			</Suspense>
			<Suspense fallback={<DataChartsSkeleton />}>
				<DataCharts key={params.toString()} params={params} />
			</Suspense>
		</div>
	)
}
