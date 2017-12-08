const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const schema = mongoose.Schema

const ItemSchema = schema({
  listId: { type: String, required: true, unique: true },
  text: { type: String, required: true }

})

module.exports = mongoose.model('Item', ItemSchema)
