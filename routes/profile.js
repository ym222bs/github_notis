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
  console.log('fullUrl: ', fullUrl)
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
    const { id } = getProfileInformation()
    const webhooks = await Hook.find({ git_id: id }).select('-_id url organization username ')
    return res.status(200).send({ webhooks })
  } catch (err) {
    console.log('get /webhook: ', err)
  }
})


router.post('/webhook', authCheck, async (req, res, next) => {
  try {
    const { githubUrl, orgname } = req.body.data
    const { login, id } = getProfileInformation()
    const githubUserToken = getUserToken()

    // TODO: check if one userID has multiple Organization hooks (double query)
    const webhook = await Hook.findOne({ git_id: id })

    // Save to database if the hook does not exists yet
    if (!webhook) {
      const newHook = new Hook({
        url: githubUrl,
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


router.post('/payload', authCheck, async (req, res) => {
  console.log('CHECK PAYLOAD: ', req.body)
  helper.slackNotification(req)
  res.status(200).send('Payload ok')
})


router.post('/settings', authCheck, async (req, res) => {
  const { org } = req.body.data
  console.log(org)
  const { id } = getProfileInformation()
  const findHook = await Hook.find({ git_id: id, organization: org })

  res.send(findHook)
})

router.put('/settings', async (req, res) => {
  const { id } = getProfileInformation()
  const { type, state, org } = req.body.data
  console.log(typeof type)
  console.log(state)
  const findHook = await Hook.findOne({ git_id: id, organization: org })

  const query = {}
  query[type] = state   // Apparently When I do {type: state}, the key is the string 'type' and not the value of the variable name
  if (findHook !== null) {
    var toggle = await Hook.updateOne({ '_id': findHook._id }, { $set: query })
  }

  console.log('TOGGLE: ', toggle)
  res.send('Done')
})

module.exports = router
