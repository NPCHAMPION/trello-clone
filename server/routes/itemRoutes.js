const express = require('express')
const Item = require('../schemas/Item')
const router = express.Router()

router.route('/')
  .get((req, res) => {
    Item.find((err, data) => {
      if (err) {
        res.send(err)
      } else {
        res.json(data)
      }
    })
  })
  // add new entry
  .post((req, res) => {
    var item = new Item()
    item.text = req.body.text
    item.save((err) => {
      if (err) {
        res.send(err)
      } else {
        res.json({ message: 'successfully added a item!' })
      }
    })
  })

router.route('/:item_id')
  // put = update a current entry
  .put((req, res) => {
    Item.findById(req.params.item_id, (err, item) => {
      if (!item) {
        res.send(err)
      } else {
        item.name = req.body.name
        item.save((err, success) => {
          if (err) {
            console.log(err)
          }
        })
      }
    })
  })
  // delete an entry
  .delete((req, res) => {
    Item.remove({ _id: req.params.item_id }, (err, item) => {
      if (err) {
        res.send(err)
      } else {
        res.json({ message: 'Item has been deleted!' })
      }
    })
  })

module.exports = router
