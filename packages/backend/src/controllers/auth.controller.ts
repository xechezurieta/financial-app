import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { getUser } from '../db/queries'

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body

		const [user] = await getUser(email)

		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' })
		}

		const isValidPassword = await bcrypt.compare(password, user.password)

		if (!isValidPassword) {
			return res.status(401).json({ message: 'Invalid credentials' })
		}

		res.json({ user })
	} catch (error) {
		res.status(500).json({ message: 'Server error' })
	}
}
