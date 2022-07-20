const nodemailer = require("nodemailer")

module.exports = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'idiotcolony97@gmail.com',
    pass: 'gyaadbrrunqgwtuo'
  },
  tls: { rejectUnauthorized: false }
})