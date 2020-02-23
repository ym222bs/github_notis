import Card from './card'
import React, { useContext } from 'react'
import UserProvider from '../../contexts/UserProvider.jsx'
import _ from 'lodash'

const loginMsg = 'You have to log in to see info!'
const description = 'Your notofication app for the good old GitHub..'

const Profile = () => {
  const userData = useContext(UserProvider.context)
  const { name, login, id, avatar_url } = userData
  const text = _.isEmpty(userData) ? loginMsg : 'Explore Your Orgs'
  const image = !_.isEmpty(userData) ? avatar_url : 'Image'

  return (
    <div className='jumbotron container mt-5'>
      <h2 className='display-4'>{text}</h2>
      {!_.isEmpty(userData) &&
        <div className='lead'>
          {description}
          <hr className='my-4' />

          <img className='child' style={{ width: '18rem' }} src={image} />
          <Card />
        </div>
      }
      <div style={{ marginBottom: 20 }} />
    </div>

  )
}


export default Profile