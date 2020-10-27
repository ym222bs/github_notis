import React from 'react'
import { Router, Route } from 'react-router-dom'
import history from './history.js'
import Login from './components/Login'
import OrgsProvider from './contexts/OrgsProvider'
import Profile from './components/dashboard/Profile'
import UserProvider from './contexts/UserProvider'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <div className='page-container'>
        <div className='content-wrap'>
          <Router history={history}>
            <Route path='/' exact component={Login}></Route>
            <UserProvider>
              <OrgsProvider>
                <Route path='/profile' exact component={Profile}></Route>
              </OrgsProvider>
            </UserProvider>
          </Router>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default App
