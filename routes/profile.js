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


router.post('/webhook', authCheck, async (req, res, next) => {
	const url = req.body

	console.log(url)
	// const someData = await getPropertyUrl(url)
	// console.log('somedata:: ',someData)
	// const { login, id, url,  } = getProfileInformation()
	// const hook = new Hook({
	// 	url,
	// 	username,
	// 	userid
	// })
	res.status(200).send({msg: 'I have recieved some data to webhook'})
	try {
		// const newHook = await hook.save()
		// res.status(201).send({
			// 	msg: 'Webhook url saved.',
			// 	hook
			// })
	} catch (err) {
		res.status(500).send({
			msg: 'Not a valid url or url missing.',
			error: err.message
		})
		next(err)
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
