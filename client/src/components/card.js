import React, { useContext, useState, useEffect } from 'react'
import OrgsProvider from '../contexts/OrgsProvider'
// import _ from 'lodash'



const Card = () => {

    const userOrganizations = useContext(OrgsProvider.contexto)
    let count = 0

    const iterateOrganizations = () => {
        Object.entries(userOrganizations).map(([key, value]) => console.log(userOrganizations[key].login))
    }


    return (
        <div>
            <div className='card' style={{ width: '18rem' }}>
                <div className='card-header'>
                    Organizations: 
                </div>
                <ul className='list-group list-group-flush' key={count++}>
                    {
                        Object.entries(userOrganizations).map(([key, value]) => {
                            return(
                            <li className='list-group-item' key={userOrganizations[key].login}><a target='_blank' href={userOrganizations[key].url}>{userOrganizations[key].login}</a></li>
                            )
                        })
                    }
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