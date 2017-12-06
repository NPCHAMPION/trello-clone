const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const schema = mongoose.Schema

const BoardSchema = schema({
    name: { type: String, required: true } 

})

module.exports = mongoose.model('Board', BoardSchema)