import React, { createContext, useState, useEffect } from 'react'
const context = createContext(null)

const OrgsProvider = ({ children }) => {
    const [orgs, setOrgs] = useState([])

    useEffect(() => {
        async function fetchData() {
            const orgRequest = await fetch('/profile/orgs')
            const orgObject = await orgRequest.json()

            console.log('org: ', orgRequest)
            console.log('orgObject: ', orgObject)
            setOrgs(orgs)
        }
        fetchData()
    }, [])

    return (
        <context.Provider value={ orgs }>
            { children }
        </context.Provider>
    )
}


OrgsProvider.context = context
export default OrgsProvider