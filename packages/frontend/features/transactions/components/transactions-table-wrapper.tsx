import TransactionsTable from '@/features/transactions/components/transactions-table'
import { getTransactions } from '@/services/transaction-api'

export default async function TransactionsTableWrapper({
	params
}: {
	params: { from?: string; to?: string; accountId?: string }
}) {
	const to = params?.to || undefined
	const from = params?.from || undefined
	const accountId = params?.accountId || undefined
	const data = await getTransactions({
		from,
		to,
		accountId: accountId || '',
		userId: '1'
	})
	console.log({ data })
	if (!data) return null
	return <TransactionsTable transactions={data.transactions} />
}
