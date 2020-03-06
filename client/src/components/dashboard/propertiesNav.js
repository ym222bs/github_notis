import React, { Fragment, useEffect, useState, useImperativeHandle } from 'react'
import CardOfEvents from './cardOfEvents.js'
import CardOfRepos from './cardOfRepos.js'
import axios from 'axios'
import { set } from 'mongoose'

//  Option === Specific Organization
const PropertiesNav = ({ option }) => {
  const [githubUrl, setGithubUrl] = useState(null)
  const [apiUrl, setApiUrl] = useState(null)
  const [event, setEvent] = useState(null)
  const [repo, setRepo] = useState(null)


  const handleChangedVariable = () => {
    // antingen när option.login changes eller DIV OnChange changes.
    setEvent(null)
    setRepo(null)
    console.log('Null on states')
  }


  const { events_url, repos_url, hooks_url } = option

  // Set option:
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

    // Get option data:  
    const fetchData = async () => {
      const api = `gitprofile/${apiUrl}`
      const propertyData = await axios.post(api, {
        data: {
          githubUrl: githubUrl,
          orgname: option.login
        },
        headers: {
          'Content-Type': 'application/json'
        },
      })
      apiUrl === 'events' ? await setEvent(propertyData.data) : await setRepo(propertyData.data)
    }

    fetchData()

  }, [githubUrl || apiUrl])

  // useEffect(() => {
  //   setEvent(null)
  //   setRepo(null)
  // }, [])


  return (
    <Fragment>
      <div className='flex-container'>
        <ul className='navbar navbar-expand-sm'>
          <li className='navbar-nav'>
            <div
              onClick={handleChangedVariable}
              className='nav-link'
              style={{ color: '#17a2b8' }}>
              {option.login}

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
    </Fragment>
  )
}



export default PropertiesNav