import AccountsTable from '@/components/account/accounts-table'
import { getAccounts } from '@/services/account-api'

export default async function AccountsTableWrapper() {
	const data = await getAccounts()
	if (!data) return null
	return <AccountsTable accounts={data.accounts} />
}
