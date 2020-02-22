import React, { useContext } from 'react'
import UserProvider from '../contexts/UserProvider'
import _ from 'lodash'



const Menu = () => {
    const userData = useContext(UserProvider.context)
    // !_.isEmpty(userData) ? _.find(data, d => d.id === userData.provider) : {}

    return (
        <div className='jumbotron'>
            {
                !_.isEmpty(userData) &&
                <a className='btn-primary' href={'/auth/logout'} title='Logout' style={{ float: 'right' }}>
                </a>
            }

        </div>
    )
}


export default Menu