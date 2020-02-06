import React from 'react'
import Mac from './mac'
import Card from './card'
import Menu from './menu'

const Home = () => {
    let curl = "$ curl -H 'Authorization: token ACCESS_TOKEN https://api.github.com/user"
    return (
        <div className='page' style={{ textAlign: 'center' }}>
            <p className='page-title'>
                Github Notifications
            </p>
            <p>
                <span style={{ color: 'var(--primary-red)' }}>500+</span>
            </p>
            <Mac userData={curl} selected='All' />
            <Card />
        </div>
    )
}

export default Home