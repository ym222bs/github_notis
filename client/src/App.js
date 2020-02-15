import React from 'react';
import { Router, Route } from 'react-router-dom'
import Home from './components/home'
import history from './history'
import Profile from './components/profile'
import UserProvider from './contexts/UserProvider'
import OrgsProvider from './contexts/OrgsProvider'


function App() {
	// Home is where the login/Homepage is, just a presentation
	// Sidebar has all the navigation while logged in
	// mac has all the userinformation while logged in


	return (
		<Router history={history}>
			<OrgsProvider>
				<UserProvider>
					<Route path='/profile' component={Profile}></Route>
				</UserProvider>
			</OrgsProvider>
			<Route path='/' exact component={Home}></Route>
		</Router>
	)
}

export default App
