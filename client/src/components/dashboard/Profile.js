import React, { useContext } from 'react'
import _ from 'lodash'
import Content from './Content.js'
import UserProvider from '../../contexts/UserProvider.jsx'

const loginMsg = 'You have to log in to see info! 🤖 '
const description = 'Your notofication app for the good old GitHub..'

const Profile = () => {
    const userData = useContext(UserProvider.context)
    const { avatar_url } = userData
    const text = _.isEmpty(userData)
        ? loginMsg
        : 'Explore Your Organizations 😎 💬 '
    const image = !_.isEmpty(userData) ? avatar_url : 'Image'

    return (
        <div className='jumbotron container mt-5'>
            <h2 className='display-4'>{text}</h2>
            {_.isEmpty(userData) && (
                <a
                    className='btn btn-outline-dark'
                    href={'/'}
                    style={{ float: 'right' }}
                >
                    Login
                </a>
            )}
            {!_.isEmpty(userData) && (
                <>
                    <a
                        href={'/auth/logout'}
                        style={{ float: 'right' }}
                        className='btn btn-outline-dark'
                    >
                        Logout
                    </a>
                    <a
                        href={'/profile'}
                        style={{ float: 'right', marginRight: '5px' }}
                        className='btn btn-outline-info'
                    >
                        Home
                    </a>
                    <div className='lead'>
                        {description}

                        <hr
                            className='my-4'
                            style={{
                                backgroundColor: 'white',
                                height: 2,
                            }}
                        />

                        <div className='gridparent'>
                            <Content avatar={image} />
                        </div>
                    </div>

                    <div style={{ marginBottom: 20 }} />
                </>
            )}
        </div>
    )
}

export default Profile
