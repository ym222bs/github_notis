import React, { Fragment, useEffect, useState } from 'react'
import CardOfEvents from './cardOfEvents.js'
import axios from 'axios'

//  Option === Specific Organization
const PropertiesNav = ({ option }) => {
  const [githubUrl, setGithubUrl] = useState(null)
  const [apiUrl, setApiUrl] = useState(null)
  const [property, setProperty] = useState(null)

  console.log('property inside Nav: ', property)

  const { events_url, repos_url, hooks_url } = option


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
    }
  }

  // Create new webhook by sending hookUrl to server
  const requestData = async () => {
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
    // console.log('Property shit:', propertyData.data)
    setProperty(propertyData.data)
  }


  useEffect(() => {
    requestData()
  }, [githubUrl || apiUrl])


  return (
    <Fragment>
      <div className='flex-container'>
        <ul className='navbar navbar-expand-sm'>
          <li className='navbar-nav'>
            <div
              className='nav-link'
              style={{ color: '#17a2b8' }}>
              {option.login}
            </div>
            <a
              className='nav-link btn btn-link'
              onClick={() => handleNavOption('events')}
              onMouseDown={() => requestData()}
            >
              Events
						</a>
            <a
              className='nav-link btn btn-link'
              onClick={() => handleNavOption('repos')}
              onMouseDown={() => requestData()}
            >
              Repos
						</a>
            <a
              className='nav-link btn btn-link'
              onClick={() => handleNavOption('hook')}

            >
              Create Hook
						</a>
          </li>
        </ul>
        <div>
          {
            property &&
            <CardOfEvents events={property} />
          }
        </div>
      </div>
    </Fragment>
  )
}



export default PropertiesNav