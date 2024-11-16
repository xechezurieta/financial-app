import express from 'express'
import { login } from './controllers/auth.controller'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.post('/login', login)

app.listen(3001, () => {
	console.log('Backend listening on port 3002')
})
