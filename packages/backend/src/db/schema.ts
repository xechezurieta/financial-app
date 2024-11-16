import { integer, pgTable, serial, varchar, text } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'

export const usersTable = pgTable('users', {
	id: serial('id').primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	age: integer().notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({ length: 255 }).notNull().default('12345678')
})

export type User = typeof usersTable.$inferSelect

export const accountsTable = pgTable('accounts', {
	id: text('id').primaryKey(),
	plaidId: text('plaid_id'),
	name: text('name').notNull(),
	userId: text('user_id').notNull()
})

export type Account = typeof accountsTable.$inferSelect
export const insertAccountSchema = createInsertSchema(accountsTable)
