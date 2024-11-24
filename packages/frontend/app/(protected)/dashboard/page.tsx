/* 'use client' */

import { Suspense } from 'react'

import DataCharts from '@/components/data-charts'
import DataChartsSkeleton from '@/components/data-charts-skeleton'
import DataGrid from '@/components/data-grid'
import DataGridSkeleton from '@/components/data-grid-skeleton'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export default async function Dashboard(props: { params: SearchParams }) {
	const params = await props.params
	return (
		<div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
			<Suspense fallback={<DataGridSkeleton />}>
				<DataGrid params={params} />
			</Suspense>
			<Suspense fallback={<DataChartsSkeleton />}>
				<DataCharts params={params} />
			</Suspense>
		</div>
	)
}
