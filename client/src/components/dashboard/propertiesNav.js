// Component to render data from selected Organizations
import React, { Fragment, useState } from 'react'



// TODO: properties should be passed down as a prop to this component and then rendered from Card
// in basically the same way as the names but in a new div

const PropertiesNav = ({ option }) => {
    const [ evets, setEvents ] = useState('')

    const arrayOfValues = Object.values(option)

    const handleClickOnEvent = async () => {
        const events = await fetch(option.events_url)
        const json = await events.json()
        console.log(json)
    }
    const handleClickOnRepos = () => {
        console.log('hello')
    }

    const handleClickOnHook = () => {
        console.log('hello')
    }


    return (
        <Fragment>
            <div>
            <ul className='navbar navbar-expand-sm ' style={{  }} >
                <li className='navbar-nav'>
                          <a className='nav-link' onClick={handleClickOnEvent}>Events</a>
                          <a className='nav-link' onClick={handleClickOnRepos}>Repos</a>
                          <a className='nav-link' onClick={handleClickOnHook}>Create Hook</a>
                </li>
            </ul>

            
            </div>
        </Fragment>
    )
}


export default PropertiesNav