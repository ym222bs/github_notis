const axios = require('axios')
const request = require('request-promise')

const getUserToken = require('../config/passport_setup').getUserToken
const getProfileInformation = require('../config/passport_setup').getProfileInformation

module.exports.getOrganizationsFromGithub = async () => {
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


module.exports.getOrganizationPropertyContent = async (url) => {
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


const code = '7ec32e70'
module.exports.createWebhook = async (nameOfOrganization, githubUserToken) => {
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


module.exports.slackNotification = async (req) => {
	try {
	const slackHookKey = process.env.SLACK_HOOK
	console.log( typeof slackHookKey)
	const typeOfEvent = req.headers['x-github-event']
	const resp = req.body
	// console.log('typeof login:: ', resp.sender.login)
	// console.log('typeof login:: ', resp.sender.login)
	console.log('typeof event:: ',typeof typeOfEvent)
	console.log('typeof login:: ', typeof resp.sender.login)


		const result = await request({
			url: `https://hooks.slack.com/services/${slackHookKey}`,
			method: 'POST',
			body: JSON.stringify({
				text: typeOfEvent,
				json: true
			})
		})
		console.log('WEBHOK SENT: ', result)
	} catch (err) {
		console.log('slackNotification: ', err)
	}
}


// let transporter = nodemailer.createTransport({
//    service: 'gmail',
//    auth: {
//      user: 'youremail@gmail.com',
//      pass: 'yourpassword'
//    }
//  });
 
//  let mailOptions = {
//    from: 'youremail@gmail.com',
//    to: 'myfriend@yahoo.com',
//    subject: 'Sending Email using Node.js',
//    text: 'That was easy!'
//  };
 
//  transporter.sendMail(mailOptions, function(error, info){
//    if (error) {
//      console.log(error);
//    } else {
//      console.log('Email sent: ' + info.response);
//    }
//  })
