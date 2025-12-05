import { badRequest, internalServerError, ok } from './helpers/http.js'
import { UpdateUserUseCase } from '../use-cases/update-user.js'
import { EmailAreadyInUseError } from '../errors/user.js'
import { notFound } from './helpers/http.js'
import {
    checkIfEmailisValid,
    checkIfIdIsValid,
    checkIfPasswordIsValid,
    invalidEmailResponse,
    invalidIdResponse,
    invalidPasswordResponse,
} from './helpers/user.js'

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId
            const isIdValid = checkIfIdIsValid
            if (!isIdValid) {
                return invalidIdResponse()
            }
            const params = httpRequest.body
            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]
            const someFieldsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field)
            )
            if (someFieldsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed',
                })
            }
            if (params.password) {
                const passwordIsValid = checkIfPasswordIsValid()
                if (!passwordIsValid) {
                    return invalidPasswordResponse()
                }
            }

            if (params.email) {
                const emailIsValid = checkIfEmailisValid()

                if (!emailIsValid) {
                    return invalidEmailResponse()
                }
            }
            const updateUserUseCase = new UpdateUserUseCase()
            const updatedUser = await updateUserUseCase.execute(userId, params)
            if (!updatedUser) {
                return notFound({ message: 'User not found' })
            }
            return ok(updatedUser)
        } catch (error) {
            if (error instanceof EmailAreadyInUseError) {
                return badRequest({ message: error.message })
            }
            return internalServerError()
        }
    }
}
