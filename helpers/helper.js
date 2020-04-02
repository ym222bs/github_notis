const axios = require('axios')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const request = require('request-promise')
const secureCompare = require('secure-compare')
const getUserToken = require('../config/passport_setup').getUserToken
const getProfileInformation = require('../config/passport_setup').getProfileInformation
const here = require('./helper.js')


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


module.exports.getAllOrganizationEvents = async () => {
  const githubUserToken = getUserToken()
  const { login } = getProfileInformation()
  const url = `https://api.github.com/users/${login}/events`
  return getData(url, githubUserToken)
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


const ngrokURL = 'http://945c4f6a.ngrok.io/gitprofile/payload/'
const herokuURL = 'https://github-notis.herokuapp.com/gitprofile/payload/'

//  ALARMING INSTRUCTIONS: ALWAYS USE '/' at the end of the webhook url, 
//  otherwise the browser will give 302
module.exports.createWebhook = async (nameOfOrganization, githubUserToken) => {
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
          url: process.env.NODE_ENV === 'production'
            ? herokuURL
            : ngrokURL,
          content_type: 'json',
          secret: process.env.GITHUB_WEBHOOK_SECRET
        }
      }
    })
    console.log('Created webhook: ', createHookHeader)
  } catch (error) {
    console.log('createWebhook: ', error)
  }
}


module.exports.slackNotification = async (req, url) => {
  try {
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
    return result
  } catch (err) {
    console.log('slackNotification: ', err)
  }
}

const validateIncomingPayload = async (req) => {
  const payload = await JSON.stringify(req.body)
  const sec = process.env.GITHUB_WEBHOOK_SECRET
  const signature = req.headers['x-hub-signature']

  const hmac = crypto.createHmac('sha1', sec)
  hmac.update(payload)

  //  compare hashed string
  const hashad = 'sha1=' + hmac.digest('hex')

  if (secureCompare(signature, hashad)) {
    console.log('Payload ok, came from git')
  }
}

module.exports.evaluateSettings = (typeOfEvent, hook, req, url) => {
  switch (typeOfEvent) {
    case 'push':
      if (hook.push !== false) {
        here.slackNotification(req, url)
      }
      break;
    case 'repository':
      if (hook.repo !== false) {
        here.slackNotification(req, url)
      }
    case 'issues':
      if (hook.issue !== false) {
        here.slackNotification(req, url)
      }
    case 'issue_comment':
      if (hook.comment !== false) {
        here.slackNotification(req, url)
      }
    default:
      break;
  }
}

