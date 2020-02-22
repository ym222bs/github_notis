// Component to render data from selected Organizations
import React, { Fragment } from 'react'



// TODO: properties should be passed down as a prop to this component and then rendered from Card
// in basically the same way as the names but in a new div

const PropertiesNav = ({ option }) => {

    const arrayOfKeys = Object.keys(option)
    const arrayOfValues = Object.values(option)

    return (
        <Fragment>
            <ul className='navbar navbar-expand-sm bg-light navbar-light' style={{  }} >

                <li className='navbar-nav'>
                    {
                      arrayOfKeys.map(key => 

                          <a className='nav-link' href='/profile'>{key}</a>
                      ) 
                    }
                </li>
            </ul>
        </Fragment>

    )
}


export default PropertiesNav