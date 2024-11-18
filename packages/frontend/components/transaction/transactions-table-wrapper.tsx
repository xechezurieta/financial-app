import AccountsTable from '@/components/account/accounts-table'
import { getTransactions } from '@/services/transaction-api'

export default async function TransactionsTableWrapper() {
	const data = await getTransactions({
		from: undefined,
		to: undefined,
		accountId: '',
		userId: ''
	})
	if (!data) return null
	return <AccountsTable accounts={data.transactions} />
}
