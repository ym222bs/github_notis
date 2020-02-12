const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const passport = require('passport')
const GitHubStrategy = require('passport-github2')
const DBconnect = require('./db_config.js')
const cookieSession = require('cookie-session')
const fetch = require('node-fetch')
const rp = require('request-promise')
require('dotenv').config()
const app = express()
app.use(cors())
DBconnect()
const secret = process.env.SECRET
app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,
	keys: [secret]
}))

const clientID = process.env.GITHUB_CLIENT_ID
const clientSecret = process.env.GITHUB_CLIENT_SECRET


let user = {}
let acess_token

app.use(passport.initialize())

passport.serializeUser((user, cb) => {
	cb(null, user)
})
passport.deserializeUser((user, cb) => {
	cb(null, user)
})





passport.use(new GitHubStrategy({
	clientID: clientID,
	clientSecret: clientSecret,
	callbackURL: "/auth/github/callback"
},
	async function (accessToken, refreshToken, profile, done) {
		console.log('accesstoken: ', accessToken)
		// Save accesstoken to make requests
		// access_token = accessToken



		var options = {
			uri: 'https://api.github.com/user/orgs',
			qs: {
				access_token: `${accessToken}` // -> uri + '?access_token=xxxxx%20xxxxx'
			},
			headers: {
				'User-Agent': 'Request-Promise'
			},
			json: true // Automatically parses the JSON string in the response
		}
		// console.log('profile: ', profile)
		rp(options).then(function (repos) {
			console.log(repos);
		})
		.catch(function (err) {
			console.log(err)
		});
		// let data = await organizations
		// console.log(organizations)

		user = { ...profile }
		// User.findOrCreate({ githubId: profile.id }, function (err, user) {
		return done(null, profile)
		// })
	}
))

// scope: ['user:email', 'admin:org_hook', 'repo', 'user']

app.get('/auth/github',
	passport.authenticate('github', { scope: ['user:email', 'admin:org_hook', 'repo', 'user', 'read:org'] }))

app.get('/auth/github/callback',
	passport.authenticate('github', { failureRedirect: '/login' }),
	function (req, res) {
		// Successful authentication, redirect home.
		
		res.redirect('/')
	})


app.get('/', (req, res) => {
	res.send('home')
})
	


// TODO: remove if SESSION is used insted of requesting data to the api.
app.get('/user', (req, res) => {
	console.log('/ user')
	res.send(user)
})


app.get('/logout', (req, res) => {
	console.log('logging out')
	user = {}
	res.redirect('/')
})

app.get('/login', (req, res) => {
	res.send('login failed')
})

const port = process.env.PORT || 8000

app.listen(port, () => {
	console.log(`Hello port ${port}.`)
})

