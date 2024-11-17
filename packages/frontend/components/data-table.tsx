'use client'
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	Row,
	SortingState,
	useReactTable
} from '@tanstack/react-table'
import { Trash } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { useConfirm } from '@/hooks/use-confirm'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	filterKey: string
	onDelete: (rows: Row<TData>[]) => void
	disabled?: boolean
}

export function DataTable<TData, TValue>({
	columns,
	data,
	filterKey,
	onDelete,
	disabled
}: DataTableProps<TData, TValue>) {
	const { ConfirmDialog, confirm } = useConfirm({
		title: 'Eliminar cuentas',
		description: '¿Estás seguro de que deseas eliminar estas cuentas?'
	})
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	)
	const [rowSelection, setRowSelection] = React.useState({})
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			rowSelection
		}
	})

	return (
		<div>
			<div className='flex items-center py-4'>
				<Input
					placeholder={`Filtrar por ${filterKey}...`}
					value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn(filterKey)?.setFilterValue(event.target.value)
					}
					className='max-w-sm'
				/>
				{table.getFilteredSelectedRowModel().rows.length > 0 && (
					<Button
						size='sm'
						variant='outline'
						className='ml-auto font-normal text-xs'
						disabled={disabled}
						onClick={async () => {
							const confirmed = await confirm()
							if (!confirmed) return
							onDelete(table.getFilteredSelectedRowModel().rows)
							table.resetRowSelection()
						}}
					>
						<Trash className='size-4 mr-2' />
						Eliminar ({table.getFilteredSelectedRowModel().rows.length})
					</Button>
				)}
			</div>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex items-center justify-end space-x-2 py-4'>
				<div className='flex-1 text-sm text-muted-foreground'>
					{table.getFilteredSelectedRowModel().rows.length} de{' '}
					{table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
				</div>
				<Button
					variant='outline'
					size='sm'
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Anterior
				</Button>
				<Button
					variant='outline'
					size='sm'
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Siguiente
				</Button>
			</div>
			<ConfirmDialog />
		</div>
	)
}