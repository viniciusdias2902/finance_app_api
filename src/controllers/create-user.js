import { CreateUserUseCase } from '../use-cases/index.js'
import { EmailAreadyInUseError } from '../errors/user.js'
import {
    badRequest,
    created,
    internalServerError,
    notFound,
    checkIfEmailisValid,
    checkIfPasswordIsValid,
    invalidEmailResponse,
    invalidPasswordResponse,
} from './helpers/index.js'

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]
            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing param ${field}` })
                }
            }
            const passwordIsValid = checkIfPasswordIsValid(params.password)
            if (!passwordIsValid) {
                return invalidPasswordResponse()
            }

            const emailIsValid = checkIfEmailisValid(params.email)

            if (!emailIsValid) {
                return invalidEmailResponse()
            }

            const createUserUseCase = new CreateUserUseCase()
            const createdUser = await createUserUseCase.execute(params)

            if (!createdUser) {
                return notFound({ message: 'User not found' })
            }

            return created(createdUser)
        } catch (error) {
            if (error instanceof EmailAreadyInUseError) {
                return badRequest({ message: error.message })
            }
            return internalServerError()
        }
    }
}
