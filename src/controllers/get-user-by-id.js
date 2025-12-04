import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { internalServerError } from './helpers.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const getUserUseCase = new GetUserByIdUseCase()
            const user = await getUserUseCase.execute(httpRequest.params.userId)
            return {
                statusCode: 200,
                body: {
                    user,
                },
            }
        } catch (error) {
            console.log(error)
            internalServerError()
        }
    }
}
