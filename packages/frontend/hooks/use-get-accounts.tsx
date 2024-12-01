import { useEffect, useState, useTransition } from 'react'

import { getAccountsAction } from '@/features/accounts/actions'
import { Account } from '@/types/types'

export default function useGetAccounts() {
	const [isPending, startTransition] = useTransition()
	const [accounts, setAccounts] = useState<Account[]>([])
	useEffect(() => {
		startTransition(async () => {
			const accounts = await getAccountsAction()
			if (accounts && 'error' in accounts) {
				setAccounts([])
				return
			}
			setAccounts(accounts.accounts)
		})
	}, [startTransition])
	return { isPending, accounts }
}
