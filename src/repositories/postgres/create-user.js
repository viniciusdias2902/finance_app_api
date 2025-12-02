import { PostgresHelper } from '../../db/postgres/helper'

export class PostgresCreateUserRepository {
    async execute(createUseParams) {
        const results = await PostgresHelper.query(
            'INSERT INTO USERS(ID, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)',
            [
                createUseParams.id,
                createUseParams.first_name,
                createUseParams.last_name,
                createUseParams.email,
                createUseParams.password,
            ]
        )
        return results[0]
    }
}
