const express = require('express')
const mongoose = require('mongoose')

// MongoDB setup (db exported at bottom)
const config = {
	uri: process.env.DB_URI || 'mongodb://localhost:27017/',
	secret: '',
	db: 'trello'
};
mongoose.Promise = global.Promise
mongoose.connect(
  config.uri, {
    useMongoClient: true
  },
  (err) => {
    if (err) {
      console.log('Could not connect to database: ', err)
    } else {
      console.log('Connected to database: ' + config.db)
    }
  }
)

const app = express()

app.get('/', (req, res) => {
  res.send('it works!')
})

// Catch all other routes and return the Angular index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3030'

app.listen(port, () => console.log('Server is up and running on port ' + port))

module.exports = {
	db: mongoose.connection
}
