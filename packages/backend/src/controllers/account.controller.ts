import { createAccount, getAccounts } from '../db/queries'
import { Request, Response } from 'express'
export const getAccountsController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const accounts = await getAccounts('1')
		res.json({ accounts })
	} catch (error) {
		res.status(500).json({ message: 'Server error' })
	}
}

export const createAccountController = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { name } = req.body
	try {
		const account = await createAccount('1', name)
		res.json({ account })
	} catch (error) {
		res.status(500).json({ message: 'Server error' })
	}
}
