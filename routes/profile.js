const router = require('express').Router()
const getUserToken = require('../config/passport_setup').getUserToken
const getProfileInformation = require('../config/passport_setup').getProfileInformation


const helper = require('../helpers/helper.js')
const axios = require('axios')
const rp = require('request-promise')
const Hook = require('../model/hook.js')
const re = require('request')
let request = require('request-promise')
const nodemailer = require('nodemailer')


require('dotenv').config()


const authCheck = (req, res, next) => {
	!req.user ? res.redirect('/') : next()
}


router.get('/', authCheck, (req, res) => {
	res.status(200).send(req.user)
})


router.get('/orgs', authCheck, async (req, res, next) => {
	const orgs = await helper.getOrganizationsFromGithub(req)
	res.status(200).send({ ...orgs })
})


router.get('/events', authCheck, (req, res) => {
	const url = req.body.data
	const data = helper.getOrganizationPropertyContent(url)
	res.status(200).send(data)
})


router.get('/repos', authCheck, (req, res) => {
	const url = req.body.data
	const data = helper.getOrganizationPropertyContent(url)
	res.status(200).send(data)
})


router.get('/webhook', authCheck, async (req, res, next) => {
	// Get current users earlies webhooks and send to Client
	try {
		const webhooks = await Hook.find({})

		console.log(webhooks)
		if (webhooks) {
			res.status(200).send({
				organization: webhooks.organization,
				createdAt: webhooks.createdAt
			})
		} else {
			console.log('no saved webhooks')
		}

	} catch (err) {
		console.log('get /webhook: ', err)
	}

})


// TODO this is where the payload will land
router.post('/payload', async (req, res) => {
	console.log(req.body)
	helper.slackNotification(req, res)
	res.status(200).send('ok')
})


router.post('/webhook', authCheck, async (req, res, next) => {
	try {
		const { hookurl, orgname } = req.body.data
		const { login, id } = getProfileInformation()
		const githubUserToken = getUserToken()

		const webhook = await Hook.findOne({ git_id: id })

		// Save to database if the hook does not exists yet
		if (!webhook) {
			const newHook = new Hook({
				url: hookurl,
				organization: orgname,
				username: login,
				git_id: id
			})
			await newHook.save()

			helper.createWebhook(orgname, githubUserToken)
		}
		res.status(201).send({
			msg: 'Webhook url saved.'
		})
	} catch (err) {
		console.log('post /webhook: ', err)
	}
})



module.exports = router
