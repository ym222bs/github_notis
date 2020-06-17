const GitHubStrategy = require('passport-github2')
const passport = require('passport')
const User = require('../models/user.js')

require('dotenv').config()

const clientID = process.env.GITHUB_CLIENT_ID
const clientSecret = process.env.GITHUB_CLIENT_SECRET

passport.serializeUser((user, cb) => {
  cb(null, user)
})
passport.deserializeUser((user, cb) => {
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
    try {
      // const githubID = profile._json.id
      // const user = await User.findOne({ git_id: githubID })
      // if (user) {
      //   const query = {}
      //   query.token = token
      //   await User.updateOne({ git_id: githubID }, { $set: query })
      //   console.log('user already exists')
      // } else {
      //   const newUser = new User({
      //     name: profile._json.name,
      //     username: profile._json.login,
      //     git_id: profile._json.id,
      //     avatar_url: profile._json.avatar_url,
      //     token: token
      //   })
      //   const saveduser = await newUser.save()
      // }
      saveProfileToDB(token, profile._json)   // Save new profile to database
      return done(null, { ...profile._json })
    } catch (error) {
      console.log('saveProfileToDB: ', error)
    }
  }
))


const saveProfileToDB = async (githubToken, profile) => {
  try {
    const githubID = profile.id
    const user = await User.findOne({ git_id: githubID })
    if (user) {
      const query = {}
      query.token = githubToken
      await User.updateOne({ git_id: githubID }, { $set: query })
      console.log('user already exists')
    } else {
      const newUser = new User({
        name: profile.name,
        username: profile.login,
        git_id: profile.id,
        avatar_url: profile.avatar_url,
        token: githubToken
      })
      const savedUser = await newUser.save()
      console.log(savedUser)
    }
  } catch (error) {
    console.log('saveProfileToDB: ', error)
  }
}
