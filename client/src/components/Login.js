import React from 'react'
import githubIcon from '../images/github.png'
import Navbar from './Navbar'
import styled from 'styled-components'

const Wrapper = styled.div`
  .jumbotron {
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
    border-radius: var(--main-border-radius);
    box-shadow: var(--shadow);
  }
  .home {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
    margin-top: 5%;
  }
  .home-title {
    background: linear-gradient(to right, #30cfd0 0%, #330867 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.4em;
    text-shadow: 2px 2px 0px rgba(57, 84, 207, 0.171);
    text-align: left;
    font-weight: bold;
  }
  .home-info {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 2em;
    padding: 5rem;
  }
  .lead {
    font-weight: bold;
  }
  .btn-container {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  .btn-home {
    background-image: linear-gradient(
      to right,
      #77a1d3 0%,
      #79cbca 51%,
      #77a1d3 100%
    );
    text-align: center;
    margin: 10px;
    transition: 1s;
    background-size: 200% auto;
    color: white;
    box-shadow: var(--shadow);
    border-radius: 3px;
    cursor: pointer;
    padding: 13px 20px;
    font-size: 13px;
    width: 100%;
  }

  .btn-home:hover {
    /* background-position: right center; change the direction of the change here */
    text-decoration: none;
    background-position: 100% 80%;
  }
`
const githubSignupUrl =
  'https://github.com/join?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home'
const localRoute = '/auth/github'

const github = {
  name: ['Login with Github', 'Register a Github account'],
  img: githubIcon,
  href: [localRoute, githubSignupUrl],
  color: '#24292e',
}

const Home = () => {
  return (
    <Wrapper>
      <Navbar />
      <div className='home jumbotron'>
        <div className='home-info'>
          <div>
            <p className='lead'>
              A notification hub for Github users{' '}
              <i className='fab fa-github-alt'></i>
            </p>
            <p>
              GithubNotis lets you customize what type of event or activity you
              would like to get notified by, on any of your organizations.
            </p>
            <p>
              You can either login with your Github account OR use <br />
              Username: <strong>notis-hub</strong> and
              <br />
              Password: <strong>just-testing0</strong> to login with a test
              account to check it out.
            </p>
          </div>
          <div className='btn-container'>
            <div
              className='btn-home'
              onClick={() => (window.location = github.href[0])}
            >
              <div>
                <div>{github.name[0]}</div>
              </div>
            </div>
            <div
              className='btn-home'
              onClick={() => window.open(github.href[1], '_blank')}
            >
              <div>
                <div>{github.name[1]}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Home
