import { eq } from 'drizzle-orm'

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

export async function getAccounts() {
	try {
		return await db.select().from(accountsTable)
	} catch (error) {
		console.error('Failed to get accounts from database')
		throw error
	}
}
