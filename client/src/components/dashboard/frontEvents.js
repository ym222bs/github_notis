import React from 'react'

function FrontEvents() {

  const getData = async () => {
    const url = '/userprofile/getevents'
    const allEvents = await axios.get(url)
      .catch(err => console.log('fetchWebhooks: ', err))
    console.log(allEvents)
  }
  getData(9)
  return (
    <div>

    </div>
  )
}

export default FrontEvents
