const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    await mongoose.connect(encodeURI(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`), { useNewUrlParser: true})
    res.json(await getDbVersion())
  } catch (err) {
    console.log(err)
    res.json('Unknown')
  }
})

const getDbVersion = () => {
  return new Promise((resolve, reject) => {
    new mongoose.mongo.Admin(mongoose.connection.db)
        .buildInfo( (err, db) => err ? reject(err) : resolve(db.version))
  })
}

module.exports = router
