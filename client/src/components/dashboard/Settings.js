import React, { useState } from 'react'
import axios from 'axios'
import _ from 'lodash'

const Settings = ({ org, settingsArray }) => {
    if (!_.isEmpty(settingsArray)) {
        return (
            <SettingsComponent
                organization={org}
                settingsList={settingsArray}
            />
        )
    } else {
        return (
            <div
                className='container empty-message'
                style={{ padding: '20px', fontSize: '15px' }}
            >
                There is no webhook set on this organization yet. Once you have
                created a webhook then you will be able to manage your setting
                on that webhook here.
            </div>
        )
    }
}

const SettingsComponent = ({ organization, settingsList }) => {
    const [push, setPush] = useState(settingsList[0].push)
    const [repo, setRepo] = useState(settingsList[0].repo)
    const [issue, setIssue] = useState(settingsList[0].issue)
    const [comment, setComment] = useState(settingsList[0].comment)

    const toggle = (type) => {
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
        await axios
            .put('/gitprofile/settings', {
                data: {
                    type: event,
                    state: toggle,
                    org: organization,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .catch((err) => console.log('postSettings: ', err))
    }

    return (
        <div
            className='container'
            style={{ backgroundColor: 'white', padding: '20px' }}
        >
            <h5 onClick={() => toggle('push')}>
                <p className='event-type'>Get new 'Push' events?</p>
                <div className='toggle thumb'>
                    {push ? (
                        <span role='img' aria-label='thumb'>
                            Yes 👍
                        </span>
                    ) : (
                        <span role='img' aria-label='thumb'>
                            No 👎
                        </span>
                    )}
                </div>
            </h5>
            <h5 onClick={() => toggle('repo')}>
                <p className='event-type'>Get new 'Reposetory' events?</p>
                <div className='toggle thumb'>
                    {repo ? (
                        <span role='img' aria-label='thumb'>
                            Yes 👍
                        </span>
                    ) : (
                        <span role='img' aria-label='thumb'>
                            No 👎
                        </span>
                    )}
                </div>
            </h5>
            <h5 onClick={() => toggle('issue')}>
                <p className='event-type'>Get 'Issue' events?</p>
                <div className='toggle thumb'>
                    {issue ? (
                        <span role='img' aria-label='thumb'>
                            Yes 👍
                        </span>
                    ) : (
                        <span role='img' aria-label='thumb'>
                            No 👎
                        </span>
                    )}
                </div>
            </h5>
            <h5 onClick={() => toggle('comment')}>
                <p className='event-type'>Get 'Issue comment' events?</p>
                <div className='toggle thumb'>
                    {comment ? (
                        <span role='img' aria-label='thumb'>
                            Yes 👍
                        </span>
                    ) : (
                        <span role='img' aria-label='thumb'>
                            No 👎
                        </span>
                    )}
                </div>
            </h5>
        </div>
    )
}

export default Settings
