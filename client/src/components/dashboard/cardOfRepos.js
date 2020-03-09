import React, { Fragment } from 'react'

const CardOfRepos = ({ events }) => {

  const newArrayOfObjects = Object.entries(events).map(e => e[1])
  console.log('newArrayDataOfOjbect: ', newArrayOfObjects[0].id)
  let count = 0

  return (
    <Fragment>
      {
        newArrayOfObjects.slice(0, 5).map(property =>
          <div className='list-group' key={count++}>
            <div className='list-group-item' style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: 'medium' }}>{property.full_name}</div>
              <a
                href={property.html_url}
                style={{ fontSize: 'small' }}
              >{property.html_url}</a>

            </div>
          </div>
        )
      }
    </Fragment>
  )
}


export default CardOfRepos
