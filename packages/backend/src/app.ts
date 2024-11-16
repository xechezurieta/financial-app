import express from 'express'
import { login } from './controllers/auth.controller'
import { getAccountsController } from './controllers/account.controller'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.post('/login', login)

app.get('/accounts', getAccountsController)

app.listen(3001, () => {
	console.log('Backend listening on port 3001')
})
