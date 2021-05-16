const HttpCode = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409
}

const Status = {
    STARTER: 'starter',
    PRO: 'pro',
    BUSINESS: 'business'
}



module.exports = {
    HttpCode,
    Status
}