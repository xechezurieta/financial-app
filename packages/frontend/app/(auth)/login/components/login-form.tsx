// components/LoginForm.tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { login } from '@/app/(auth)/actions'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters')
})

export function LoginForm() {
	const [isPending, startLoginTransition] = useTransition()
	const router = useRouter()
	const [showPassword, setShowPassword] = useState(false)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		startLoginTransition(async () => {
			const data = await login(values)
			console.log({ data })
			if (data.status === 'failed') {
				toast.error('Invalid credentials!')
			} else if (data.status === 'invalid_data') {
				toast.error('Failed validating your submission!')
			} else if (data.status === 'success') {
				router.refresh()
			}
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-emerald-700'>Email</FormLabel>
							<FormControl>
								<Input
									placeholder='Enter your email'
									{...field}
									disabled={isPending}
									className='border-emerald-200 focus:border-emerald-400'
								/>
							</FormControl>
							<FormMessage className='text-red-500' />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-emerald-700'>Password</FormLabel>
							<FormControl>
								<div className='relative'>
									<Input
										type={showPassword ? 'text' : 'password'}
										placeholder='Enter your password'
										{...field}
										disabled={isPending}
										className='border-emerald-200 focus:border-emerald-400 pr-10'
									/>
									<button
										type='button'
										onClick={() => setShowPassword(!showPassword)}
										className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
									>
										{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
									</button>
								</div>
							</FormControl>
							<FormMessage className='text-red-500' />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					className='w-full bg-emerald-600 hover:bg-emerald-700 text-white'
					disabled={isPending}
				>
					{isPending && <Loader2 size={16} className='mr-2 animate-spin' />}
					{isPending ? 'Logging in...' : 'Log in'}
				</Button>
			</form>
		</Form>
	)
}
