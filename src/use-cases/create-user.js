import { v4 as uuid4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        const userID = uuid4()
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository()
        const userWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(
                createUserParams.email
            )
        if (userWithProvidedEmail) {
            throw new Error('The provided e-mail is already in use')
        }
        const user = {
            ...createUserParams,
            id: userID,
            password: hashedPassword,
        }
        const postgresCreateUserRepository = new PostgresCreateUserRepository()
        const createdUser = await postgresCreateUserRepository.execute(user)
        return createdUser
    }
}
