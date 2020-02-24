const router = require('express').Router()
const getUserToken = require('../config/passport_setup').getUserToken
const getProfileInformation = require('../config/passport_setup').getProfileInformation
const axios = require('axios')
const rp = require('request-promise')
const Hook = require('../model/hook.js')

require('dotenv').config()


const authCheck = (req, res, next) => {
	!req.user ? res.redirect('/auth/github') : next()
}

router.get('/', authCheck, (req, res) => {
	res.send(req.user)
})


router.get('/orgs', authCheck, async (req, res, next) => {
	// const organizations = await getOrganizations(req, res)
	// res.status(200).send({ ...orgs })

	const token = getUserToken()
	const options = {
		url: 'https://api.github.com/user/orgs',
		qs: {
			access_token: token
		},
		headers: {
			'User-Agent': 'Request-Promise'
		},
		json: true
	}
	try {
		const orgs = await rp(options)
		res.send({ ...orgs })

	} catch (err) {
		console.log('get /orgs: ', err)
		res.send({
			msg: 'Not a valid url or url missing.',
			err: err.message
		})
		next(err)
	}
})


router.post('/webhook', authCheck, async (req, res, next) => {
	const { url } = req.data

	// const { login, id, url,  } = getProfileInformation()
	// const hook = new Hook({
	// 	url,
	// 	username,
	// 	userid
	// })
	try {
		// const newHook = await hook.save()
		// res.status(201).send({
		// 	msg: 'Webhook url saved.',
		// 	hook
		// })
		console.log('url from klient to server', url)
	} catch (err) {
		res.send({
			msg: 'Not a valid url or url missing.',
			error: err.message
		})
		next(err)
	}
})


const getOrganizations = async (req, res) => {
	const token = getUserToken()

	const options = {
		url: 'https://api.github.com/user/orgs',
		qs: {
			access_token: token
		},
		headers: {
			'User-Agent': 'Request-Promise'
		},
		json: true
	}
	try {
		const orgs = await rp(options)
		res.send({ ...orgs })

	} catch (err) {
		console.log('get /orgs: ', err)
		res.send({
			msg: 'Not a valid url or url missing.',
			err: err.message
		})
		console.log(err)
	}
}


module.exports = router
