export class EmailAreadyInUseError extends Error {
    constructor(email) {
        super(`The e-mail ${email} is already in use`)
        this.name = 'EmailAreadyInUseError'
    }
}
