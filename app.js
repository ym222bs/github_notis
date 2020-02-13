const cors = require('cors')
const express = require('express')
const DBconnect = require('./config/db_config.js')
const cookieSession = require('cookie-session')
const passport = require('passport')
const passportSetup = require('./routes/profile')
const authRoutes = require('./routes/auth.js')
const profileRoutes = require('./routes/profile.js')
require('dotenv').config()
const app = express()
app.use(cors())
DBconnect()
const secret = process.env.SECRET
app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,
	keys: [secret]
}))

app.use(passport.initialize())
app.use(passport.session())


app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)


app.get('/', (req, res) => {
	res.send('home')
})
	


// // TODO: remove if SESSION is used insted of requesting data to the api.
// app.get('/user', (req, res) => {
// 	console.log('/ user')
// 	res.send(userObject)
// })


const port = process.env.PORT || 8000

app.listen(port, () => {
	console.log(`Hello port ${port}.`)
})

