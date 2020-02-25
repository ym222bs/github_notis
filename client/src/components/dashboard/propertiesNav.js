import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'

//  Option === Specific Organization
const PropertiesNav = ({ option }) => {
	const [url, setGithubUrl] = useState(null)
	const [apiUrl, setApiUrl] = useState(null)
	const [property, setProperty] = useState(null)
	const { events_url, repos_url, hooks_url } = option

	const handleNavOption = (type) => {
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
	
	const fetchData = () => {
		const api = `profile/${apiUrl}`

		axios.post(api, { data: url }, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	useEffect(() => {
	
		fetchData()
		// And render dataObject Based on returnObject Structure
	}, [url])



	const oderListOfContent = () => {

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