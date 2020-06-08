const MongoClient = require('mongodb').MongoClient

const url = "mongodb://localhost:27017"
let dbo
const dbName = "goodhealthDB"



 const connectDB = async (callback) => {
     try {
         MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
             dbo = client.db(dbName)
             return callback(err)
         })
     } catch (e) {
         throw e
     }
 }

 const getDB = () =>{
     return dbo
    } 

 const disconnectDB = () => {
     dbo.close()
    }

 module.exports = { connectDB, getDB, disconnectDB }