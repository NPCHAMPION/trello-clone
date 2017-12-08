const express = require('express')
const List = require('../schemas/List')
const router = express.Router()

router.route('/')
  .get((req, res) => {
    List.find((err, data) => {
      if (err) {
        res.send(err)
      } else {
        res.json(data)
      }
    })
  })
  // add new entry
  .post((req, res) => {
    var list = new List()
    list.name = req.body.name
    list.save((err) => {
      if (err) {
        res.send(err)
      } else {
        res.json({ message: 'successfully added a list!' })
      }
    })
  })

router.route('/:list_id')
  // put = update a current entry
  .put((req, res) => {
    List.findById(req.params.list_id, (err, list) => {
      if (!list) {
        res.send(err)
      } else {
        list.name = req.body.name
        list.save((err, success) => {
          if (err) {
            console.log(err)
          }
        })
      }
    })
  })
  // delete an entry
  .delete((req, res) => {
    List.remove({ _id: req.params.list_id }, (err, list) => {
      if (err) {
        res.send(err)
      } else {
        res.json({ message: 'List has been deleted!' })
      }
    })
  })

module.exports = router
