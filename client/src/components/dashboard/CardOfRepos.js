import React from 'react'
import _ from 'lodash'

const CardOfRepos = ({ repos }) => {
  if (!_.isEmpty(repos)) {
    var newArrayOfObjects = Object.entries(repos).map((e) => e[1])
    return (
      <div style={{ overflow: 'auto', height: '628px', display: 'block' }}>
        {newArrayOfObjects.map((property) => (
          <div className='list-group' key={property.id}>
            <div className='list-group-item' style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: 'medium' }}>{property.full_name}</div>
              <a href={property.html_url} style={{ fontSize: 'small' }}>
                {property.html_url}
              </a>
            </div>
          </div>
        ))}
      </div>
    )
  } else {
    return (
      <div
        className='container empty-message'
        style={{ padding: '20px', fontSize: '15px' }}
      >
        This organization seems to be empty on repos.
      </div>
    )
  }
}

export default CardOfRepos
