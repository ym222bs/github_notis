
const router = require('express').Router()
const passport = require('passport')



router.get('/logout', (req, res) => {
	console.log('logging out')
	res.redirect('/')
})


router.get('/login', (req, res) => {
	res.send('login failed')
})


router.get('/github',
	passport.authenticate('github', { scope: ['user:email', 'admin:org_hook', 'repo', 'user', 'read:org'] 
}))


router.get('/github/callback', 
	passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
		// Successful authentication, redirect home.
		// res.send(req.user)
		res.redirect('/')
})
    


module.exports = router