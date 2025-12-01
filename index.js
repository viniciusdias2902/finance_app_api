import 'dotenv/config'
import express from 'express'
import { PostgresHelper } from './src/db/postgres/helper.js'

const app = express()
app.use(express.json())
app.get('/', async (req, res) => {
    const result = await PostgresHelper.query('SELECT * FROM users')
    res.send(JSON.stringify(result.rows))
})

app.post('/api/users', async (req, res) => {
    console.log(req.body)
    res.status(201).send('Usuário criado com sucesso')
})

app.listen(process.env.PORT, () => console.log('Teste'))
