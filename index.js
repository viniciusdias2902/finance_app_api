import 'dotenv/config'
import express from 'express'
import { PostgresHelper } from './src/db/postgres/helper.js'
import { CreateUserController } from './src/controllers/create-user.js'
import { GetUserByIdController } from './src/controllers/get-user-by-id.js'

const app = express()
app.use(express.json())
app.get('/', async (req, res) => {
    const result = await PostgresHelper.query('SELECT * FROM users')
    res.send(JSON.stringify(result.rows))
})

app.get('/api/users/:userId', async (request, response) => {
    const getUserController = new GetUserByIdController()
    const { statusCode, body } = await getUserController.execute(request)
    console.log(body)
    response.status(statusCode).send(body)
})

app.post('/api/users', async (request, response) => {
    const createUserController = new CreateUserController()
    const createUserResponse = await createUserController.execute(request)
    response.status(createUserResponse.statusCode).send(createUserResponse.body)
})

app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}`)
)
