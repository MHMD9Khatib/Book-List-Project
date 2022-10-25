const express = require('express')
const bookRoutes = require('./src/routes/routes');
// const bodyParser = require('body-parser')
// const db = require('./queries')
const path = require('path')
require("env2")(".env");
const port = process.env.PORT;

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'assets')))

// app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static(path.join(__dirname, 'assets')))


// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// )

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello World!")
})

// app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)

app.use("/api/v1/booklist", bookRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port || 3000}.`)
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////

