const express = require("express")
const router = express.Router()
const getNurseDataController = require("../Controller/getNurseDataController")


router.get("/getNurseData", getNurseDataController.getNurseData)


module.exports = router