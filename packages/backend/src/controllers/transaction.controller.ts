import { Request, Response } from 'express'
import { getTransactions } from '../db/queries'
export const getTransactionsController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { from, to, accountId, userId } = req.body
		const categories = await getTransactions({
			from,
			to,
			accountId,
			userId
		})
		res.json({ categories })
	} catch (error) {
		res.status(500).json({ message: 'Server error' })
	}
}
