import React from 'react'
import { Router, Route } from 'react-router-dom'
import UserProvider from './contexts/UserProvider'
import OrgsProvider from './contexts/OrgsProvider'
import history from './history.js'
import Home from './components/home'
import Profile from './components/dashboard/Profile.js'


function App() {

  return (
    <Router history={history}>
      <UserProvider>
        <OrgsProvider>
          <Route path='/profile' exact component={Profile}></Route>
        </OrgsProvider>
      </UserProvider>
      <Route path='/' exact component={Home}></Route>
    </Router>
  )

}


export default App