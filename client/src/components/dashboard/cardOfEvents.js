import React, { Fragment } from 'react'

const CardOfEvents = ({ events }) => {
  const newArrayOfObjects = Object.entries(events).map(e => e[1])
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


export default CardOfEvents