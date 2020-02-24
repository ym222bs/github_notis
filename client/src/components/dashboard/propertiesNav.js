import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'


const PropertiesNav = ({ option }) => {
	const [url, setUrl] = useState(null)
	const [property, setProperty] = useState(null)
	const { events_url, repos_url, hooks_url } = option

	console.log('nav url ', url)

	useEffect(() =>
		async (url) => {
			try {
				const event = await axios.post('/profile/webhook', {
					data: url
				})
				
			} catch (err) {
				console.log('err is hook: ',err);
				
			}
		

			// console.log('event: ', events)
			// const json = await events.json()

			// setProperty(json)
			// console.log('json : ', json)
		}, [url])

	return (
		<Fragment>
			<div className='flex-container'>
				<ul className='navbar navbar-expand-sm'>
					<li className='navbar-nav'>
						<div
							className='nav-link'
							style={{ color: '#17a2b8' }}>
							{ option.login }
						</div>
						<a
							className='nav-link btn btn-link'
							onClick={() => setUrl(events_url)}
						>
							Events
						</a>
						<a
							className='nav-link btn btn-link'
							onClick={() => setUrl(repos_url)}
						>
							Repos
						</a>
						<a
							className='nav-link btn btn-link' key={hooks_url}
							onClick={() => setUrl(hooks_url)}
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