'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { date, z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormItem,
	FormField,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import DatePicker from '../date-picker'
import Select from '../select'
import { Textarea } from '../ui/textarea'

const formSchema = z.object({
	date: z.coerce.date(),
	accountId: z.string(),
	categoryId: z.string().nullable().optional(),
	payee: z.string(),
	amount: z.string(),
	notes: z.string().nullable().optional()
})

type FormValues = z.infer<typeof formSchema>

type TransactionFormProps = {
	id?: string
	defaultValues?: FormValues
	onSubmit: (values: FormValues) => void
	onDelete?: () => void
	disabled?: boolean
	accountOptions: { label: string; value: string }[]
	categoryOptions: { label: string; value: string }[]
	onCreateAccount: (name: string) => void
	onCreateCategory: (name: string) => void
}

export default function TransactionForm({
	id,
	defaultValues,
	onSubmit,
	onDelete,
	disabled,
	accountOptions,
	categoryOptions,
	onCreateAccount,
	onCreateCategory
}: TransactionFormProps) {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues
	})

	const handleSubmit = (values: FormValues) => {
		console.log({ values })
	}

	const handleDelete = () => {
		onDelete?.()
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='space-y-4 pt-4'
			>
				<FormField
					control={form.control}
					name='date'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Fecha</FormLabel>
							<FormControl>
								<DatePicker
									value={field.value}
									onChange={field.onChange}
									disabled={disabled}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='accountId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Cuenta</FormLabel>
							<FormControl>
								<Select
									placeholder='Selecciona una cuenta'
									options={accountOptions}
									onChange={field.onChange}
									value={field.value}
									onCreate={onCreateAccount}
									disabled={disabled}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='categoryId'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Categoría</FormLabel>
							<FormControl>
								<Select
									placeholder='Selecciona una categoría'
									options={categoryOptions}
									onChange={field.onChange}
									value={field.value}
									onCreate={onCreateAccount}
									disabled={disabled}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='payee'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tenedor</FormLabel>
							<FormControl>
								<Input
									{...field}
									disabled={disabled}
									placeholder='Añadir un tenedor'
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='notes'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Notas</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									value={field.value ?? ''}
									disabled={disabled}
									placeholder='Añadir una nota (opcional)'
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className='w-full' disabled={disabled}>
					{id ? 'Guardar cambios' : 'Crear cuenta'}
				</Button>
				{!!id && (
					<Button
						type='button'
						disabled={disabled}
						onClick={handleDelete}
						className='w-full'
						variant='outline'
					>
						<Trash className='size-4 mr-2' />
						Eliminar cuenta
					</Button>
				)}
			</form>
		</Form>
	)
}
