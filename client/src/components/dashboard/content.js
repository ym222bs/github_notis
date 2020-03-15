import React, { Fragment, useEffect, useContext, useState } from 'react'
import axios from 'axios'
import _ from 'lodash'
import CardOfEvents from './cardOfEvents.js'
import CardOfRepos from './cardOfRepos.js'
import Settings from './settings.js'
import OrgsProvider from '../../contexts/OrgsProvider.jsx'


const Content = ({ avatar }) => {
  const [selectedOrg, setSelectedOrg] = useState(null)
  const [githubUrl, setGithubUrl] = useState(null)
  const [apiUrl, setApiUrl] = useState(null)
  const [settings, setSettings] = useState(null)
  const [controllString, setString] = useState(null)
  const [webhook, setWebhook] = useState(null)
  const [event, setEvent] = useState(null)
  const [repo, setRepo] = useState(null)

  const userOrganizations = useContext(OrgsProvider.context)


  // TODO: add all the other things WEBHOOK and Settings
  const cleanValue = () => {
    if (
      event !== null ||
      repo !== null ||
      settings !== null ||
      webhook !== null
    ) {
      setEvent(null)
      setRepo(null)
      setSettings(null)
      setWebhook(null)
      setString(null)
    }
  }

  // Var is still useful
  if (selectedOrg) {
    var { events_url, repos_url, hooks_url } = selectedOrg
  }


  const handleNavOption = (type) => {
    // cleanValue()
    switch (type) {
      case 'events':
        setGithubUrl(events_url)
        setApiUrl('events')
        break
      case 'repos':
        setGithubUrl(repos_url)
        setApiUrl('repos')
        break
      case 'hook':
        // TODO: change here: add a function to fire of "createWebhook"
        setGithubUrl(hooks_url)
        setApiUrl('webhook')
        break
      case 'settings':
        fetchSettings()
        setString('settings')
        break
      default:
        return null
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      const url = `gitprofile/${apiUrl}`
      const propertyData = await axios.post(url, {
        data: {
          githubUrl: githubUrl,
          orgname: selectedOrg
            ? selectedOrg.login
            : null
        },
        headers: {
          'Content-Type': 'application/json'
        },
      })
      apiUrl === 'events' ?
        await setEvent(propertyData.data) :
        await setRepo(propertyData.data)
    }
    fetchData()
  }, [githubUrl, apiUrl])



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

  // TODO. clean up this mess
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
                  className='list-group-item'
                  key={userOrganizations[key].login}
                >
                  <a
                    onMouseDown={cleanValue}
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
                    href='#events'
                    className='nav-link btn btn-link'
                    onClick={() => handleNavOption('events')}

                  >
                    Events
						      </a>
                  <a
                    href='#repos'
                    className='nav-link btn btn-link'
                    onClick={() => handleNavOption('repos')}
                  >
                    Repos
						      </a>
                  <a
                    href='#hook'
                    className='nav-link btn btn-link'
                    onClick={() => handleNavOption('hook')}
                  >
                    Create Hook
						      </a>
                  <a
                    href='#settings'
                    className='nav-link btn btn-link'
                    onClick={() => handleNavOption('settings')}
                  >
                    Settings
						      </a>
                </li>
              </ul>
              <div>
                {
                  apiUrl === 'events' && event &&
                  <CardOfEvents events={event} />
                }
                {
                  apiUrl === 'repos' && repo &&
                  <CardOfRepos repos={repo} />
                }
                {
                  !_.isEmpty(settings)
                    ? <Settings organization={selectedOrg.login} settingsList={settings} />
                    : controllString
                      ? (
                        <div
                          className='container empty-message'
                          style={{ padding: '20px', fontSize: '15px' }}
                        >
                          There is no webhook set on this organization yet.
                        </div>
                      ) :
                      null
                }
              </div>

            </div>
          }
          <SlackWebhook />
        </>
      </div>
    </Fragment>
  )
}

const SlackWebhook = () => {
  return (
    <div>
      If you are unsure on how to create a Slack webhook key, check out the docs <a target='_blank' href='https://slack.com/intl/en-se/help/articles/115005265063-Incoming-Webhooks-for-Slack'>here</a>docs
    </div>
  )
}



export default Content