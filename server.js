'use strict'

var history = require('connect-history-api-fallback')
var express = require('express')
var app = express()
var port = process.env.PORT || 5382

var router = express.Router()

router.get('/', function(req, res, next) {
  req.url = '/index.html'
  console.log(req.url)
  next()
})

// index
app.use(router).use(history())

// 静态资源目录
app.use(express.static('./build'))

// listen
module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
