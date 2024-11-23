import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ArrowUpDown } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import formatCurrency from '@/lib/utils'
import { Transaction } from '@/types/types'

export const columns: ColumnDef<Transaction>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: 'date',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Fecha
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const date = row.getValue('date') as Date
			return <span>{format(date, 'yyyy-MM-dd')}</span>
		}
	},
	{
		accessorKey: 'category',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Categoría
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			return <span>{row.original.category}</span>
		}
	},
	{
		accessorKey: 'payee',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Beneficiario
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'amount',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Cantidad
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount'))
			return (
				<Badge
					variant={amount < 0 ? 'destructive' : 'primary'}
					className='text-xs font-medium px-3 py-2'
				>
					{formatCurrency(amount)}
				</Badge>
			)
		}
	},
	{
		accessorKey: 'account',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Cuenta
					<ArrowUpDown className='ml-2 size-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			return <span>{row.original.account}</span>
		}
	}
	/* {
		id: 'actions',
		cell: ({ row }) => <AccountActions id={row.original.id} />
	}*/
]
