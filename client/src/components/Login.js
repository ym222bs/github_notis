import React from 'react'
import githubIcon from '../images/github.png'

const github = {
    name: 'Github',
    img: githubIcon,
    href: '/auth/github',
    color: '#24292e',
}

const Home = () => {
    return (
        <div>
            <div className='page'>
                <p className='page-title' style={{ textAlign: 'left' }}>
                    + GithubNotis
                </p>
                <div
                    className='page-info jumbotron'
                    style={{ padding: '5rem' }}
                >
                    <div>
                        <p className='lead' style={{ fontWeight: 'bold' }}>
                            Keep track, get notified !
                        </p>
                        <p>
                            GithubNotis lets you customize what type of event or
                            activity you would like to get notified by, on any
                            of your organizations.
                        </p>
                        <p>
                            You can either login with your Github account OR use{' '}
                            <br />
                            <strong>username: just-check1ng </strong> and
                            <br />
                            <strong>password: xyz123!"#</strong> to login with a
                            test account and check it out.
                        </p>
                    </div>

                    <div
                        className='card-g'
                        onClick={() => (window.location = github.href)}
                        style={{
                            border: '1xp solid',
                        }}
                    >
                        <div>
                            <p
                                style={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    color: 'white',
                                }}
                            >
                                {github.name}
                            </p>
                        </div>
                        <div
                            style={{
                                minHeight: 100,
                                minWidth: '100%',
                                background: `url('${github.img}') no-repeat center center / 50% ${github.color}`,
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
