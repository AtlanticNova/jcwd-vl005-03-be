const jwt = require('jsonwebtoken')
const {statusCode, statusMessage} = require('./http-status')
const createError = require('./create-error')

module.exports = (req, resp, next) => {
    const token = req.header('authToken')
    const userToken = req.header('authorization')
    console.log(`tokenadmin:`, token);
    console.log(`tokenuser:`, userToken)
    try {
        //check token
        if(!token){
            throw new createError(statusCode.UNAUTHORIZED, statusMessage.UNAUTHORIZED)
        }
        if(!userToken){
            throw new createError(statusCode.UNAUTHORIZED, statusMessage.UNAUTHORIZED)
        }

        //verify token
        const {email} = jwt.verify(token, process.env.SECRET_KEY)
        console.log('email when keep login:', email)

        const {userEmail} = jwt.verify(userToken, process.env.SECRET_KEY)
        console.log('user email wheen keep login:', userEmail)

        //modified object request
        req.email = email
        req.userEmail = userEmail
        
        //send to controller
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