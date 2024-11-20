import AccountsTable from '@/components/account/accounts-table'
import TransactionsTable from '@/components/transaction/transactions-table'
import { getTransactions } from '@/services/transaction-api'

export default async function TransactionsTableWrapper() {
	const data = await getTransactions({
		from: '2021-01-01',
		to: undefined,
		accountId: '4319ff70-d4a4-4858-9bc8-f3fe884fecb3',
		userId: '1'
	})
	console.log({ data })
	if (!data) return null
	return <TransactionsTable transactions={data.transactions} />
}
