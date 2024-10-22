const { connectToDb, getDb } = require("../db/db")

module.exports.updateNurseData = async(req, res) => {
    try{
        await connectToDb((error) => {
            if(error){
                return res.status(500).json({error: "Failed to connect to database"})
            }
        })

        let db = getDb()
        const data = await db.collection("nurse")
    }
    catch(error){
        res.status(500).json({error: "Unable to fetch document"})
    }
}