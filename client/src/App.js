import React from 'react'
import { Router, Route } from 'react-router-dom'
import UserProvider from './contexts/UserProvider'
import OrgsProvider from './contexts/OrgsProvider'
import history from './history.js'
import Home from './components/home.js'
import Profile from './components/dashboard/profile.js'


function App() {

	return (
		<Router history={history}>
			<OrgsProvider>
				<UserProvider>
					<Route path='/profile' exact component={Profile}></Route>
				</UserProvider>
			</OrgsProvider>
			<Route path='/' exact component={Home}></Route>
		</Router>
	)
	
}


export default App
