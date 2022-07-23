const db = require('./config')
const req = require('express/lib/request')
const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")
dotenv.config()

const router = require("./routes")
const app = express()

app.use(express.json())
app.use(cors({exposedHeaders: ['authToken']}))
app.use(express.static(path.join(__dirname, "public")))

db.connect((err) => {
  if (err) {
    console.log("errorDatabase: ", err)
  }
  console.log(`database at mySQL is connected, thread id: ${db.threadId}`)
})

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to warehouse app server</h1>")
})

app.use("/api", router.category)
app.use("/api", router.product)
app.use("/api", router.user)

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`App listen at port: ${port}`))