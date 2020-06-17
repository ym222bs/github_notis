import React from 'react'
import { Router, Route } from 'react-router-dom'
import history from './history.js'
import Login from './components/Login.js'
import EventsProvider from './contexts/EventsProvider.jsx'
import OrgsProvider from './contexts/OrgsProvider.jsx'
import Profile from './components/dashboard/Profile.js'
import UserProvider from './contexts/UserProvider.jsx'


function App() {
  return (
    <Router history={history}>
      <UserProvider>
        <EventsProvider>
          <OrgsProvider>
            <Route path='/profile' exact component={Profile}></Route>
          </OrgsProvider>
        </EventsProvider>
      </UserProvider>
      <Route path='/' exact component={Login}></Route>
    </Router>
  )

}


export default App