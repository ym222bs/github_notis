const axios = require('axios')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const request = require('request-promise')
const secureCompare = require('secure-compare')
const getUserToken = require('../config/passport_setup').getUserToken
const getProfileInformation = require('../config/passport_setup').getProfileInformation


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
  const githubUserToken = getUserToken()
  const url = 'https://api.github.com/user/orgs'
  return getData(url, githubUserToken)
}


module.exports.getOrganizationPropertyContent = (url) => {
  const githubUserToken = getUserToken()
  return getData(url, githubUserToken)
}


const code = ''
const bla = 'http://fa137571.ngrok.io/gitprofile/payload/'
const herokuURL = 'https://github-notis.herokuapp.com/gitprofile/payload/'


// TODO: ALARMING INSTRUCTIONS: ALWAYS USE '/' at the end of a url, 
// otherwise the browser will give 302!!!!!!!
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
          url: bla,
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


module.exports.slackNotification = async (req, url) => {

  try {
    const slackHookKey = process.env.SLACK_HOOK
    const typeOfEvent = req.headers['x-github-event']

    validateIncomingPayload(req)

    const result = await request({
      url: url,
      method: 'POST',
      body: JSON.stringify({
        text: typeOfEvent,
        json: true
      })
    })
    console.log('WEBHoOK SENT: ', result)
    return result

  } catch (err) {
    console.log('slackNotification: ', err)
  }
}


const sendNotification = async (slackHookKey, typeOfEvent, url) => {
  const result = await request({
    url: url,
    method: 'POST',
    body: JSON.stringify({
      text: typeOfEvent,
      json: true
    })
  })
  console.log('WEBHoOK SENT: ', result)
  return result
}

const validateIncomingPayload = async (req) => {
  const payload = await JSON.stringify(req.body)
  const sec = 'superdupersecret888'
  const signature = req.headers['x-hub-signature']

  const hmac = crypto.createHmac('sha1', sec)
  hmac.update(payload)

  //  compare hashed string
  const hashad = 'sha1=' + hmac.digest('hex')

  if (secureCompare(signature, hashad)) {
    console.log('Payload came from git')
  }
}

