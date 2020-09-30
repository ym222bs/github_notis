import React from 'react'
import githubIcon from '../images/github.png'

const github = {
  name: ['Login with Github', 'Register a Github Account'],
  img: githubIcon,
  href: [
    '/auth/github',
    'https://github.com/join?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home',
  ],
  color: '#24292e',
}

const Home = () => {
  return (
    <>
      <div className='page jumbotron'>
        <p
          className='page-title'
          style={{ textAlign: 'left', fontWeight: 'bold' }}
        >
          <i className='far fa-bell'></i> GithubNotis
        </p>
        <div className='page-info ' style={{ padding: '5rem' }}>
          <div>
            <p className='lead' style={{ fontWeight: 'bold' }}>
              A notification hub for Github users{' '}
              <i className='fab fa-github-alt' style={{ fontSize: '30px' }}></i>
            </p>
            <p>
              GithubNotis lets you customize what type of event or activity you
              would like to get notified by, on any of your organizations.
            </p>
            <p>
              You can either login with your Github account OR use <br />
              <strong>username: just-check1ng </strong> and
              <br />
              <strong>password: xyz123!"#</strong> to login with a test account
              to check it out.
            </p>
          </div>
          <div>
            <div
              className='card-g'
              onClick={() => (window.location = github.href[0])}
            >
              <div>
                <p>{github.name[0]}</p>
              </div>
            </div>
            <div
              className='card-g'
              onClick={() => window.open(github.href[1], '_blank')}
            >
              <div>
                <p>{github.name[1]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
