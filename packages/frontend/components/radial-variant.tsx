import {
	RadialBar,
	RadialBarChart,
	Legend,
	ResponsiveContainer,
	Tooltip
} from 'recharts'

import { ChartCategoryTooltip } from '@/components/chart-category-tooltip'
import formatCurrency from '@/lib/utils'

const COLORS = ['#0062ff', '#12c6ff', '#ff647f', '#ff9354']

type RadialVariantProps = {
	data: { name: string; value: number }[]
}

export default function RadialVariant({ data }: RadialVariantProps) {
	return (
		<ResponsiveContainer width='100%' height={300}>
			<RadialBarChart
				cx='50%'
				cy='30%'
				barSize={10}
				innerRadius='90%'
				outerRadius='40%'
				data={data.map((item, index) => ({
					...item,
					fill: COLORS[index % COLORS.length]
				}))}
			>
				<RadialBar
					label={{ fill: '#fff', position: 'insideStart', fontSize: '12px' }}
					background
					dataKey='value'
				/>

				<Legend
					layout='horizontal'
					verticalAlign='bottom'
					align='right'
					iconType='circle'
					content={({ payload }: any) => {
						return (
							<ul className='flex flex-col space-y-2'>
								{payload.map((entry: any, index: number) => (
									<li
										key={`item-${index}`}
										className='flex items-center space-x-2'
									>
										<span
											style={{ backgroundColor: entry.color }}
											className='size-2 rounded-full'
										/>
										<div className='space-x-1'>
											<span className='text-sm text-muted-foreground'>
												{entry.value}
											</span>
											<span className='text-sm'>
												{formatCurrency(entry.payload.value)}
											</span>
										</div>
									</li>
								))}
							</ul>
						)
					}}
				/>
				<Tooltip content={<ChartCategoryTooltip />} />
			</RadialBarChart>
		</ResponsiveContainer>
	)
}