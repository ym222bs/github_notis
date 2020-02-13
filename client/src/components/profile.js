import React, { useContext, useState } from 'react'
import UserProvider from '../contexts/UserProvider'
import _ from 'lodash'

const LoginMsg = 'You have to log in to see info!'

const Profile = () => {
    const [selected, setSelected] = useState('All')
    const userData = useContext(UserProvider.context)
    // console.log(userData)
    // Object.keys(userData).map((item, index)=> console.log(item.id))

    // Object.values(userData).map(x => console.log(x))

    const text = _.isEmpty(userData) ? LoginMsg : 'Explore Your Data'
    // render keys from ibject
    // const options = Object.keys(userData).filter(key => {
    //     return userData[key] !== null
    // })

    return (
        <div className='container m-5'>

            <div className='jumbotron'>
                <h1 className='display-4'>{text}</h1>
                <div className='lead' style={{ textAlign: 'center' }}>

                </div>
                <hr className='my-4' />
                {
                    Object.values(userData).map((item, index) =>
                        <div key={index}>
                            {item.id}
                            {item.login}
                        </div>
                    )
                }

                <div style={{ marginBottom: 20 }} />
            </div>
        </div>

    )
}

export default Profile