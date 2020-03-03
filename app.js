require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieSession = require('cookie-session')
const express = require('express')
const csp = require('express-csp-header')
const passport = require('passport')
const path = require('path')

const allowHeaders = require('./allowHeaders.js')
const DBconnect = require('./config/db_config.js')
const passportSetup = require('./config/passport_setup.js') // Initiating passportStrategy (runs Automatically)
const authRoutes = require('./routes/auth.js')
const profileRoutes = require('./routes/profile.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const secret = process.env.COOKIE_SECRET
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [secret]
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(allowHeaders)
// app.use(cors)

// Initialize MongoDB
DBconnect()


app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)


const port = process.env.PORT || 8000
const githubid = process.env.GITHUB_CLIENT_ID
console.log('GITID: ', githubid)

const githubsecret = process.env.GITHUB_CLIENT_SECRET
console.log('SECRET: ', githubsecret)

const c = process.env.COOKIE_SECRET
console.log('COOKIE: ', c)

const m = process.env.MONGODB_URI
console.log('MONGO: ', m)

const s = process.env.SLACK_HOOK
console.log('SLCAK: ', s)

const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
console.log('fullUrl: ', fullUrl)

// If application is running from Heroku then build React to 
// static files and serve from relative path:
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Hello port ${port}.`)
})

