import React from 'react';
import { Router, Route } from 'react-router-dom'
import UserProvider from './contexts/UserProvider'
import Home from './components/home'
import Sidebar from './components/sidebar'
import Mac from './components/mac'
import history from './history'
import Profile from './components/profile'
import Menu from './components/menu'

function App() {
	// Home is where the login/Homepage is, just a presentation
	// Sidebar has all the navigation while logged in
	// mac has all the userinformation while logged in

	return (
		<Router history={history}>
			<UserProvider>
				<Route path='/' component={Sidebar}></Route>
				<Route path='/dashboard' component={Mac}></Route>
				<Profile></Profile>
			</UserProvider>
			<Route path='/' exact component={Home}></Route>
		</Router>
	)
}

export default App
