import React, { Fragment } from 'react'

const cardOfEvents = ({ events }) => {
  console.log('1. events : ', events)
  const newArrayOfObjects = Object.entries(events).map(e => e[1])
  // console.log('stringifies: ', JSON.stringify(newArrayOfObjects))
  console.log('2. newArrayDataOfOjbect: ', newArrayOfObjects[0].id)
  console.log('3. events repo name: ', newArrayOfObjects[0].repo.name)
  let count = 0

  return (
    <Fragment>
      {
        newArrayOfObjects &&
        newArrayOfObjects.slice(0, 5).map(property =>
          <div key={count++}>
            <div className="card" style={{ width: '20rem', marginBottom: '1rem' }}>
              <div className="card-body">
                <h5 className="card-title">New <span style={{ color: '#1ca3b9' }}>{property.type}</span></h5>
                <h6 className="card-subtitle mb-2 text-muted" >in {property.repo.name}</h6>
                <p className="card-text" >by {property.actor.login}</p>
              </div>
            </div>
          </div>
        )
      }
    </Fragment>
  )
}


export default cardOfEvents