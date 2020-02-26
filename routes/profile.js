const router = require('express').Router()
const getUserToken = require('../config/passport_setup').getUserToken
const getProfileInformation = require('../config/passport_setup').getProfileInformation
const axios = require('axios')
const rp = require('request-promise')
const Hook = require('../model/hook.js')
const re = require('request')
let request = require('request-promise')

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

	const webhooks = await Hook.find({}).catch(e => {
		console.log(e)
		res.status(500).send('get /webhook error')
	})

	console.log(webhooks)
	if (webhooks) {
		res.status(200).send({
			organization: webhooks.organization,
			createdAt: webhooks.createdAt
		})
	} else {
		console.log('no saved webhooks')
	}

})


// POST Webhook url

// json: true
router.post('/webhook', authCheck, async (req, res, next) => {
	try {
		const { hookurl, orgname } = req.body.data
		console.log('user hooook: ', hookurl)
		console.log(orgname)
		const { login, id } = getProfileInformation()
		console.log(login)
		console.log(id)

		// TODO ADD THE 
		// const webhook = await Hook.findOne({ userid: id })
		// if (!webhook) {
		// 	const hook = new Hook({
		// 		url: hookurl,
		// 		organization: orgname,
		// 		username: login,
		// 		userid: id
		// 	})
		// 	const bja = await hook.save()
		// 	console.log(bja)
		const githubUserToken = getUserToken()
		console.log('usetrrttoken: ', githubUserToken)
		console.log('usetrrttoken: ', githubUserToken)


		const createHookHeader = await axios({
			method: 'POST',
			url: `https://api.github.com/orgs/${orgname}/hooks`,
			headers: {
				'authorization': `token ${githubUserToken}`
			},
			data: {
				name: 'web',
				active: true,
				events: ['push', 'repository', 'issues', 'issue_comment'],
				config: {
					url: 'https://webhook.site/186c4ca6-f742-4612-aa78-36a53bb1f92e',
					content_type: 'json'
				}
			}
		})

		console.log('CREATE HOOK RES: ',createHookHeader)



		// res.status(201).send({
		// 	msg: 'Webhook url saved.',
		// 	hook
		// })
		// } else {
		// 	console.log('hook already exists')
		// }
		res.status(200)

		// TODO: create a webhook as a separate function

	} catch (err) {
		console.log(err)
	}
})


const getOrganizationPropertyUrl = async (url) => {
	try {
		await axios.get(url, {
			headers: {
				Authorization: `token ${githubUserToken}`,
				'User-Agent': 'axios'
			}
		})
		// return data

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
