const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

/** MONGODB */

// SETUP (db exported at bottom)

// adding ".../trello" to the end of the db uri specifies which db to use.
// it will also create that db by default if it doesn't exist.
const dbName = 'trello'
const config = process.env.DB_URI || 'mongodb://localhost:27017/' + dbName

mongoose.Promise = global.Promise
mongoose.connect(
  config, {
    useMongoClient: true
  },
  (err) => {
    if (err) {
      console.log('Could not connect to database: ', err)
    } else {
      console.log('Connected to database: ' + config)
    }
  }
)

const db = mongoose.connection
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error: '))

/** MAIN EXPRESS APP AND ROUTES *******/
const app = express()
// body parser allows us to do req.body from a POST method
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use((req, res, next) => {
  next()
})

// app.route().get() is the same as this.
app.get('/', (req, res) => {
  res.send('it works!')
})

app.use('/api', require('./routes/listRoutes'))
app.use('/api/item', require('./routes/itemRoutes'))

// Catch all other routes and redirect to the home page
// (make sure this is the last route in this file)
app.get('*', (req, res) => {
  res.redirect('/')
})

/**
 * Get port from environment.
 */
const port = process.env.PORT || '3030'

app.listen(port, () => console.log('Server is up and running on port ' + port))

module.exports = {
  db: db
}
