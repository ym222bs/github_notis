import React, { Fragment } from 'react'
import _ from 'lodash'

const CardOfRepos = ({ repos }) => {
  if (!_.isEmpty(repos)) {
    var newArrayOfObjects = Object.entries(repos).map(e => e[1])
    let count = 0

    return (
      <Fragment>
        {
          newArrayOfObjects.slice(0, 5).map(property =>
            <div className='list-group' key={count++}>
              <div className='list-group-item' style={{ marginBottom: '1rem' }}>
                <div
                  style={{ fontSize: 'medium' }}>
                  {property.full_name}
                </div>
                <a
                  href={property.html_url}
                  style={{ fontSize: 'small' }}
                >
                  {property.html_url}
                </a>

              </div>
            </div>
          )
        }
      </Fragment>
    )
  } else {
    return (
      <div className='container empty-message' style={{ padding: '20px', fontSize: '15px' }}>
        This organization seems to be empty on repos.
      </div>

    )

  }
}


export default CardOfRepos
