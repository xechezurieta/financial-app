// page.tsx
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'

import { LoginForm } from './components/login-form'

export default function Page() {
	return (
		<div className='flex min-h-screen items-center justify-center'>
			<Card className='w-[350px] border-emerald-200 pt-8'>
				<CardHeader>
					<CardTitle className='text-center text-emerald-800'>
						Welcome Back
					</CardTitle>
					<CardDescription className='text-center text-emerald-600'>
						Sign in to your nutrition journey
					</CardDescription>
				</CardHeader>
				<CardContent>
					<LoginForm />
				</CardContent>
			</Card>
		</div>
	)
}
