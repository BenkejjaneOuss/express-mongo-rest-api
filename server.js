require('dotenv').config();
const express =  require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const userRoutes = require('./routes/users')

//Initialize app with express
const app = express();

//Database connection with mongo
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })
mongoose.connection.on('connected', () => {
    console.log('Connected to the database')
})
mongoose.connection.on('error', (err) => {
    console.log('Unable to connect to the database ' + err)
})

//Initialize the port from .env file
const port = process.env.port

//Middelwares
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
    res.send("My Page")
})

app.use('/user', userRoutes)


//Start the server
app.listen(port, () => {
    console.log('Server started')
})