const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors');

/*********** MONGODB **********/
// SCHEMAS 
const Board = require('./model/Board')

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

/*********** MAIN EXPRESS APP AND ROUTES *******/
const app = express()
// body parser allows us to do req.body from a POST method
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use( (req, res, next) => {

  next()
})

// app.route().get() is the same as this.
app.get('/', (req, res) => {
  res.send('it works!')
})

//app.get() === app.route().get()
app.route('/api')

  .get( (req, res) => {
    Board.find( (err, data) => {
      if (err) {
        res.send(err)
      } else {
        res.json(data)
      }
    })
  })

  // add new entry
  .post( (req, res) => {
    console.log(req.body)
    var board = new Board()
    board.name = req.body.name
    board.save( (err) => {
      if (err) {
        res.send(err)
      } else {
        res.json({ message: 'successfully added a board!' })
      }
    })
  })

app.route('/api/:board_id')
  /**
  Need a new route for put and delete so that
  we can pass the board id into the route
  */

  // put = update a current entry
  .put( (req, res) => {

  })

  // delete an entry
  .delete( (req, res) => {
    Board.remove({ _id: req.params.board_id }, (err, board) => {
      if (err) {
        res.send(err)
      } else {
        res.json({ message: 'Comment has been deleted!' })
      }
    })
  })

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
