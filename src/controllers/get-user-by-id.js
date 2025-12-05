import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { internalServerError, ok } from './helpers/http.js'
import { checkIfIdIsValid, invalidIdResponse } from './helpers/user.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const getUserUseCase = new GetUserByIdUseCase()
            const userId = httpRequest.params.userId
            const isUserIdValid = checkIfIdIsValid
            if (!isUserIdValid) {
                return invalidIdResponse()
            }
            const user = await getUserUseCase.execute(userId)
            return ok(user)
        } catch (error) {
            console.log(error)
            internalServerError()
        }
    }
}
