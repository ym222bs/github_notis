import React, { Fragment, useEffect, useContext, useState } from 'react'
import axios from 'axios'
import CardOfEvents from './cardOfEvents.js'
import CardOfRepos from './cardOfRepos.js'
import Settings from './settings.js'
import OrgsProvider from '../../contexts/OrgsProvider.jsx'
// import SettingsProvider from '../../contexts/SettingsProvider.jsx'


const Content = ({ avatar }) => {
  const [selectedOrg, setSelectedOrg] = useState(null)
  const [githubUrl, setGithubUrl] = useState(null)
  const [settings, setSettings] = useState(null)
  const [apiUrl, setApiUrl] = useState(null)
  const [event, setEvent] = useState(null)
  const [repo, setRepo] = useState(null)

  const userOrganizations = useContext(OrgsProvider.context)
  // const userSettings = useContext(SettingsProvider.context)

  // TODO: add all the other things WEBHOOK and Settings
  const cleanValue = () => {
    if (
      event !== null
      || repo !== null
      || settings !== null
    ) {
      setEvent(null)
      setRepo(null)
      setSettings(null)
    }
  }

  // Var is useful
  if (selectedOrg) {
    var { events_url, repos_url, hooks_url } = selectedOrg
  }


  const handleNavOption = (type) => {
    switch (type) {
      case 'events':
        setSettings(null)
        setGithubUrl(events_url)
        setApiUrl('events')
        break
      case 'repos':
        setSettings(null)
        setGithubUrl(repos_url)
        setApiUrl('repos')
        break
      case 'hook':
        setSettings(null)
        setGithubUrl(hooks_url)
        setApiUrl('webhook')
        break
      case 'settings':
        fetchSettings()
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
          orgname: selectedOrg ?
            selectedOrg.login :
            null
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
    // if (selectedOrg !== null) {
    const url = '/gitprofile/settings'
    const settingsData = await axios.post(url, {
      data: {
        org: selectedOrg.login
      },
      headers: {
        'Content-Type': 'application/json'
      },
    })
    console.log('Ok from eventToggle: ', settingsData)
    await setSettings(settingsData.data)
    // }
  }


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
                  <CardOfRepos events={repo} />
                }
                {
                  settings &&
                  <Settings organization={selectedOrg.login} settingsList={settings} />
                }
              </div>
            </div>
          }
        </>
      </div>
    </Fragment>
  )
}


export default Content