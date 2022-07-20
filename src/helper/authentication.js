const jwt = require('jsonwebtoken')
const {statusCode, statusMessage} = require('./http-status')
const createError = require('./create-error')

module.exports = (req, resp, next) => {
    const token = req.header('authToken')
    console.log(`token:`, token);
    try {
        if(!token){
            throw new createError(statusCode.UNAUTHORIZED, statusMessage.UNAUTHORIZED)
        }

        const {email} = jwt.verify(token, process.env.SECRET_KEY)
        console.log('email when keep login:', email)

        req.email = email

        next()
    }catch(err){
        const throwError = err instanceof createError
        if(!throwError){
            err = new createError(statusCode.INTERNAL_SERVICE_ERROR, statusMessage.INTERNAL_SERVICE_ERROR)
        }
        console.log('error at authentication:', err);
        resp.status(err.status).send(err.message)
    }
}