require('dotenv').config()
const crypto = require('crypto')
const router = require('express').Router()
const getUserToken = require('../config/passport_setup').getUserToken
const getProfileInformation = require('../config/passport_setup').getProfileInformation
const helper = require('../helpers/helper.js')
const Hook = require('../model/hook.js')


const authCheck = (req, res, next) => {
  !req.user ? res.redirect('/') : next()
}


router.get('/', (req, res) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
  res.status(200).send(req.user)
})


router.get('/orgs', authCheck, async (req, res, next) => {
  const orgs = await helper.getOrganizationsFromGithub(req)
  res.status(200).send({ ...orgs })
})


router.post('/events', authCheck, async (req, res) => {
  const { githubUrl } = req.body.data
  const data = await helper.getOrganizationPropertyContent(githubUrl)
  res.status(200).send({ ...data })
})


router.post('/repos', authCheck, async (req, res) => {
  const { githubUrl } = req.body.data
  const data = await helper.getOrganizationPropertyContent(githubUrl)
  res.status(200).send({ ...data })
})


router.get('/webhook', authCheck, async (req, res) => {
  try {
    console.log('Here 1')
    const { id } = getProfileInformation()
    console.log('Here 2')

    const webhooks = await Hook.find({ git_id: id }).select('-_id')
    console.log('Here 3')

    return res.status(200).send({ webhooks })
  } catch (err) {
    console.log('GET webhook ', err)
  }
})


router.post('/webhook', authCheck, async (req, res, next) => {
  try {
    const { githubUrl, orgname, webhook } = req.body.data
    const { login, id } = getProfileInformation()
    const githubUserToken = getUserToken()

    // TODO: check if one userID has multiple Organization hooks (double query)
    const existsingHook = await Hook.findOne({ git_id: id })

    // Save to database if the hook does not exists yet
    if (!existsingHook) {
      const newHook = new Hook({
        url: githubUrl,
        webhook: webhook,
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
    console.log('POST webhook ', err)
  }
})

// need to be posting without auth here, only Github validation 
// will save this route.
router.post('/payload', async (req, res) => {

  const typeOfEvent = req.headers['x-github-event']
  const org = req.body.organization.login
  const sender = req.body.sender.id
  const hook = await Hook.findOne({ git_id: sender, organization: org })
    .catch(err => console.log('POST payload ', err))

  const slackHookKey = hook.webhook
  const url = `https://hooks.slack.com/services/${slackHookKey}`

  switch (typeOfEvent) {
    case 'push':
      if (hook.push === false) {
        return
      } else {
        helper.slackNotification(req, url)
      }
      break;
    case 'reposetory':
      if (hook.repo === false) {
        return
      } else {
        helper.slackNotification(req, url)
      }
    case 'issues':
      if (hook.issue === false) {
        return
      } else {
        helper.slackNotification(req, url)
      }
    case 'issue_comment':
      if (hook.comment === false) {
        return
      } else {
        helper.slackNotification(req, url)
      }
    default:
      break;
  }
  res.status(200).send('Payload ok')
})


router.post('/settings', authCheck, async (req, res) => {
  try {
    console.log('Here 1')

    const { org } = req.body.data
    console.log('Here 2')

    const { id } = getProfileInformation()
    console.log('Here 3')

    const findHook = await Hook.find({ git_id: id, organization: org })
    console.log('Here 4')

    res.send(findHook)
  } catch (error) {

  }
})

router.put('/settings', async (req, res) => {
  const { id } = getProfileInformation()
  const { type, state, org } = req.body.data

  const findHook = await Hook.findOne({ git_id: id, organization: org })
    .catch(err => console.log('PUT settings ', err))

  const query = {}
  query[type] = state   // Apparently When I do {type: state}, the key is the string 'type' and not the value of the variable name

  if (findHook !== null) {
    var toggle = await Hook.updateOne({ '_id': findHook._id }, { $set: query })
  }
  res.send('Done with settings')
})

module.exports = router
