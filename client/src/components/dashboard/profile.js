import Card from './card'
import React, { useContext, useState } from 'react'
import UserProvider from '../../contexts/UserProvider.jsx'
import OrgsProvider from '../../contexts/OrgsProvider.jsx'
import PropertiesNav from './propertiesNav.js'
import _ from 'lodash'

const loginMsg = 'You have to log in to see info!'
const description = 'Your notofication app for the good old GitHub..'

const Profile = () => {
    // Profile:
    const userData = useContext(UserProvider.context)
    const { name, login, id, avatar_url } = userData
    const text = _.isEmpty(userData) ? loginMsg : 'Explore Your Orgs'
    const image = !_.isEmpty(userData) ? avatar_url : 'Image'
    //


    // Card:
    const [selectedOrg, setSelectedOrg] = useState('')
    const userOrganizations = useContext(OrgsProvider.contexto)
    let count = 0
    const properties = Object.keys(userOrganizations).map(key => {
        return userOrganizations[key]
    })
    console.log(properties)
    console.log(selectedOrg)
    // 

    return (
        <div className='jumbotron container mt-5'>
            <h2 className='display-4'>{text}</h2>
            <div className='lead'>
                {description}
                <hr className='my-4' />

                <div className='gridparent'>

                    <div className='card'>
                        <img style={{ width: '18rem' }} src={image} />
                        <div className='card-header'>
                            Organizations:
                        </div>
                        <ul className='list-group list-group-flush' key={count++}>
                            {
                                Object.entries(userOrganizations).map(([key, value]) => {
                                    return (
                                        <li className='list-group-item' key={userOrganizations[key].login}>

                                            <div className='btn btn-outline-info'

                                                key={userOrganizations[key].login}

                                                onClick={() => setSelectedOrg(userOrganizations[key])}>

                                                <img style={{ width: '2rem', marginRight: '5px' }}
                                                    src={userOrganizations[key].avatar_url} />

                                                {userOrganizations[key].login}

                                            </div >
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className='child'>
                        <PropertiesNav option={selectedOrg} />
                    </div>
                </div>

            </div>
            <div style={{ marginBottom: 20 }} />
        </div>

    )
}


export default Profile