// const GitHubStrategy = require('passport-github2')
// const passport = require('passport')
// const User = require('../model/user.js')
// const rp = require('request-promise')

// require('dotenv').config()

// let userObject = {}
// let access_token = ''

// const clientID = process.env.GITHUB_CLIENT_ID
// const clientSecret = process.env.GITHUB_CLIENT_SECRET

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
// 		access_token = accessToken

// 		const options = {
// 			uri: 'https://api.github.com/user/orgs',
// 			qs: {
// 				access_token: `${accessToken}` // -> uri + '?access_token=xxxxx%20xxxxx'
// 			},
// 			headers: {
// 				'User-Agent': 'Request-Promise'
// 			},
// 			json: true // Automatically parses the JSON string in the response
// 		}

// 		rp(options)
// 			.then((orgs) => {
// 				console.log(orgs)
// 				userObject = { ...profile, ...orgs }
// 			})
// 			.catch(function (err) {
// 				console.log(err)
// 			})

// 		// User.findOrCreate({ githubId: profile.id }, function (err, user) {
// 		return done(null, userObject)
// 		// })
// 	}
// ))