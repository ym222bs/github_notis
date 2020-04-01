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


router.get('/', (req, res, next) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
  res.status(200).send(req.user)
})

router.get('/getevents', async (req, res, next) => {
  const allEvents = await helper.getAllOrganizationEvents()
  res.status(200).send({ ...allEvents })
})


router.get('/orgs', authCheck, async (req, res, next) => {
  const orgs = await helper.getOrganizationsFromGithub(req)
  res.status(200).send({ ...orgs })
})


router.post('/events', authCheck, async (req, res, next) => {
  const { githubUrl } = req.body.data
  const data = await helper.getOrganizationPropertyContent(githubUrl)
  res.status(200).send({ ...data })
})


router.post('/repos', authCheck, async (req, res, next) => {
  const { githubUrl } = req.body.data
  const data = await helper.getOrganizationPropertyContent(githubUrl)
  res.status(200).send({ ...data })
})


router.get('/webhook', authCheck, async (req, res, next) => {
  try {
    const { id } = getProfileInformation()
    const webhooks = await Hook.find({ git_id: id }).select('-_id')
    return res.status(200).send({ webhooks })
  } catch (err) {
    next(err)
  }
})


router.post('/webhook', authCheck, async (req, res, next) => {
  try {
    const { githubUrl, orgname, webhook } = req.body.data
    const { login, id } = getProfileInformation()
    const githubUserToken = getUserToken()

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
    next(err)
  }
})

// need to be posting without auth here, only Github validation 
// will save this route.
router.post('/payload', async (req, res, next) => {
  try {
    console.log(req.body)
    const typeOfEvent = req.headers['x-github-event']
    const org = req.body.organization.login
    const sender = req.body.sender.id
    const hook = await Hook.findOne({ git_id: sender, organization: org })
      .catch(err => console.log('POST payload ', err))

    const slackHookKey = hook.webhook
    const url = `https://hooks.slack.com/services/${slackHookKey}`

    helper.evaluateSettings(typeOfEvent, hook, req, url)

    res.status(200).send('Payload ok')
  } catch (err) {
    next(err)
  }
})


router.post('/settings', authCheck, async (req, res, next) => {
  try {
    const { org } = req.body.data
    const { id } = getProfileInformation()
    const findHook = await Hook.find({ git_id: id, organization: org })
    res.send(findHook)
  } catch (err) {
    next(err)
  }
})

router.put('/settings', async (req, res, next) => {
  try {
    const { id } = getProfileInformation()
    const { type, state, org } = req.body.data
    const findHook = await Hook.findOne({ git_id: id, organization: org })
      .catch(err => console.log('PUT settings ', err))

    const query = {}
    query[type] = state   // Apparently When I do {type: state}, the key is the string 'type' and not the value of the variable name

    if (findHook !== null) {
      await Hook.updateOne({ '_id': findHook._id }, { $set: query })
    }
    res.send('Done with settings')
  } catch (err) {
    next(err)
  }
})

module.exports = router
