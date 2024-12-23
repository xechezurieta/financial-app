import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip
} from 'recharts'

import { ChartCategoryTooltip } from '@/features/summary/components/chart-category-tooltip'
import { formatPercentage } from '@/lib/utils'

const COLORS = ['#0062ff', '#12c6ff', '#ff647f', '#ff9354']

type PieVariantProps = {
	data: { name: string; value: number }[]
}

export default function PieVariant({ data }: PieVariantProps) {
	return (
		<ResponsiveContainer width='100%' height={300}>
			<PieChart>
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
												{formatPercentage(entry.payload.percent * 100)}
											</span>
										</div>
									</li>
								))}
							</ul>
						)
					}}
				/>
				<Tooltip content={<ChartCategoryTooltip />} />
				<Pie
					data={data}
					cx='50%'
					cy='50%'
					outerRadius={90}
					innerRadius={60}
					paddingAngle={2}
					fill='#8884d8'
					dataKey='value'
					labelLine={false}
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	)
}
