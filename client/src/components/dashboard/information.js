// Component to render data from selected Organizations
import React, { useContext, useState, useEffect } from 'react'
import OrgsProvider from '../../contexts/OrgsProvider.jsx'



// TODO: properties should be passed down as a prop to this component and then rendered from Card
// in basically the same way as the names but in a new div

const PropertiesNav = ({ options, option }) => {
    console.log(option)
    console.log(options)
   
    // const iterateOrganizations = () => {
    //     Object.entries(userOrganizations).map(([key, value]) => console.log(userOrganizations[key].login))
    // }

    return (
        <div>
            <ul className='nav justify-content-center' style={{ marginLeft: '40px' }} >

                <li className='nav-item'>
                    <a className='nav-link' href='/profile'>{option}</a>
                </li>
            </ul>
        </div>
    )
}


export default PropertiesNav