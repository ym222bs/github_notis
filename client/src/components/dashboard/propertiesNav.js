import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'


const PropertiesNav = ({ option }) => {
	const [url, setUrl] = useState('fuckyou')
	const [property, setProperty] = useState(null)
	const { events_url, repos_url, hooks_url } = option

	console.log('nav url ', url)
	const apiUrl = 'profile/webhook'
	useEffect(() => {
		console.log('nav url 2 ', url)

		const fetchData = () => {
		console.log('nav url 3 ', url)

			axios.post(apiUrl, {
				data: url
			}, {
				headers:
				{
					'Content-Type': 'application/json'
				}
			}).then((payload) => {
				console.log(payload.data)

			})
				.catch((err) => {
					console.log(err)
				})
			//   .then(function(result) {
			//    console.log(result);
			//   })
		}
		fetchData()
	}, [url])

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