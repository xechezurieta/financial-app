'use server'

import { revalidatePath } from 'next/cache'

import { auth } from '@/app/(auth)/auth'
import { getAPIUrl } from '@/lib/utils'
import { Account } from '@/types/types'

export const createAccount = async (name: string) => {
	const session = await auth()
	console.log('createAccount: ', { session })
	if (!session) return
	const apiUrl = getAPIUrl('/accounts')
	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: session.user?.id,
				name
			})
		})
		const data: { account: Account } = await response.json()
		revalidatePath('/accounts')
		return data
	} catch (error) {
		return { error: 'Error creating account' }
	}
}
