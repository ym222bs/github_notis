import React, { useContext, useState } from 'react'
import UserProvider from '../contexts/UserProvider'
import _ from 'lodash'



const Card = () => {

    const userData = useContext(UserProvider.context)
    // console.log(userData)
    // Object.keys(userData).map((item, index)=> console.log(item.id))

    // Object.values(userData).map(x => console.log(x))

    // render keys from ibject
    // const options = Object.keys(userData).filter(key => {
    //     return userData[key] !== null
    // })

    return (
        <div>
            <div className='card' style={{width: '18rem;'}}>
                <div className='card-header'>
                    Featured
                </div>
                <ul className='list-group list-group-flush'>
                    {
                        Object.values(userData).map((item, index) =>
                            <li className='list-group-item' key={index}>
                                {item.id}
                                {item.login}
                            </li>
                        )
                    }
                </ul>
            </div>
            <div style={{ marginBottom: 20 }} />
        </div>

    )
}

export default Card