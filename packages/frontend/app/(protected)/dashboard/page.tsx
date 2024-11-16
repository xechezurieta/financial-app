/* 'use client' */

import { Button } from '@/components/ui/button'
import { getAccounts } from '@/services/account-api'
import { useNewAccount } from '@/stores/use-new-account'

export default async function Dashboard() {
	const accounts = await getAccounts()
	console.log(accounts)

	/* const { onOpen } = useNewAccount() */
	return <div>{/* <Button onClick={onOpen}></Button> */}</div>
}
