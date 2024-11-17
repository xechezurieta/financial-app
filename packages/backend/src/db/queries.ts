import { and, eq, inArray } from 'drizzle-orm'

import { db } from './drizzle'
import { accountsTable, categoriesTable, User, usersTable } from './schema'

export async function getUser(email: string): Promise<Array<User>> {
	try {
		return await db.select().from(usersTable).where(eq(usersTable.email, email))
	} catch (error) {
		console.error('Failed to get user from database')
		throw error
	}
}
/* Accounts */
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

/* Categories */
export async function getCategories(userId: string) {
	try {
		return await db
			.select()
			.from(categoriesTable)
			.where(eq(categoriesTable.userId, userId))
	} catch (error) {
		console.error('Failed to get categories from database')
		throw error
	}
}

export async function getCategory(categoryId: string, userId: string) {
	try {
		const [data] = await db
			.select({
				id: categoriesTable.id,
				name: categoriesTable.name
			})
			.from(categoriesTable)
			.where(
				and(
					eq(categoriesTable.id, categoryId),
					eq(categoriesTable.userId, userId)
				)
			)
		return data
	} catch (error) {
		console.error('Failed to get category from database', error)
		throw error
	}
}

export async function createCategory(userId: string, name: string) {
	try {
		const [category] = await db
			.insert(categoriesTable)
			.values({
				id: crypto.randomUUID(),
				userId,
				name,
				plaidId: crypto.randomUUID()
			})
			.returning()
		return category
	} catch (error) {
		console.error('Failed to create category in database', error)
		throw error
	}
}

export async function deleteCategories(
	userId: string,
	categoryIds: Array<string>
) {
	try {
		return await db
			.delete(categoriesTable)
			.where(
				and(
					eq(categoriesTable.userId, userId),
					inArray(categoriesTable.id, categoryIds)
				)
			)
			.returning({
				id: categoriesTable.id
			})
	} catch (error) {
		console.error('Failed to delete categories from database', error)
		throw error
	}
}

export async function editCategoryName(
	categoryId: string,
	userId: string,
	name: string
) {
	try {
		const [category] = await db
			.update(categoriesTable)
			.set({
				name
			})
			.where(
				and(
					eq(categoriesTable.id, categoryId),
					eq(categoriesTable.userId, userId)
				)
			)
			.returning()
		return category
	} catch (error) {
		console.error('Failed to edit category name in database', error)
		throw error
	}
}

export async function deleteCategory(userId: string, categoryId: string) {
	try {
		const [category] = await db
			.delete(categoriesTable)
			.where(
				and(
					eq(categoriesTable.userId, userId),
					eq(categoriesTable.id, categoryId)
				)
			)
			.returning({
				id: categoriesTable.id
			})
		return category
	} catch (error) {
		console.error('Failed to delete category from database', error)
		throw error
	}
}
