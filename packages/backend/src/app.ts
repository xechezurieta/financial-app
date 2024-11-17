import express from 'express'
import { login } from './controllers/auth.controller'
import {
	bulkDeleteAccountsController,
	createAccountController,
	getAccountsController
} from './controllers/account.controller'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.post('/login', login)

app.get('/accounts', getAccountsController)
app.post('/accounts', createAccountController)
app.post('/accounts/bulk-delete', bulkDeleteAccountsController)

app.listen(3001, () => {
	console.log('Backend listening on port 3001')
})
