import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserProvider from '../contexts/UserProvider'
import _ from 'lodash'
import githubLogo from '../github.png'



const Menu = () => {
    const userData = useContext(UserProvider.context)
    // Only if there is options of login typeStrategies
    // TODO: remove this possibly
    const loginType = true
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