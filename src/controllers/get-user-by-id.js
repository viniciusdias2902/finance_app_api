import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { internalServerError, ok } from './helpers.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const getUserUseCase = new GetUserByIdUseCase()
            const user = await getUserUseCase.execute(httpRequest.params.userId)
            ok(user)
        } catch (error) {
            console.log(error)
            internalServerError()
        }
    }
}
