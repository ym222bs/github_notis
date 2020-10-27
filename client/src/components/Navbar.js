import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  .nav-login {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 8vh;
    font-size: 1.2rem;
    padding: 40px;
  }
  .nav-list {
    display: flex;
    list-style: none;
    padding-left: 7rem;
  }
  .nav-list li {
    padding: 13px 20px;
    font-size: 14px;
    font-weight: bold;
    line-height: 1;
    cursor: pointer;
    text-decoration: none;
    margin-left: 1.8em;
    box-shadow: var(--shadow);
  }
  #nav-login-btn {
    font-weight: bold;
    line-height: 1;
    position: relative;
    border: 2px solid transparent;
    border-radius: 3px;
    background: #ffffff;
    background-clip: padding-box;
    color: #3acfd5;
    outline: none;
    cursor: pointer;
    text-decoration: none;
  }
  #nav-login-btn::after {
    position: absolute;
    top: -2px;
    bottom: -2px;
    left: -2px;
    right: -2px;
    background: linear-gradient(to right, #77a1d3, #79cbca);
    content: '';
    z-index: -1;
    border-radius: 3px;
  }
  #nav-login-btn:hover {
    background: linear-gradient(to right, #77a1d3, #79cbca);
    background-size: 104%;
    background-position: -2px;
  }

  #nav-signup-btn {
    color: #ffffff;
    background-image: linear-gradient(to left, #77a1d3, #79cbca);
  }
  .logo {
    background: linear-gradient(to right, #30cfd0 0%, #330867 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 31px;
    text-shadow: 2px 2px 0px rgba(57, 84, 207, 0.171);
  }
`
const Navbar = () => {
  return (
    <Wrapper>
      <div className='nav-login'>
        <p className='logo page-title'>
          <i className='far fa-bell'></i> GithubNotis
        </p>

        <ul className='nav-list'>
          <li id='nav-login-btn'>Login</li>
          <li id='nav-signup-btn'>Sign up</li>
        </ul>
      </div>
    </Wrapper>
  )
}

export default Navbar
