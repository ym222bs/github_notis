
const router = require('express').Router()
// Associated with the Strategy object/middleware.
const passport = require('passport')



router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})


router.get('/login', (req, res) => {
  res.send('login failed, go back')
})


router.get('/github',
  passport.authenticate('github', {
    scope: ['user:email', 'admin:org_hook', 'repo', 'user', 'read:org']
  }))


router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    // Successful authentication, redirect home.
    console.log('logged in, ', req.user)
    res.redirect('/profile')
  })



module.exports = router