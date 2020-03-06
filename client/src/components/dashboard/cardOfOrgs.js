import React, { Fragment, useEffect, useContext, useState, useRef } from 'react'
import OrgsProvider from '../../contexts/OrgsProvider.jsx'
import PropertiesNav from './propertiesNav.js'


const CardOfOrgs = ({ avatar }) => {

  const [selectedOrg, setSelectedOrg] = useState(null)
  const userOrganizations = useContext(OrgsProvider.contexto)
  const ref = useRef(null)


  return (
    <Fragment>
      <div
        className='card'>
        <img
          alt='profile avatar'
          style={{ width: '18rem' }}
          src={avatar}
        />
        <div className='card-header'>
          Organizations:
        </div>
        <ul
          className='list-group list-group-flush'
          key='orgs-list'
        >
          {
            Object.keys(userOrganizations).map(key => {
              return (
                <li
                  className='list-group-item'
                  key={userOrganizations[key].login}
                >
                  <a
                    href='#'
                    className='card-link'
                    key={userOrganizations[key].login}
                    onClick={() => setSelectedOrg(userOrganizations[key])}
                  >
                    <img
                      alt='organization avatar'
                      style={{ width: '2rem', marginRight: '5px' }}
                      src={userOrganizations[key].avatar_url}
                    />
                    {userOrganizations[key].login}
                  </a >
                </li>
              )
            })
          }
        </ul>
        <button onClick={() => { ref.current.cleanValue() }} type="button">Reset</button>
      </div>
      <div className='child' >
        {
          selectedOrg &&
          <PropertiesNav
            ref={ref}
            option={selectedOrg}
          />
        }
      </div>
    </Fragment>
  )
}


export default CardOfOrgs