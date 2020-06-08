const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const path = require('path')
const mongoDB = require("./mongodb")



const url = "mongodb://localhost:27017"
const dbName = "goodhealthDB"
const patientCollectionName = "patient"
const patientRecordAndPaymentCollectionName = "payment"






//use express middleware
const app = express()

app.use(bodyParser.json())

//static files
app.use(express.static(path.join(__dirname + "/public")))


//set up template engine
app.set('view engine', 'ejs')

//body parser for accessing contents of the post request
app.use(bodyParser.urlencoded({ extended: true}))


//get mongodb connection and create collections
mongoDB.connectDB(async (err) => {
    if (err) throw err
    // create collections db & collections
    const dbo = mongoDB.getDB()
    dbo.createCollection(patientCollectionName, function(err, result){
        if(err) throw err
        console.log("patient collection created")
        })
    dbo.createCollection(patientRecordAndPaymentCollectionName, function(err, result){
        if(err) throw err
        console.log("patient and payment collection created")
    })
})



//routes

//get admin login
app.get('/', function(req, res, next){
    res.render('index')
    next()
})

//handle admin login
app.post('/dashboard', function(req, res){
    mongoDB.connectDB(async (err) => {
        if (err) throw err
        // validate admin

        var query = { name: req.body.username,
                    password: req.body.password }
        const dbo = mongoDB.getDB()
        dbo.collection(collectionName).find(query).toArray( function(err, result) {
            if (err) throw err;
            console.log(result);
            result.forEach(function(item){
                if(item.password == req.body.password){
                    res.render('dashboard')
                }
                else{
                    res.render('incorrect password')
                }
            })
            
            
            
          });
    })
})


app.listen(3000, () => {
    console.log("server is running on port 3000")
})