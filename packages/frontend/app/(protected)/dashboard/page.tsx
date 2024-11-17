'use client'

import { Button } from '@/components/ui/button'
import { getAccounts } from '@/services/account-api'
import { useNewAccount } from '@/stores/account/use-new-account'

export default function Dashboard() {
	/* const accounts = await getAccounts()
	console.log(accounts) */

	const { onOpen } = useNewAccount()
	return (
		<div>
			<Button onClick={onOpen}></Button>
		</div>
	)
}
