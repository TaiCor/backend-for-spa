const express = require('express')
const app = express()
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  port: '5000',
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
  connection.query(`select posts.id, posts.picture, 
                    posts.title, posts.description, 
                    posts.date, users.name from posts 
                    left join users on posts.user_id = users.id`, function (err, rows) {
    connection.end()
    if (!err) {
      res.json(rows)
    } else {
      console.log(err)
    }
  })
})

app.get('/myposts', function (req, res) {
  let userId
  connection.query('select posts.id, posts.picture, posts.title, posts.description, posts.date, users.name from posts left join users on posts.Users_id = Users.id where Users.id =' + mysql.escape(userId), function (err, rows) {
    connection.end()
    if (!err) {
      res.json(rows)
    } else {
      console.log(err)
    }
  })
})

app.get('/comments', function (req, res) {
  connection.query(`select comments.text, comments.date, comments.post_id, users.name from comments left join users on users.id = comments.user_id `, function (err, rows) {
    connection.end()
    if (!err) {
      res.json(rows)
    } else {
      console.log(err)
    }
  })
})

app.get('/rate', function (req, res) {
})

app.delete('/deletePost/:id', function (req, res) {
})

app.put('/upgradePost', function (req, res) {
})

app.post('/login', function (req, res) {})

app.post('/singup', function (req, res) {})

app.listen(4000, function () {
  console.log('listen 4000')
})
