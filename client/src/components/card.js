import React, { useContext, useState, useEffect } from 'react'
import OrgsProvider from '../contexts/OrgsProvider'
// import _ from 'lodash'



const Card = () => {
    // const orgs = useContext(OrgsProvider.context)
    // console.log('ooorgs', orgs)
    const [orgs, setOrgs] = useState('')
    let count = 0

    useEffect(() => {
        const fetchData = async () => {
            const orgRequest = await fetch('/profile/orgs').catch(err => console.log(err.message))
            const orgObject = await orgRequest.json()

            console.log('org: ', orgRequest)
            console.log('orgObjecdssssst: ', orgObject)
            setOrgs(orgs)
        }
        fetchData()
    }, [])

    return (
        <div>
            <div className='card' style={{ width: '18rem' }}>
                <div className='card-header'>
                    Featured
                </div>
                <ul className='list-group list-group-flush' key={count++}>
                    {
                        Object.entries(orgs).map(function ([keys, value]) {
                            return (
                            <li className='list-group-item'key={count++}>{keys}: {value}</li>
                            )
                        })
                    }
                </ul>
            </div>
            <div style={{ marginBottom: 20 }} />
        </div>
    )
}

export default Card