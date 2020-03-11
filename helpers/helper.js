const axios = require('axios')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const request = require('request-promise')
const getUserToken = require('../config/passport_setup').getUserToken
const getProfileInformation = require('../config/passport_setup').getProfileInformation

const githubUserToken = getUserToken()

const getData = async (url, token) => {
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `token ${token}`,
        'User-Agent': 'axios'
      }
    })
    return res.data
  } catch (err) {
    console.log('getOrganizationsFromGithub: ', err)
  }
}


module.exports.getOrganizationsFromGithub = () => {
  const url = 'https://api.github.com/user/orgs'
  return getData(url, githubUserToken)
}


module.exports.getOrganizationPropertyContent = (url) => {
  return getData(url, githubUserToken)
}


const code = '9093a27f'
const bla = `https://352a39e7.ngrok.io/gitprofile/payload`
const herokuURL = 'https://github-notis.herokuapp.com/gitprofile/payload'

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
          url: herokuURL,
          content_type: 'json',
          secret: 'superdupersecret888'
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
    const typeOfEvent = req.headers['x-github-event']
    const resp = req.body
    // console.log('typeof login:: ', resp.sender.login)
    // console.log('typeof login:: ', resp.sender.login)
    console.log('typeof event:: ', typeof typeOfEvent)
    console.log('typeof login:: ', typeof resp.sender.login)

    // TODO: Validate Request ORIGIN!!!!!!
    // TODO: ONLY send the webhooks that are TOGGLED = TRUE in DataBase to slack notification

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

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// })
