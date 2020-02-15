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



const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/github')
    } else {
        next()
    }
}

router.get('/', authCheck, (req, res) => {
	// console.log(req.user)
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
		// console.log(orgs)
		res.send({ ...orgs })

	} catch (error) {
		console.log(error)
	}
}) 


module.exports = router
