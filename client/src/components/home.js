import React, { useContext } from 'react'
import Mac from './mac'
import Profile from './profile'
import _ from 'lodash'

import UserProvider from '../contexts/UserProvider'
import Menu from './menu'

import githubIcon from '../github.png'

const data = {
    name: 'Github',
    img: githubIcon,
    href: 'auth/github',
    color: '#24292e'
}

const Home = () => {
    let curl = "$ curl -H 'Authorization: token ACCESS_TOKEN https://api.github.com/user"
    // const userData = useContext(UserProvider.context)
    return (
        <div>
            <div className='page' style={{ textAlign: 'center' }}>
                <p className='page-title'>
                    Github Notifications
                    </p>
                <p>
                    <span style={{ color: 'var(--primary-red)' }}>Login: </span>
                </p>
                <Mac userData={curl} selected='All' />
                <div className='card' style={{ border: `1xp solid`, borderRadius: 2 }} onClick={() => window.location = data.href}>
                    <div>
                        <p>{data.name}</p>
                    </div>
                    <div style={{ minHeight: 100, minWidth: 100, background: `url('${data.img}') no-repeat center center / 50% ${data.color}` }}></div>
                </div>
            </div>
        </div>

    )
}

export default Home