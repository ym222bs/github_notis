// Component to render data from selected Organizations
import React, { Fragment, useState } from 'react'



// TODO: properties should be passed down as a prop to this component and then rendered from Card
// in basically the same way as the names but in a new div

const PropertiesNav = ({ option }) => {
	const [property, setProperty] = useState(null)

	// const arrayOfValues = Object.values(option)

	const { events_url, repos_url, hook_url } = option
	console.log(events_url)

	const handleClickOnEvent = async () => {
		const events = await fetch(option.events_url)
		const json = await events.json()
		// setProperty(json)
		console.log(json)
	}
	const handleClickOnRepos = () => {
		console.log('hello')
	}

	const handleClickOnHook = () => {
		console.log('hello')
	}

	// {/* {
	//         arrayOfValues.map(c => (

	//             <a className='nav-link' onClick={handleClickOnEvent}>{lable}</a>
	//         ))
	// } */}

	return (
		<Fragment>
			<div>
				<ul className='navbar navbar-expand-sm'>
					<li className='navbar-nav'>
						<div className='nav-link' onClick={handleClickOnEvent} style={{ color: '#17a2b8' }}>{option.login}</div>
						<a className='nav-link btn btn-link' onClick={handleClickOnEvent}>Events</a>
						<a className='nav-link btn btn-link' onClick={handleClickOnRepos}>Repos</a>
						<a className='nav-link btn btn-link' onClick={handleClickOnHook}>Create Hook</a>
					</li>
				</ul>


			</div>
		</Fragment>
	)
}


export default PropertiesNav