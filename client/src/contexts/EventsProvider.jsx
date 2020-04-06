import React, { createContext, useState, useEffect } from 'react'
const context = createContext(null)

const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetch('/gitprofile/getevents')
      .then(res => res.json())
      .then(res => setEvents(res))
      .catch(err => {
        console.log('EventsProvider: ', err)
      })
  }, [])

  return (
    <context.Provider value={events}>
      {children}
    </context.Provider>
  )
}

EventsProvider.context = context
export default EventsProvider