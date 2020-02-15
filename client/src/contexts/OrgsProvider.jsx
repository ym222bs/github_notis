import React, { createContext, useState, useEffect } from 'react'
const contexto = createContext(null)

const OrgsProvider = ({ children }) => {
    const [orgs, setOrgs] = useState([])
    let array = []
    useEffect(() => {
      fetch('/profile/orgs')
          .then(res => res.json())
          .then(res => setOrgs(res))
          .catch(err => {
              console.log(err)
          })
    }, [])

    return (
        <contexto.Provider value={ orgs }>
            { children }
        </contexto.Provider>
    )
}

OrgsProvider.contexto = contexto
export default OrgsProvider