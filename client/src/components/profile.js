import Card from './card'
import React, { useContext } from 'react'
import UserProvider from '../contexts/UserProvider'
import _ from 'lodash'

const LoginMsg = 'You have to log in to see info!'

const Profile = () => {
    // const [selected, setSelected] = useState('All')
    const userData = useContext(UserProvider.context)
    // console.log('usaaaaaaaa', userData)

    const { displayName, username } = userData
    let count = 0
    let num = 10
    // console.log(displayName)

    // Object.keys(userData).map((item, index)=> console.log(item.id))

    Object.values(userData).map(x => console.log(x))
    const img = 'empty'
    const text = _.isEmpty(userData) ? LoginMsg : 'Explore Your Orgs'
    const image = _.isEmpty(userData) ? img : 'Image'
    // render keys from ibject
    // const options = Object.keys(userData).filter(key => {
    //     return userData[key] !== null
    // })

    return (
        <div className='jumbotron container mt-5'>
            <div className='d-flex justify-content-between'>

                <h2 className='display-4'>{text}</h2>
                <div>{image}</div>
            </div>
            {!_.isEmpty(userData) &&

                <div className='lead'>
                    <ul className='nav ' key={count++}>
                        <li className='nav-item'>
                            <a className='nav-link' href='/profile'>{count}Active</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='#'>{count}Link</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='#'>{count}Link</a>
                        </li>
                    </ul>
                    <hr className='my-4' />
                    <Card />
                    {
                        Object.entries(userData).map(function ([key, value]) {
                            return (
                                <div key={count++}>{`${count++}:${value}`}</div>
                            )
                        })
                    }
                </div>
            }
            <div style={{ marginBottom: 20 }} />
        </div>

    )
}

export default Profile