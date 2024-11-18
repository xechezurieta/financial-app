export type User = {
	id: number
	name: string
	age: number
	email: string
	password: string
}

export type Account = {
	id: string
	plaidId: string | null
	name: string
	userId: string
}

export type Category = {
	id: string
	plaidId: string | null
	name: string
	userId: string
}

export type Transaction = {
	id: string
	accountId: string
	categoryId: string | null
	userId: string
	date: Date
	payee: string
	amount: number
	notes: string | null
}
