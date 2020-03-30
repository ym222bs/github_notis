import React, { useState } from 'react'
import axios from 'axios'

const FrontEvents = () => {
  const [allEvents, setAllEvents] = useState(null)


  const getData = async () => {
    const url = '/gitprofile/getevents'
    const allEvents = await axios.get(url)
      .catch(err => console.log('fetchWebhooks: ', err))

    setAllEvents(Object.values(allEvents.data))
  }


  return (
    <div>
      {allEvents &&
        allEvents.map(item => (

          item.id
        )
        )
      }
      <button onClick={getData}>click</button>
    </div>
  )
}

export default FrontEvents
