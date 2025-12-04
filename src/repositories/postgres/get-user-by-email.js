import { PostgresHelper } from '../../db/postgres/helper.js'

export class PostgresGetUserByEmailRepository {
    async execute(email) {
        const user = await PostgresHelper.query(
            'SELECT * FROM USERS WHERE EMAIL = $1',
            [email]
        )
        return user.rows[0]
    }
}
