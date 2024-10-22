const express = require("express")
const router = express.Router()
const updateNurseDataController = require("../Controller/updateNurseDataController")

router.post("/updateNurseData", updateNurseDataController.updateNurseData)

module.exports = router