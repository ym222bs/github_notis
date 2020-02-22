const router = require('express').Router()

// const GitHubStrategy = require('passport-github2')
// const passport = require('passport')
// const User = require('../model/user.js')
const getUserToken = require('../config/passport_setup').getUserToken
const getProfileInformation = require('../config/passport_setup').getProfileInformation
const rp = require('request-promise')
const Hook = require('../model/hook.js')

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


router.get('/orgs', authCheck, async (req, res, next) => {
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
		res.send({ 
			msg: 'Not a valid url or url missing.',
			error: err.message 
	  })
	  next(error)
	}
}) 


router.post('/webhook', authCheck, async (req, res, next) => {
    // const username = req.userName
    // const user_id = req.userID
    // const url = req.body.url

    const hook = new Hook({
          url,
          username,
          userid
    })
    try {
          const newHook = await hook.save()
          res.status(201).send({
                msg: 'Webhook url saved.',
                hook,
                request: {
                      url_home:  `https://${req.headers.host}`,
                      method: 'GET'
                }
          })
          
    }catch(error) {
          res.send({ 
                msg: 'Not a valid url or url missing.',
                error: err.message 
          })
          next(error)
    }
})

module.exports = router
