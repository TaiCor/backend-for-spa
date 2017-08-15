const express = require('express')
const app = express()
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost:5000',
  user: 'root',
  password: 'vandal123',
  database: 'mydb'
})
app.use('/images', express.static('public'))

connection.connect(function (err) {
  if (!err) {
    console.log('DB connected! ...')
  } else {
    console.log('error connecting to DB ...')
  }
})

app.get('/posts', function (req, res) {
  connection.query('select Posts.id, Posts.picture, Posts.title, Posts.description, Posts.date, Users.Name from Posts left join Users on Posts.Users_id = Users.id', function (err, rows) {
    connection.end()
    if (!err) {
      res.json(rows)
    } else {
      console.log('error')
    }
  })
})

app.get('/myposts', function (req, res) {
  let userId
  connection.query('select Posts.id, Posts.picture, Posts.title, Posts.description, Posts.date, Users.Name from Posts left join Users on Posts.Users_id = Users.id where Users.id =' + mysql.escape(userId), function (err, rows) {
    connection.end()
    if (!err) {
      res.json(rows)
    } else {
      console.log('error')
    }
  })
})

app.get('/comments', function (req, res) {
})

app.get('/rate', function (req, res) {
})

app.delete('/deletePost/:id', function (req, res) {
})

app.put('/upgradePost', function (req, res) {
})

app.post('/login', function (req, res) {})

app.post('/singup', function (req, res) {})

app.listen(5000, function () {
  console.log('listen 5000')
})
