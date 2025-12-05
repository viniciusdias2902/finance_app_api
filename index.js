import 'dotenv/config'
import express from 'express'
import { PostgresHelper } from './src/db/postgres/helper.js'
import {
    CreateUserController,
    GetUserByIdController,
    UpdateUserController,
} from './src/controllers/index.js'

const app = express()
app.use(express.json())
app.get('/', async (req, res) => {
    const result = await PostgresHelper.query('SELECT * FROM users')
    res.send(JSON.stringify(result.rows))
})

// Users crud

app.post('/api/users', async (request, response) => {
    const createUserController = new CreateUserController()
    const createUserResponse = await createUserController.execute(request)
    response.status(createUserResponse.statusCode).send(createUserResponse.body)
})

app.get('/api/users/:userId', async (request, response) => {
    const getUserController = new GetUserByIdController()
    const { statusCode, body } = await getUserController.execute(request)
    response.status(statusCode).send(body)
})

app.patch('/api/users/:userId', async (request, response) => {
    const updateUserController = new UpdateUserController()
    const { statusCode, body } = await updateUserController.execute(request)
    response.status(statusCode).send(body)
})

app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}`)
)
