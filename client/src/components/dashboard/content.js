import React, { Fragment, useEffect, useContext, useState } from 'react'
import axios from 'axios'
import CardOfEvents from './cardOfEvents.js'
import CardOfRepos from './cardOfRepos.js'
import CreateWebhook from './createWebhook.js'
import OrgsProvider from '../../contexts/OrgsProvider.jsx'
import Settings from './settings.js'


const Content = ({ avatar }) => {
  const [selectedOrg, setSelectedOrg] = useState(null)
  const [githubUrl, setGithubUrl] = useState(null)
  const [apiUrl, setApiUrl] = useState(null)
  const [settings, setSettings] = useState(null)
  const [webhook, setWebhook] = useState(null)
  const [webhooks, setWebhooks] = useState(null)
  const [event, setEvent] = useState(null)
  const [repo, setRepo] = useState(null)
  const [controller, setController] = useState(null)
  const userOrganizations = useContext(OrgsProvider.context)


  const cleanValue = () => {
    if (
      event !== null ||
      repo !== null ||
      settings !== null ||
      webhook !== null
    ) {
      setSettings(null)
      setWebhook(null)
      setWebhooks(null)
      setEvent(null)
      setRepo(null)
    }
  }

  if (selectedOrg) {
    var { events_url, repos_url, hooks_url } = selectedOrg
  }

  const handleNavOption = (type) => {
    switch (type) {
      case 'events':
        setGithubUrl(events_url)
        setApiUrl('events')
        setController('events')
        break
      case 'repos':
        setGithubUrl(repos_url)
        setApiUrl('repos')
        setController('repos')
        break
      case 'hook':
        setApiUrl('webhook')
        setController('hook')
        fetchWebhooks()
        break
      case 'settings':
        setController('settings')
        fetchSettings()
        break
      default:
        return null
    }
  }

  // Simply request data based on selected menu button
  useEffect(() => {
    const fetchData = async () => {
      const url = `gitprofile/${apiUrl}`
      const propertyData = await axios.post(url, {
        data: {
          githubUrl: githubUrl,
          orgname: selectedOrg
            ? selectedOrg.login
            : null,
        },
        headers: {
          'Content-Type': 'application/json'
        },
      })
      console.log('PROPERTYDATA: ', propertyData.data)
      apiUrl === 'events' ?
        await setEvent(propertyData.data) :
        await setRepo(propertyData.data)
    }
    fetchData()
  }, [githubUrl])

  const fetchSettings = async () => {
    const url = '/gitprofile/settings'
    const settingsData = await axios.post(url, {
      data: {
        org: selectedOrg.login
      },
      headers: {
        'Content-Type': 'application/json'
      },
    }).catch(err => console.log('fetchSettings: ', err))
    await setSettings(settingsData.data)
  }

  // Fecth all webhooks and show them
  const fetchWebhooks = async () => {
    const url = '/gitprofile/webhook'
    const webhooks = await axios.get(url)
      .catch(err => console.log('fetchWebhooks: ', err))
    await setWebhooks(webhooks.data.webhooks)
  }

  // TODO: clean up this mess
  return (
    <Fragment>
      <div
        className='card'>
        <img
          alt='profile avatar'
          style={{ width: '18rem' }}
          src={avatar}
        />
        <div className='card-header'>
          Organizations:
        </div>
        <ul
          className='list-group list-group-flush'
          key='orgs-list'
        >
          {
            Object.keys(userOrganizations).map(key => {
              return (
                <li
                  onClick={cleanValue}
                  className='list-group-item'
                  key={userOrganizations[key].login}
                >
                  <a
                    href='#orgs'
                    className='card-link'
                    key={userOrganizations[key].login}
                    onClick={() => setSelectedOrg(userOrganizations[key])}
                  >
                    <img
                      alt='organization avatar'
                      style={{ width: '2rem', marginRight: '5px' }}
                      src={userOrganizations[key].avatar_url}
                    />
                    {userOrganizations[key].login}
                  </a >
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className='child'>
        <>
          {
            selectedOrg &&
            <div className='flex-container'>
              <ul className='navbar navbar-expand-sm'>
                <li className='navbar-nav'>
                  <div
                    className='nav-link'
                    style={{ color: '#17a2b8' }}>
                    {
                      selectedOrg &&
                      selectedOrg.login
                    }
                  </div>
                  <a
                    className='nav-link btn btn-link'
                    onClick={() => handleNavOption('events')}
                  >
                    Events
						      </a>
                  <a
                    className='nav-link btn btn-link'
                    onClick={() => handleNavOption('repos')}
                  >
                    Repos
						      </a>
                  <a
                    className='nav-link btn btn-link'
                    onClick={() => handleNavOption('hook')}
                  >
                    Webhooks
						      </a>
                  <a
                    className='nav-link btn btn-link'
                    onClick={() => handleNavOption('settings')}
                  >
                    Settings
						      </a>
                </li>
              </ul>
              <div>
                {
                  controller === 'events' && event &&
                  <CardOfEvents events={event} />
                }
                {
                  controller === 'repos' && repo &&
                  <CardOfRepos repos={repo} />
                }
                {
                  controller === 'hook' && webhooks &&
                  <>
                    <CreateWebhook hookUrl={hooks_url} org={selectedOrg.login} />
                    <WebhooksList webhookList={webhooks} />
                  </>
                }
                {
                  controller === 'settings' && settings &&
                  <Settings org={selectedOrg.login} settingsArray={settings} />
                }
              </div>
            </div>
          }
        </>
      </div>
    </Fragment>
  )
}


const WebhooksList = ({ webhooksList }) => {
  console.log(webhooksList)
  return (
    <div>
      Your current registered webhooks:
      {/* {webhooksList.} */}
    </div>
  )
}


export default Content