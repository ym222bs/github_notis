import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'

//  Option === Specific Organization
const PropertiesNav = ({ option }) => {
	const [hookurl, setGithubUrl] = useState(null)
	const [apiUrl, setApiUrl] = useState(null)
	const [property, setProperty] = useState(null)

	const { events_url, repos_url, hooks_url } = option

	console.log('url:', hookurl)
	console.log('api:', apiUrl)

	// console.log('event', events_url)
	// console.log('rep', repos_url)
	// console.log('hook', hooks_url)

	const handleNavOption = (type) => {
		console.log('type', type)
		switch (type) {
			case 'events':
				setGithubUrl(events_url)
				setApiUrl('events')
				break
			case 'repos':
				setGithubUrl(repos_url)
				setApiUrl('repos')
				break
			case 'hook':
				setGithubUrl(hooks_url)
				setApiUrl('webhook')
				break
		}
	}


	// Create new webhook by sending hookUrl to server
	const sendData = async () => {
		const api = `profile/${apiUrl}`
		const propertyData = await axios.post(api, {
			data: {
				hookurl: hookurl,
				orgname: option.login
			},
			headers: {
				'Content-Type': 'application/json'
			},
		})
		console.log('Property shit:', propertyData.data)
		// setProperty(propertyData)
	}

	useEffect(() => {

		sendData()

		// And render dataObject Based on returnObject Structure
	}, [hookurl || apiUrl])


	const orderListOfContent = () => {
		// TODO: structure the returnObject from content api
	}


	return (
		<Fragment>
			<div className='flex-container'>
				<ul className='navbar navbar-expand-sm'>
					<li className='navbar-nav'>
						<div
							className='nav-link'
							style={{ color: '#17a2b8' }}>
							{option.login}
						</div>
						<a
							className='nav-link btn btn-link'
							onClick={() => handleNavOption('events')}
						>
							Events
						</a>
						<a
							className='nav-link btn btn-link'
							onClick={() => handleNavOption('repos')}
						>
							Repos
						</a>
						<a
							className='nav-link btn btn-link'
							onClick={() => handleNavOption('hook')}
						>
							Create Hook
						</a>
					</li>
				</ul>
				<div className="list-group">
					{
						<a href="#" className="list-group-item list-group-item-action">First item</a>
					}
				</div>
			</div>
		</Fragment>
	)
}





export default PropertiesNav