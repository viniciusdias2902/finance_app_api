export const created = (body) => ({
    statusCode: 201,
    body: body,
})

export const ok = (body) => ({
    statusCode: 200,
    body: body,
})

export const badRequest = (body) => ({
    statusCode: 400,
    body: body,
})

export const notFound = (body) => ({
    statusCode: 404,
    body: body,
})

export const internalServerError = () => ({
    statusCode: 500,
    body: {
        errorMessage: 'Internal server error',
    },
})
