import React, { useContext, useState, useEffect } from 'react'
import OrgsProvider from '../contexts/OrgsProvider'
// import _ from 'lodash'



const Card = () => {
    // const orgs = useContext(OrgsProvider.context)
    // console.log('ooorgs', orgs)
    // const [orgs, setOrgs] = useState('')
    let count = 0
    const userOrganizations = useContext(OrgsProvider.contexto)

    // console.log('organizations: ', Array.isArray(userOrganizations))
    // userOrganizations.map(x => console.log(x))
    const iterateOrganizations = () => {

    }
    Object.entries(userOrganizations).map(([key, value]) => console.log(userOrganizations[key].login))

    return (
        <div>
            <div className='card' style={{ width: '18rem' }}>
                <div className='card-header'>
                    Featured
                </div>
                <ul className='list-group list-group-flush' key={count++}>
                </ul>
            </div>
            <div style={{ marginBottom: 20 }} />
        </div>
    )
}
// {
//                                 Object.entries(userOrganizations).map( ([keys, value]) => {
//                                     return (
//                                         <li className='list-group-item' key={count++}>{keys}: {value}</li>
//                                     )
//                                 })
//                             }
// {
//         Object.entries(userOrganizations).map( [key, value] (
//             return (
//                 <li className='list-group-item' key={count++}>{keys}: {value}</li>
//             )
//         ))
// }

export default Card