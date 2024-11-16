import { getAccounts } from '../db/queries'
import { Request, Response } from 'express'
export const getAccountsController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const accounts = await getAccounts()
		res.json({ accounts })
	} catch (error) {
		res.status(500).json({ message: 'Server error' })
	}
}
