import React, { Fragment, useContext, useState } from 'react'
import OrgsProvider from '../../contexts/OrgsProvider.jsx'
import PropertiesNav from './propertiesNav.js'


// TODO: next step: 

//      Render data when clicking on navigation. Get the buttons/links from organizationObject
//      Example: Repos => fetch Repos render in card/list/table
//      Example: Events => fetch events render in card/list/table
//      Example: Webhook => fetch Webhook render in card/list/table, get current hooks from MOngo, on user?

const CardOfOrgs = ({ avatar }) => {

 const [selectedOrg, setSelectedOrg] = useState(null)
 const userOrganizations = useContext(OrgsProvider.contexto)

 const properties = Object.keys(userOrganizations).map(key => {
  return userOrganizations[key]
 })

 console.log(properties)
 console.log(selectedOrg)
 return (
  <Fragment>
   <div
    className='card'>
    <img style={{ width: '18rem' }} src={avatar} />
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
          href="#"
          className='card-link'
          key={userOrganizations[key].login}
          onClick={() => setSelectedOrg(userOrganizations[key])}
         >
          <img
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
   </div>
   <div className='child' >
    {
     selectedOrg &&
     <PropertiesNav
      option={selectedOrg}
     />
    }
   </div>
  </Fragment>
 )
}


export default CardOfOrgs