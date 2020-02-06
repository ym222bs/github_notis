const express = require('express')
const cors = require('cors')
const passport = require('passport')
const GitHubStrategy = require('passport-github2')
// const GitHubStrategy= require('passport-github')
const bodyParser = require('body-parser')
const github = require('octonode')

require('dotenv').config()

const port = process.env.PORT || 8000

const clientID = process.env.GITHUB_CLIENT_ID
const clientSecret = process.env.GITHUB_CLIENT_SECRET

let user = {}


const app = express()
app.use(cors())
app.use(passport.initialize())

passport.serializeUser((user, cb) => {
	// console.log(user)
	cb(null, user.id)
})
passport.deserializeUser((user, cb) => {
	cb(null, user)
})


passport.use(new GitHubStrategy({
	clientID: clientID,
	clientSecret: clientSecret,
	callbackURL: "/auth/github/callback"
},
	function (accessToken, refreshToken, profile, done) {
		// console.log('accesstoken: ', accessToken)
		// console.log('ref token: ', refreshToken)
		// console.log('profile: ', profile)


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


app.listen(port, () => {
	console.log(`Hello port ${port}.`)
})