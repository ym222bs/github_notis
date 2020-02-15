const router = require('express').Router()

// const GitHubStrategy = require('passport-github2')
// const passport = require('passport')
// const User = require('../model/user.js')
const getUserToken = require('../config/passport_setup').getUserToken
const getProfileInformation = require('../config/passport_setup').getProfileInformation
const rp = require('request-promise')

require('dotenv').config()

let userObject = {}
let organizations = {}
let access_token = ''

const clientID = process.env.GITHUB_CLIENT_ID
const clientSecret = process.env.GITHUB_CLIENT_SECRET

// passport.serializeUser((user, cb) => {
// 	cb(null, user)
// })
// passport.deserializeUser((user, cb) => {
// 	cb(null, user)
// })

// passport.use(new GitHubStrategy({
// 	clientID: clientID,
// 	clientSecret: clientSecret,
// 	callbackURL: '/auth/github/callback'
// },
// 	async function (accessToken, refreshToken, profile, done) {
// 		// console.log('accesstoken: ', accessToken)
// 		// console.log('profile: ', profile)
// 		// Save accesstoken to make requests
// 		// Select get relevant data:
// 		const { 
// 			displayName, 
// 			username, 
// 			id, 
// 			avatar_url 
// 		} = profile 

// 		// userObject = {displayName, username, id, avatar_url}
// 		userObject = { ...profile }

// 		access_token = accessToken

// 		return done(null, profile)

// 	}
// ))




const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/github')
    } else {
        next()
    }
}

router.get('/', authCheck, (req, res) => {
	console.log(req.user)
	res.send(req.user)
})


router.get('/orgs', authCheck, async (req, res) => {
	 const token = getUserToken()

	const options = {
		uri: 'https://api.github.com/user/orgs',
		qs: {
			access_token: token
		},
		headers: {
			'User-Agent': 'Request-Promise'
		},
		json: true // Automatically parses the JSON string in the response
	}
	try {
		const orgs = await rp(options)
		console.log(orgs)
		res.send({ ...orgs })

	} catch (error) {
		console.log(error)
	}
}) 


module.exports = router
