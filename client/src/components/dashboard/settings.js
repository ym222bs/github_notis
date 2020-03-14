import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Settings({ organization, settingsList }) {
  const [push, setPush] = useState(settingsList[0].push)
  const [repo, setRepo] = useState(settingsList[0].repo)
  const [issue, setIssue] = useState(settingsList[0].issue)
  const [comment, setComment] = useState(settingsList[0].comment)
  const [oldSettings, setOldSettings] = useState(false)
  console.log('UserSettings: ', settingsList)

  const setting = settingsList[0]

  // Set settingsslsist

  const toggle = (type) => {
    console.log(type)
    switch (type) {
      case 'push':
        setPush(!push)
        postSetting('push', !push)
        break
      case 'repo':
        setRepo(!repo)
        postSetting('repo', !repo)
        break
      case 'issue':
        setIssue(!issue)
        postSetting('issue', !issue)
        break
      case 'comment':
        setComment(!comment)
        postSetting('comment', !comment)
        break
      default:
        return null
    }
  }

  const postSetting = async (event, toggle) => {
    console.log(organization)
    const response = await axios.put('/gitprofile/settings', {
      data: {
        type: event,
        state: toggle,
        org: organization
      },
      headers: {
        'Content-Type': 'application/json'
      },
    })
    console.log('Ok from eventToggle: ', response)
  }


  return (
    <div className='container'>
      <h5 onClick={() => toggle('push')}>
        <p className='element1'>Get new 'Push' events?</p>
        <div className='toggle element2'>
          {push
            ? <span role="img" aria-label="thumb">Yes 👍</span>
            : <span role="img" aria-label="thumb">No 👎</span>
          }
        </div>
      </h5>
      <h5 onClick={() => toggle('repo')}>
        <p className='element1'>Get new 'Reposetory' events?</p>
        <div className='toggle element2'>
          {repo
            ? <span role="img" aria-label="thumb">Yes 👍</span>
            : <span role="img" aria-label="thumb">No 👎</span>
          }
        </div>
      </h5>
      <h5 onClick={() => toggle('issue')}>
        <p className='element1'>Get 'Issue' events?</p>
        <div className='toggle element2'>
          {issue
            ? <span role="img" aria-label="thumb">Yes 👍</span>
            : <span role="img" aria-label="thumb">No 👎</span>
          }
        </div>
      </h5>
      <h5 onClick={() => toggle('comment')}>
        <p className='element1'>Get 'Issue comment' events?</p>
        <div className='toggle element2'>
          {comment
            ? <span role="img" aria-label="thumb">Yes 👍</span>
            : <span role="img" aria-label="thumb">No 👎</span>
          }
        </div>
      </h5>
    </div>
  )
}


export default Settings



