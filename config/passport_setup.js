const GitHubStrategy = require('passport-github2')
const passport = require('passport')
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
  // console.log('userdeserialize: ', user)
  cb(null, user)
})


const herokuURL = 'https://github-notis.herokuapp.com'

passport.use(new GitHubStrategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: process.env.NODE_ENV === 'production'
    ? herokuURL + '/auth/github/callback'
    : '/auth/github/callback'
},
  async (token, refreshToken, profile, done) => {
    console.log('accesstoken: ', token)

    returnObject = profile._json
    accessToken = token
    try {
      const githubID = profile._json.id
      const user = await User.findOne({ git_id: githubID })
      if (user) {
        console.log('user already exists')
      } else {
        const newUser = new User({
          name: profile._json.name,
          username: profile._json.login,
          git_id: profile._json.id,
          avatar_url: profile._json.avatar_url
        })
        const saveduser = await newUser.save()
        // console.log(saveduser)
      }
      return done(null, { ...profile._json })
    } catch (error) {
      console.log('saveProfileToDB: ', error)
    }




    // saveProfileToDB(profile._json)   // Save new profile to database
  }
))


const saveProfileToDB = async (profile) => {

}


module.exports.getProfileInformation = () => {
  return returnObject
}

module.exports.getUserToken = () => {
  return accessToken
}
