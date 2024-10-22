const { connectToDb, getDb } = require("../db/db")

module.exports.getNurseData = async(req, res) => {
    try{
        await connectToDb((error) => {
            if(error){
                return res.status(500).json({error: "Failed to connect to database"})
            }
        })

        const db = getDb()
        const data = await db.collection("Nurse").find().toArray()
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({error: "Unable to fetch document"})
    }
}