const express = require('express')
const app = express()
const mysql = require('mysql')
const fileUpload = require('express-fileuploader')

const connection = mysql.createConnection({
  host: 'localhost',
  port: '5000',
  user: 'root',
  password: 'vandal123',
  database: 'mydb'
})

app.use('/images', express.static('public'))
app.use(fileUpload())

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

// app.get('/myposts', function (req, res) {
//   connection.query('select posts.id, posts.picture, posts.title, posts.description, posts.date, users.name from posts left join users on posts.Users_id = Users.id where Users.id =' + mysql.escape(userId), function (err, rows) {
//     connection.end()
//     if (!err) {
//       res.json(rows)
//     } else {
//       console.log(err)
//     }
//   })
// })

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
  connection.query('delete from posts where id=' + mysql.escape(req.params.id), function (err, rows) {
    if (!err) {
      console.log('row deleted!')
    } else {
      console.log(err)
    }
  })
})

app.put('/upgradePost', function (req, res) {
})

app.post('/login', function (req, res) {})

app.post('/singup/', function (req, res) {
  res.send(req.params)
})
//   connection.query('insert into users set ?', [user], function (err, rows) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log('user added')
//     }
//   })
// })

app.listen(4000, function () {
  console.log('listen 4000')
})
