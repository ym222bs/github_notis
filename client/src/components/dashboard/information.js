// Component to render data from selected Organizations
import React, { useContext, useState, useEffect } from 'react'
import OrgsProvider from '../../contexts/OrgsProvider'
// import _ from 'lodash'


// TODO: properties should be passed down as a prop to this component and then rendered from Card
// in basically the same way as the names but in a new div

const Properties = () => {

    const userOrganizations = useContext(OrgsProvider.contexto)
    console.log(userOrganizations)
    let count = 0

    const iterateOrganizations = () => {
        Object.entries(userOrganizations).map(([key, value]) => console.log(userOrganizations[key].login))
    }

    return (
        <div>
            <div className='blalalalala' style={{ width: '18rem' }}>
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


export default Properties