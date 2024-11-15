import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
	id: serial('id').primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	age: integer().notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({ length: 255 }).notNull().default('12345678')
})

export type User = typeof usersTable.$inferSelect
