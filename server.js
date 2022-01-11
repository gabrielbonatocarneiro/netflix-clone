const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()

app.use('/',
  express.static(path.resolve(__dirname, './build'))
)

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log('Tudo funcionando certinho')
})