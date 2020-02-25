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
	res.status(200).send(req.user)
})


router.get('/orgs', authCheck, async (req, res, next) => {
	const orgs = await getOrganizationsFromGithub(req, res)
	res.status(200).send({ ...orgs })
})


/**
 * Here are requests received from nav
 * 
 */

 // router.get('/events')
 router.get('/events', authCheck, (req, res) => {
	 res.send('Not done')
 })



 // router.get('/repos')
 router.get('/repos', authCheck, (req, res) => {
	res.send('Not done')
})




router.get('/webhook', authCheck, async (req, res, next) => {
	// Get current users earlies webhooks and send to Client

	try {
		const webhooks = await Hook.find({})

		res.status(200).send({
			organization: webhooks.organization,
			createdAt: webhooks.createdAt
		})
	} catch (err) {
		res.status(500).send('get /webhook error')
		next(err)
	}
})


// POST Webhook url
router.post('/webhook', authCheck, async (req, res, next) => {
	try {
	// TODO check existence first!

	// const hook = new Hook({
	// 	url,
	// 	username,
	// 	userid
	// })
		// const newHook = await hook.save()
		// res.status(201).send({
			// 	msg: 'Webhook url saved.',
			// 	hook
			// })
	} catch (error) {
		
	}
})


const getPropertyUrl = async (url) => {
	try {
		const res = await axios.get(url, {
			headers: {
				Authorization: `token ${githubUserToken}`,
				'User-Agent': 'axios'
			}
		})
		return res.data

	} catch (err) {
		console.log('getOrganizations: ', err)
	}
}


const getOrganizationsFromGithub = async (req, res) => {
	const githubUserToken = getUserToken()
	try {
		const res = await axios.get('https://api.github.com/user/orgs', {
			headers: {
				Authorization: `token ${githubUserToken}`,
				'User-Agent': 'axios'
			}
		})
		return res.data
	} catch (err) {
		console.log('getOrganizations: ', err)
	}
}


module.exports = router
