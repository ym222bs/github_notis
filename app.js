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
DBconnect()

app.get('/', (req, res) => {
	res.send('hello')
})

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)


const port = process.env.PORT || 8000


// If application is running from Heroku then build React to 
// static files and serve from relative path:
if(process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
	})
}

app.listen(port, () => {
	console.log(`Hello port ${port}.`)
})

