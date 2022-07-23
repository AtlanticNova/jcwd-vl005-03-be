const { registerSchema, loginSchema, editSchema } = require('../helper/validation_schema')
const database = require('../config').promise()
const createError = require('../helper/create_error')
const createResponse = require('../helper/create_response')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const transporter = require("../helper/transporter")
const httpStatus = require("../helper/http_status_code")

module.exports.register = async (req, res) => {
  const { username, fullname, email, password, re_password } = req.body

  try {
    const { error } = registerSchema.validate(req.body)
    if (error) {
      const responseStatus = new createResponse(
        httpStatus.BAD_REQUEST,
        'Error Password', false, 1, 1, error.details[0].message
      )

      res.status(responseStatus.status).send(responseStatus)
      throw new createError(httpStatus.BAD_REQUEST, error.details[0].message)
    }

    if (password !== re_password) {
      const responseStatus = new createResponse(
        httpStatus.BAD_REQUEST,
        'Error Password', false, 1, 1, 'password doesn\'t match'
      )

      res.status(responseStatus.status).send(responseStatus)
    }

    const hashpassword = await bcrypt.hash(password, 10)

    const token = jwt.sign({ email: email }, process.env.SECRET_KEY, )

    const mail = {
      from: '"Admin" <idiotcolony97@gmail.com>',
      to: `${email}`,
      subject: 'Account Verification',
      html: `
                <p>please verify your account using this link.</p>
                <a href='http://localhost:3000/verification/${token}'>Verify your account</a>
            `
    }

    await transporter.sendMail(mail)

    const CHECK_USER = `SELECT * FROM users WHERE username = ? OR email = ?;`

    const [USER] = await database.execute(CHECK_USER, [username, email])
    if (USER.length) {
      const responseStatus = new createResponse(
        httpStatus.BAD_REQUEST,
        'username and email not unique', false, 1, 1, 'username and email must be unique.'
      )

      res.status(responseStatus.status).send(responseStatus)
      throw new createError(httpStatus.BAD_REQUEST, 'username and email must be unique.')
    } else {
      const INSERT_USER = `
            INSERT INTO users (username, fullname, email, password)
            VALUES(${database.escape(username)}, ${database.escape(fullname)}, ${database.escape(email)}, ${database.escape(hashpassword)});
        `
      await database.execute(INSERT_USER)

      const responseStatus = new createResponse(
        httpStatus.CREATED,
        'Register success', true, 1, 1, `Register user success, please check your email`
      )
      
      res.header('authorization', `Bearer ${token}`).send(responseStatus)
    }
  }
  catch (error) {
    console.log('error : ', error)

    const isTrusted = error instanceof createError

    if (!isTrusted) {
      error = new createError(httpStatus.INTERNAL_SERVICE_ERROR, error.sqlMessage)
      console.log(error)
    }
    res.status(error.status).send(error)
  }
}

module.exports.getUser = async (req, res) => {
  try {
    const tokenHeader = req.headers.authorization
    const token = tokenHeader.split(" ")[1]

    const emailToken = jwt.verify(token, process.env.SECRET_KEY).email

    const EXIST_USER = `SELECT * FROM users WHERE email = ?;`

    const [USER] = await database.execute(EXIST_USER, [emailToken])
    if (!USER.length) {
      throw new createError(httpStatus.BAD_REQUEST, 'user not registered.')
    }

    delete USER[0].password

    const respons = new createResponse(httpStatus.OK, 'Login Success', true, 1, 1, USER[0])
    res.status(respons.status).send(respons)
  }
  catch (error) {
    console.log('error: ', error)
  }
}

module.exports.verifyUser = async (req, res) => {

  const tokenHeader = req.headers.authorization
  const token = tokenHeader.split(" ")[1]

  try {

    const emailToken = jwt.verify(token, process.env.SECRET_KEY).email

    const EXIST_USER = `SELECT * FROM users WHERE email = ?;`

    const [USER] = await database.execute(EXIST_USER, [emailToken])

    if (!USER.length) {
      throw new createError(httpStatus.BAD_REQUEST, 'user not registered.')
    }

    const UPDT_STATUS = `UPDATE users SET status = 'verified' WHERE email = ?;`

    await database.execute(UPDT_STATUS, [emailToken])

    const response = new createResponse(httpStatus.OK, 'verified success', true, 1, 1, "Your Account Has Verified")
    res.status(response.status).send(response)

  } catch (error) {
    console.log('error: ', error)
  }
}

module.exports.login = async (req, res) => {
  const { login, password } = req.body

  try {
    const { error } = loginSchema.validate(req.body)

    if (error) {
      const responseStatus = new createResponse(
        httpStatus.BAD_REQUEST,
        'Error', false, 1, 1, error.details[0].message
      )

      res.status(responseStatus.status).send(responseStatus)
      throw new createError(httpStatus.BAD_REQUEST, error.details[0].message)
    }

    const CHECK_USER = `SELECT * FROM users WHERE username = ? OR email = ?;`
    const [USER] = await database.execute(CHECK_USER, [login, login])
    if (!USER.length) {
      const responseStatus = new createResponse(
        httpStatus.BAD_REQUEST,
        'Error', false, 1, 1, 'username atau email salah.'
      )

      res.status(responseStatus.status).send(responseStatus)
      throw new createError(httpStatus.BAD_REQUEST, 'username atau email salah.')
    }

    const valid = await bcrypt.compare(password, USER[0].password)
    console.log('is valid : ', valid)
    if (!valid) {
      const responseStatus = new createResponse(
        httpStatus.BAD_REQUEST,
        'Error', false, 1, 1, 'password salah.'
      )

      res.status(responseStatus.status).send(responseStatus)

      throw new createError(httpStatus.BAD_REQUEST, 'password salah.')
    }

    const email = USER[0].email

    const token = jwt.sign({ 
      email: email

    }, process.env.SECRET_KEY)

    const responseStatus = new createResponse(
      httpStatus.OK,
      'Login Success', true, 1, 1, 'Login Succesfully', token
    )

    res.header('authorization', `Bearer ${token}`).send(responseStatus)

  } catch (error) {
    console.log('error: ', error)
  }
}

module.exports.keepLogin = async (req, resp) => {
  const email = req.email
  try {
      const checkUser = `SELECT * FROM users WHERE email = ?;`
      const [userData] = await db.execute(checkUser, [email])
      console.log(`userData at keep login:`, userData)
      if(!userData.length){
          throw new createError(statusCode.NOT_FOUND, `user with email from token doesn't found`)
      }

      delete userData[0].password
      const respond = new createRespond(statusCode.OK, statusMessage.OK, 'Keep User Login', 1, 1, userData[0])
      resp.status(respond.status).send(respond.data)

  } catch(err) {
      const throwError = err instanceof createError
      if(!throwError){
          new createError(statusCode.INTERNAL_SERVICE_ERROR, statusMessage.INTERNAL_SERVICE_ERROR)
      }
      console.log('error at keep login:', err);
      resp.status(err.status).send(err.message)
  }
}