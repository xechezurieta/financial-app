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

export const deleteAccounts = async (accountIds: Array<string>) => {
	const session = await auth()
	if (!session) return
	const apiUrl = getAPIUrl('/accounts/bulk-delete')
	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: session.user?.id,
				accountIds
			})
		})
		const data: { deletedAccounts: Array<string> } = await response.json()
		revalidatePath('/accounts')
		return data
	} catch (error) {
		return { error: 'Error deleting accounts' }
	}
}

export const getAccount = async (accountId: string) => {
	const session = await auth()
	if (!session) return
	const apiUrl = getAPIUrl('/accounts/account')
	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: session.user?.id,
				accountId
			})
		})
		const data: { account: Account } = await response.json()
		return data
	} catch (error) {
		return { error: 'Error getting account' }
	}
}
