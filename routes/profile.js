const router = require('express').Router()
const getUserToken = require('../config/passport_setup').getUserToken
const getProfileInformation = require('../config/passport_setup').getProfileInformation
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
	const orgs = await getOrganizationsFromGithub(req, res)
	res.status(200).send({ ...orgs })
})


/**
 * Here are requests received from nav
 * 
 */


router.get('/events', authCheck, (req, res) => {
	const url = req.body.data
	const data = getOrganizationPropertyContent(url)
	res.status(200).send(data)
})




router.get('/repos', authCheck, (req, res) => {
	const url = req.body.data
	const data = getOrganizationPropertyContent(url)
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
	slackNotification(req, res)
	res.status(200).send('ok')
})


const code = 'c4e2fc98'
const createWebhook = async (nameOfOrganization, githubUserToken) => {
	// Create the hook from organization to endpoint url:
	try {
		const createHookHeader = await axios({
			method: 'POST',
			url: `https://api.github.com/orgs/${nameOfOrganization}/hooks`,
			headers: {
				'authorization': `token ${githubUserToken}`
			},
			data: {
				name: 'web',
				active: true,
				events: ['push', 'repository', 'issues', 'issue_comment'],
				config: {
					url: `http://${code}.ngrok.io/profile/payload`,
					content_type: 'json'
				}
			}
		})
		console.log('CREATE HOOK RES: ', createHookHeader)
	} catch (error) {
		console.log('createWebhook: ', error)
	}
}


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

			createWebhook(orgname, githubUserToken)
		}
		res.status(201).send({
			msg: 'Webhook url saved.'
		})
	} catch (err) {
		console.log('post /webhook: ', err)
	}

})


// Middleware
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
		console.log('getOrganizationsFromGithub: ', err)
	}
}

// Helper functions
const getOrganizationPropertyContent = async (url) => {
	try {
		return await axios.get(url, {
			headers: {
				Authorization: `token ${githubUserToken}`,
				'User-Agent': 'axios'
			}
		})
	} catch (err) {
		console.log('getOrganizations: ', err)
	}
}


// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'youremail@gmail.com',
//     pass: 'yourpassword'
//   }
// });

// let mailOptions = {
//   from: 'youremail@gmail.com',
//   to: 'myfriend@yahoo.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// })

const slackNotification = async (req, res) => {
	try {
	const slackHookKey = process.env.SLACK_HOOK
	console.log( typeof slackHookKey)
	const typeOfEvent = req.headers['x-github-event']
	const resp = req.body
	// console.log('typeof login:: ', resp.sender.login)
	// console.log('typeof login:: ', resp.sender.login)
	console.log('typeof event:: ',typeof typeOfEvent)
	console.log('typeof login:: ', typeof resp.sender.login)

	// const {Something} = data

		const result = await request({
			url: `https://hooks.slack.com/services/${slackHookKey}`,
			method: 'POST',
			body: JSON.stringify({
				text: typeOfEvent,
				json: true
			})
		})
		console.log('WEBHOK SENT: ', result)
	return res.status(200)
	} catch (err) {
		console.log('slackNotification: ', err)
	}
}



module.exports = router
