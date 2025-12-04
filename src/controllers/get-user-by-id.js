import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { badRequest, internalServerError, ok } from './helpers.js'
import validator from 'validator'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const getUserUseCase = new GetUserByIdUseCase()
            const userId = httpRequest.params.userId
            const isUserIdValid = validator.isUUID(userId)
            if (!isUserIdValid) {
                return badRequest({ message: 'The provided id is not valid' })
            }
            const user = await getUserUseCase.execute(userId)
            return ok(user)
        } catch (error) {
            console.log(error)
            internalServerError()
        }
    }
}
