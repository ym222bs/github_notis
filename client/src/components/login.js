import React from 'react'
import githubIcon from '../images/github.png'
import Mac from './mac.js'

const github = {
  name: 'Github',
  img: githubIcon,
  href: '/auth/github',
  color: '#24292e'
}

const Home = () => {
  return (
    <div>
      <div
        className='page'
        style={{ textAlign: 'center' }}
      >
        <p
          className='page-title'>
          Github Notifications
        </p>
        <Mac />
        <div
          className='card-g'
          onClick={() => window.location = github.href}
          style={{
            border: `1xp solid`,
            borderRadius: 2
          }}
        >
          <div>
            <p>
              {github.name}
            </p>
          </div>
          <div
            style={{
              minHeight: 100,
              minWidth: 100,
              background: `url('${github.img}') no-repeat center center / 50% ${github.color}`
            }}
          >
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home