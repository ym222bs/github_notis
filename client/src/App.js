import React from 'react'
import { Router, Route } from 'react-router-dom'
import history from './history.js'
import Login from './components/login.js'
import OrgsProvider from './contexts/OrgsProvider'
import Profile from './components/dashboard/profile.js'
import UserProvider from './contexts/UserProvider'


function App() {

  return (
    <Router history={history}>
      <UserProvider>
        <OrgsProvider>
          <Route path='/profile' exact component={Profile}></Route>
        </OrgsProvider>
      </UserProvider>
      <Route path='/' exact component={Login}></Route>
    </Router>
  )

}


export default App