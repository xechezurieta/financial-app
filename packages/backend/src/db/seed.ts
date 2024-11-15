import { db } from './drizzle'
import { usersTable } from './schema'

async function seed() {
	const name = 'test'
	const age = 20
	const email = 'test@test.com'
	const password = 'test'

	const [user] = await db
		.insert(usersTable)
		.values([
			{
				name,
				age,
				email,
				password
			}
		])
		.returning()

	console.log('Initial user created.', { user })
}

seed()
	.catch((error) => {
		console.error('Seed process failed:', error)
		process.exit(1)
	})
	.finally(() => {
		console.log('Seed process finished. Exiting...')
		process.exit(0)
	})
