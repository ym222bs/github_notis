import React, { useContext, useState } from 'react'
import UserProvider from '../contexts/UserProvider'
import _ from 'lodash'

const LoginMsg = 'You have to log in to see info!'

const Profile = () => {
    const [selected, setSelected] = useState('All')
    const userData = useContext(UserProvider.context)

    const text = _.isEmpty(userData) ? LoginMsg : 'Explore Your Data'
    const options = Object.keys(userData).filter(key => {
        return userData[key] !== null
    })

    return (
        <div className='page'>
            <p className='page-title' style={{ textAlign: 'center' }}>
                {text}
            </p>

            <div style={{ marginBottom: 20 }} />
        </div>
    )
}

export default Profile