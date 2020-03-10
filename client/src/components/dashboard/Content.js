import React, { Fragment, useEffect, useContext, useState, useRef, createRef } from 'react'
import axios from 'axios'
import CardOfEvents from './CardOfEvents.js'
import CardOfRepos from './CardOfRepos.js'
import OrgsProvider from '../../contexts/OrgsProvider.jsx'


const Content = ({ avatar }) => {
  const [selectedOrg, setSelectedOrg] = useState(null)
  const [githubUrl, setGithubUrl] = useState(null)
  const [apiUrl, setApiUrl] = useState(null)
  const [event, setEvent] = useState(null)
  const [repo, setRepo] = useState(null)

  const userOrganizations = useContext(OrgsProvider.contexto)

  const cleanValue = () => {
    if (event !== null || repo !== null) {
      setEvent(null)
      setRepo(null)
    }
  }

  // Var is useful
  if (selectedOrg) {
    var { events_url, repos_url, hooks_url } = selectedOrg
  }


  const handleNavOption = (type) => {
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
        setGithubUrl(hooks_url)
        setApiUrl('webhook')
        break
      default:
        return null
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      const api = `gitprofile/${apiUrl}`
      const propertyData = await axios.post(api, {
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
  }, [githubUrl || apiUrl])


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
                    href='#'
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
                    href='#'
                    className='nav-link btn btn-link'
                    onClick={() => handleNavOption('events')}

                  >
                    Events
						      </a>
                  <a
                    href='#'
                    className='nav-link btn btn-link'
                    onClick={() => handleNavOption('repos')}
                  >
                    Repos
						      </a>
                  <a
                    href='#'
                    className='nav-link btn btn-link'
                    onClick={() => handleNavOption('hook')}
                  >
                    Create Hook
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
              </div>
            </div>
          }
        </>
      </div>
    </Fragment>
  )
}


export default Content