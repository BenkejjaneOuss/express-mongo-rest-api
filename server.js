require('dotenv').config();
const express =  require('express')
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const passport = require('passport')

const userRoutes = require('./routes/users')
const taskRoutes = require('./routes/tasks')

//Initialize app with express
const app = express();

//Database connection with mongo
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
mongoose.connection.on('connected', () => {
    console.log('Connected to the database')
})
mongoose.connection.on('error', (err) => {
    console.log('Unable to connect to the database ' + err)
})


// -------- Middelwares ------- //

//bodyParser Middelware
app.use(bodyParser.json())

//Passport Middelware
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

// -------- Middelwares ------- //

//Index router
app.get('/', (req, res, next) => {
    res.send("Home Page")
})

//User Routes
app.use('/user', userRoutes)

//Task Routes
app.use('/task', taskRoutes)



//Initialize the port from .env file
const port = process.env.PORT

//Start the server
app.listen(port, () => {
    console.log('Server started')
})