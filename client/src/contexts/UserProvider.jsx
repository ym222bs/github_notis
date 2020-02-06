import React, { createContext, useState, useEffect } from 'react'
const context = createContext(null)

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        async function fetchData() {
            const userObject = await fetch('/user')
            const jsonObject = await userObject.json()
            setUser(jsonObject)
            console.log('userObject: ', userObject)
            console.log('jsonObject: ', jsonObject)
        }
        fetchData()
    }, []) // Empty array forces useEffect to only run Once when the component is mounted

    return (
        <context.Provider value={user}>
            {children}
        </context.Provider>
    )
}

UserProvider.context = context
export default UserProvider