require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieSession = require('cookie-session')
const express = require('express')
const passport = require('passport')
const path = require('path')

const allowHeaders = require('./allowHeaders.js')
const authRoutes = require('./routes/auth.js')
const DBconnect = require('./config/db_config.js')
const passportSetup = require('./config/passport_setup.js') // Initiating passportStrategy (runs Automatically)
const profileRoutes = require('./routes/profile.js')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const secret = process.env.COOKIE_SECRET
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [secret]
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(allowHeaders)



app.use(cors())

// Initialize MongoDB
DBconnect()

app.use('/auth', authRoutes)
app.use('/gitprofile', profileRoutes)


app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    error: {
      message: err.message
    }
  })
})

app.get('/', (req, res) => {
  res.send('Home')
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 8000

const server = app.listen(port, () => console.log(`Hello on port ${port}.`))
const io = require('socket.io')(server)

// io.on('connection', (socket) => {
//   console.log('Connected')

//   socket.on('disconnect', () => {
//     console.log('Disconnected')
//   })
// })

app.set('socketio', io)
