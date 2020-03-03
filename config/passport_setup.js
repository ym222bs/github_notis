const GitHubStrategy = require('passport-github2')
const passport = require('passport')
const rp = require('request-promise')
const User = require('../model/user.js')

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

    saveProfileToDB(profile._json)   // Save new profile to database
    return done(null, { ...profile._json })
  }
))


const saveProfileToDB = async (profile) => {
  try {
    const githubID = profile.id
    const user = await User.findOne({ git_id: githubID })
    if (user) {
      console.log('user already exists')
    } else {
      const newUser = new User({
        name: profile.name,
        username: profile.login,
        git_id: profile.id,
        avatar_url: profile.avatar_url
      })
      const saveduser = await newUser.save()
      console.log(saveduser)
    }
  } catch (error) {
    console.log('saveProfileToDB: ', error)
  }
}


module.exports.getProfileInformation = () => {
  return returnObject
}

module.exports.getUserToken = () => {
  return accessToken
}
