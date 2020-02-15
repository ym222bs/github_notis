const GitHubStrategy = require('passport-github2')
const passport = require('passport')
const rp = require('request-promise')

require('dotenv').config()

let userObject = {}
let organizations = {}
let accessToken = ''

const clientID = process.env.GITHUB_CLIENT_ID
const clientSecret = process.env.GITHUB_CLIENT_SECRET

passport.serializeUser((user, cb) => {
	cb(null, user)
})
passport.deserializeUser((user, cb) => {
	cb(null, user)
})

passport.use(new GitHubStrategy({
	clientID: clientID,
	clientSecret: clientSecret,
	callbackURL: '/auth/github/callback'
},
	async (token, refreshToken, profile, done) => {
		// console.log('accesstoken: ', accessToken)
		// console.log('profile: ', profile)
		// Save accesstoken to make requests
		// Select get relevant data:
		const { 
			displayName, 
			username, 
			id, 
			avatar_url 
		} = profile 

		// userObject = {displayName, username, id, avatar_url}
		userObject = { ...profile }

		accessToken = token

		return done(null, profile)

	}
))


module.exports.getProfileInformation = () => {
    return userObject
}

module.exports.getUserToken = () => {
    return accessToken
}
