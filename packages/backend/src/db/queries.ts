import { and, eq, inArray } from 'drizzle-orm'

import { db } from './drizzle'
import { accountsTable, User, usersTable } from './schema'

export async function getUser(email: string): Promise<Array<User>> {
	try {
		return await db.select().from(usersTable).where(eq(usersTable.email, email))
	} catch (error) {
		console.error('Failed to get user from database')
		throw error
	}
}

export async function getAccounts(userId: string) {
	try {
		return await db
			.select()
			.from(accountsTable)
			.where(eq(accountsTable.userId, userId))
	} catch (error) {
		console.error('Failed to get accounts from database')
		throw error
	}
}

export async function getAccount(accountId: string, userId: string) {
	try {
		const [data] = await db
			.select({
				id: accountsTable.id,
				name: accountsTable.name
			})
			.from(accountsTable)
			.where(
				and(eq(accountsTable.id, accountId), eq(accountsTable.userId, userId))
			)
		return data
	} catch (error) {
		console.error('Failed to get account from database', error)
		throw error
	}
}

export async function createAccount(userId: string, name: string) {
	try {
		const [account] = await db
			.insert(accountsTable)
			.values({
				id: crypto.randomUUID(),
				userId,
				name,
				plaidId: crypto.randomUUID()
			})
			.returning()
		return account
	} catch (error) {
		console.error('Failed to create account in database', error)
		throw error
	}
}

export async function deleteAccounts(
	userId: string,
	accountIds: Array<string>
) {
	try {
		return await db
			.delete(accountsTable)
			.where(
				and(
					eq(accountsTable.userId, userId),
					inArray(accountsTable.id, accountIds)
				)
			)
			.returning({
				id: accountsTable.id
			})
	} catch (error) {
		console.error('Failed to delete accounts from database', error)
		throw error
	}
}

export async function editAccountName(
	accountId: string,
	userId: string,
	name: string
) {
	try {
		const [account] = await db
			.update(accountsTable)
			.set({
				name
			})
			.where(
				and(eq(accountsTable.id, accountId), eq(accountsTable.userId, userId))
			)
			.returning()
		return account
	} catch (error) {
		console.error('Failed to edit account name in database', error)
		throw error
	}
}

export async function deleteAccount(userId: string, accountId: string) {
	try {
		const [account] = await db
			.delete(accountsTable)
			.where(
				and(eq(accountsTable.userId, userId), eq(accountsTable.id, accountId))
			)
			.returning({
				id: accountsTable.id
			})
		return account
	} catch (error) {
		console.error('Failed to delete account from database', error)
		throw error
	}
}
