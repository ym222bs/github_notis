import React, { Link, useContext, useState, useEffect } from 'react'
import OrgsProvider from '../../contexts/OrgsProvider.jsx'
import PropertiesNav from './information.js'
// import _ from 'lodash'






// TODO: next step: 

//      Render data when clicking on navigation. Get the buttons/links from organizationObject
//      Example: Repos => fetch Repos render in card/list/table
//      Example: Events => fetch events render in card/list/table
//      Example: Webhook => fetch Webhook render in card/list/table, get current hooks from MOngo, on user?
const Card = () => {
    const [ selectedOrg, setSelectedOrg ] = useState('')
    const userOrganizations = useContext(OrgsProvider.contexto)

    console.log(userOrganizations)
    let count = 0

    const iterateOrganizations = () => {
        Object.entries(userOrganizations).map(([key, value]) => console.log(userOrganizations[key].login))
    }


    //href={userOrganizations[key].url}
    const properties = Object.keys(userOrganizations).map(key => {
        return userOrganizations[key]
    })
    console.log(properties)
    console.log(selectedOrg)

    return (
        <div>
            <div className='card' style={{ width: '18rem' }}>
                <div className='card-header'>
                    Organizations:
                </div>
                <ul className='list-group list-group-flush' key={count++}>
                    {
                        Object.entries(userOrganizations).map(([key, value]) => {
                            return (
                                <li className='list-group-item' key={userOrganizations[key].login}>


                                    <div  className='btn btn-outline-info'  style={{}} key={userOrganizations[key].login} onClick={() => setSelectedOrg(userOrganizations[key].login)}>
                                        <img style={{ width: '2rem', marginRight: '5px' }} src={userOrganizations[key].avatar_url} />
                                        {userOrganizations[key].login}
                                    </div >

                                </li>
                            )
                        })
                    }
                </ul>
                {/* <PropertiesNav options={properties}
                    option={selectedOrg}
                /> */}
            </div>
            <div style={{ marginBottom: 20 }} />
        </div>
    )
}


export default Card