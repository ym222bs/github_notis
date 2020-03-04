import React from 'react'

const cardOfEvents = ({ events }) => {

  const newArrayOfObjects = Object.entries(events).map(e => e[1])
  // console.log('stringifies: ', JSON.stringify(newArrayOfObjects))
  console.log('newArrayDataOfOjbect: ', newArrayOfObjects[0].id)


  return (
    <div>
      {
        newArrayOfObjects.slice(0, 5).map(property =>
          <>
            <div className="card" style={{ width: '20rem', marginBottom: '1rem' }}>
              <div className="card-body" key={property.name}>
                <h5 className="card-title" key={property.name}>New <span style={{ color: '#1ca3b9' }}>{property.type}</span></h5>
                <h6 className="card-subtitle mb-2 text-muted" key={property.name} >in {property.repo.name}</h6>
                <p className="card-text" key={property.name}>by {property.actor.login}</p>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}



export default cardOfEvents