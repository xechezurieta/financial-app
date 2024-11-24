/* 'use client' */

import { Suspense } from 'react'

import DataCharts from '@/components/data-charts'
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
			<DataCharts params={params} />
		</div>
	)
}
