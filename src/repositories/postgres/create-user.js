import { PostgresHelper } from '../../db/postgres/helper.js'

export class PostgresCreateUserRepository {
    async execute(createUseParams) {
        await PostgresHelper.query(
            'INSERT INTO USERS(id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)',
            [
                createUseParams.id,
                createUseParams.first_name,
                createUseParams.last_name,
                createUseParams.email,
                createUseParams.password,
            ]
        )
        const createdUser = await PostgresHelper.query(
            `SELECT * FROM users WHERE id = $1`,
            [createUseParams.id]
        )
        return createdUser.rows[0]
    }
}
