/* 'use client' */

import { getSummary } from '@/features/summary/service'

export default async function Dashboard() {
	/* const accounts = await getAccounts()
	console.log(accounts) */
	const data = await getSummary({
		from: undefined,
		to: undefined,
		accountId: 'account_1'
	})
	/* const { onOpen } = useNewAccount() */
	return <div>{JSON.stringify(data, null, 2)}</div>
}
