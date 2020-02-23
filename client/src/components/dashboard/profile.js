import React, { Fragment, useContext, useState } from 'react'
import _ from 'lodash'
import CardOfOrgs from './cardOfOrgs.js'
import UserProvider from '../../contexts/UserProvider.jsx'

const loginMsg = 'You have to log in to see info!'
const description = 'Your notofication app for the good old GitHub..'

// Ultimate userdata Data from server:



const Profile = () => {
	const userData = useContext(UserProvider.context)
	const { avatar_url } = userData

	const text = _.isEmpty(userData) ? loginMsg : 'Explore Your Orgs'
	const image = !_.isEmpty(userData) ? avatar_url : 'Image'

	return (
		<div
			className='jumbotron container mt-5'>
			<h2
				className='display-4'
			>
				{text}
			</h2>
			<div
				className='lead'
			>
				{description}
				<hr
					className='my-4'
				/>
				<div
					className='gridparent'
				>
					<CardOfOrgs
						avatar={image} /
					>
				</div>
			</div>
			<div
				style={{ marginBottom: 20 }}
			/>
		</div>
	)
}


export default Profile