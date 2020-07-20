import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CreateWebhook = ({ hookUrl, org }) => {
  const [webhook, setWebhook] = useState('')
  const [success, setSuccess] = useState('')



  const fetchData = async (e) => {
    e.preventDefault()
    if (webhook === '') {
      setSuccess('bad')
    } else {
      const url = 'gitprofile/webhook'
      const propertyData = await axios.post(url, {
        data: {
          githubUrl: hookUrl,
          orgname: org,
          webhook: webhook
        },
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if (propertyData.status === 201) {
        setSuccess('good')
      }
    }
  }


  useEffect(() => {
    const timer = setTimeout(() => setSuccess(''), 4000)
    return () => clearTimeout(timer)
  }, [success])


  return (
    <>
      {
        success !== '' &&
        <SuccessAlert validation={success} />
      }
      <div
        className='container'
        style={{
          backgroundColor: 'white',
          padding: '20px',
          fontSize: '15px'
        }}>
        Create your webhook on this Organization and receive events to your Slack.<br />
        Input your slack hook key:
        <form onSubmit={fetchData}>
          <div className='form-group'>
            <input
              className='form-control'
              onFocus={(e) => e.target.placeholder = ''}
              onChange={e => setWebhook(e.target.value)}
              placeholder='e.g. TUCNGMA2Y/BUM57BJEA/d7LMEPXoqbsGNVX43xk6Sarq'
              style={{ fontSize: '12px' }}>
            </input>
            <button
              className='btn btn-info'
              type='submit'
              style={{ marginTop: '1rem', float: 'right' }}
            >
              Create Webhook
          </button>
          </div>
        </form>
        <div style={{ marginTop: '5rem' }}>
          If you are unsure on how to create a Slack webhook key, check out the docs
        <a
            target='_blank'
            href='https://slack.com/intl/en-se/help/articles/115005265063-Incoming-Webhooks-for-Slack'
            rel='noopener noreferrer'> here
        </a>.
      </div>
      </div >
    </>
  )
}

const SuccessAlert = ({ validation }) => {
  switch (validation) {
    case 'good':
      return (
        <div className="alert alert-success" role="alert">
          New webhook was created !
        </div>
      )
      break;
    case 'bad':
      return (
        <div className="alert alert-warning" role="alert">
          The field is empty
        </div>
      )
      break;
  }
}

export default CreateWebhook