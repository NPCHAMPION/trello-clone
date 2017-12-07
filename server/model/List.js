const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const schema = mongoose.Schema

const ListSchema = schema({
    name: { type: String, required: true } 

})

module.exports = mongoose.model('List', ListSchema)