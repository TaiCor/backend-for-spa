const express = require('express')
const app = express()
const mysql = require('mysql')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const path = require('path')

const connection = mysql.createConnection({
  host: 'localhost',
  port: '5000',
  user: 'root',
  password: 'vandal123',
  database: 'mydb'
})

app.use('/images', express.static('public'))
app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
    if (!err) {
      res.json(rows)
    } else {
      console.log(err)
    }
  })
})

// app.get('/myposts', function (req, res) {
//   connection.query('select posts.id, posts.picture, posts.title, posts.description, posts.date, users.name from posts left join users on posts.Users_id = Users.id where Users.id =' + mysql.escape(userId), function (err, rows) {
//     if (!err) {
//       res.json(rows)
//     } else {
//       console.log(err)
//     }
//   })
// })

app.get('/comments', function (req, res) {
  connection.query(`select comments.text, comments.date, comments.post_id, users.name from comments left join users on users.id = comments.user_id `, function (err, rows) {
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
      res.json({status: 'success'})
    } else {
      console.log(err)
    }
  })
})

app.put('/upgradePost', function (req, res) {
})

app.post('/login', function (req, res) {})

app.post('/singup', function (req, res) {
  let name = req.body.name
  let password = req.body.password
  let login = req.body.login
  connection.query('SELECT 1 FROM users WHERE login = "' + login + '" ORDER BY login LIMIT 1', function (err, response) {
    if (err) {
      console.log(err)
    } else {
      if (response.length > 0) {
        res.json({error: 'user exist'})
        console.log('login exist')
      } else {
        connection.query(`insert into users (id, name, login, password) values (null, ?, ?, ?)`, [name, login, password], function (err, rows) {
          if (!err) {
            console.log('user added')
            res.json({res: 'success'})
          } else {
            console.log(err)
          }
        })
      }
    }
  })
})

app.post('/createpost', function (req, res) {
  if (!req.files) {
    console.log('no files uploaded!')
    res.send('no files uploaded')
  } else {
    let file = req.files.file
    let extantion = path.extname(file.name)
    if (extantion !== '.jpg' && extantion !== '.png' && extantion !== '.gif') {
      console.log('require files in jpg/png/gif format')
      res.send('not a picture')
    } else {
      file.mv(path.resolve('/public/', file.name))
      let src = path.resolve('/public/', file.name)
    }
  }
})

app.listen(4000, function () {
  console.log('listen 4000')
})
