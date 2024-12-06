import { convertAmountFromMiliunits, getAPIUrl } from '@/lib/utils'
import { Transaction } from '@/types/types'

export const getTransactions = async ({
	from,
	to,
	accountId,
	userId
}: {
	from: string | undefined
	to: string | undefined
	accountId: string
	userId: string
}) => {
	const apiUrl = getAPIUrl('/transactions')
	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from,
				to,
				accountId,
				userId
			})
		})
		if (!response.ok) {
			return null
		}
		const data: { transactions: Transaction[] } = await response.json()
		const parsedData = {
			transactions: data.transactions.map((transaction) => ({
				...transaction,
				amount: convertAmountFromMiliunits(transaction.amount)
			}))
		}

		return parsedData
	} catch (error) {
		return null
	}
}
