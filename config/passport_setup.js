const GitHubStrategy = require('passport-github2')
const passport = require('passport')
const rp = require('request-promise')

require('dotenv').config()

let returnObject = {}
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
		console.log('accesstoken: ', token)
		returnObject = profile._json
		accessToken = token

		return done(null, {...profile._json})
	}
))


module.exports.getProfileInformation = () => {
    return returnObject
}

module.exports.getUserToken = () => {
    return accessToken
}
