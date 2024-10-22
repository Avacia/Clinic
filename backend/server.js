const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())


const getNurseData = require("./Router/getNurseData")
const updateNurseData = require("./Router/updateNurseData")

app.use(getNurseData)
app.use(updateNurseData)

app.get("/", (res, req) => {
    res.send("Sever Connected")
})


const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server is hosted on http://localhost:${port || 5000}`)
})