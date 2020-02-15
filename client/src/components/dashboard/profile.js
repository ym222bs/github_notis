import Card from './card'
import React, { useContext } from 'react'
import UserProvider from '../../contexts/UserProvider.jsx'
import _ from 'lodash'

const LoginMsg = 'You have to log in to see info!'

const Profile = () => {
    const userData = useContext(UserProvider.context)
    console.log('usertftft', userData)
    const { displayName, username, id, avatar_url } = userData
    let count = 0
    console.log(avatar_url)

    // Object.keys(userData).map((item, index)=> console.log(item.id))
    // Object.values(userData).map(x => console.log(x))
    const imgUrl = avatar_url
    const text = _.isEmpty(userData) ? LoginMsg : 'Explore Your Orgs'
    const image = !_.isEmpty(userData) ? avatar_url : 'Image'
    console.log(image)
    // render keys from ibject
    // const options = Object.keys(userData).filter(key => {
    //     return userData[key] !== null
    // })



    // TODO: handle click events for getting data from ORGANIZATION on NAV links
    return (
        <div className='jumbotron container mt-5'>
            <div className='d-flex justify-content-between'>

                <h2 className='display-4'>{text}</h2>

            </div>
            {!_.isEmpty(userData) &&

                <div className='lead'>
                    Your notofication app for the good old GitHub..
                    <hr className='my-4' />
                    <div className='flex'>

                  
                    <img className='child' style={{ width: '18rem' }} src={image} />
                    <ul className='nav justify-content-center' style={{marginLeft: '40px'}} key={count++}>
                        <li className='nav-item'>
                            <a className='nav-link' href='/profile'>Active</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='#'>Link</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='#'>Link</a>
                        </li>
                    </ul>
                    </div>
                    <Card />
                    <p>{displayName}</p>
                    <p>{username}</p>
                    <p>{id}</p>
                </div>
            }
            <div style={{ marginBottom: 20 }} />
        </div>

    )
}

// {
//     Object.entries(userData).map(function ([key, value]) {
//         return (
//             <div key={count++}>{`${count++}:${value}`}</div>
//         )
//     })
// }

export default Profile