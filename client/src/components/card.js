import React from 'react'
import githubIcon from '../github.png'
// import {data} from './data'

const data = {
    name: 'Github',
    img: githubIcon,
    href: 'auth/github',
    color: '#24292e'
}
// Sending objects: Component {...object}
{/* <Card {...app} key={app.name} /> */ }

const Card = () => {
    return (
        <div className='card' style={{ border: `1xp solid`, borderRadius: 2 }} onClick={() => window.location = data.href}>
            <div>
                <p>{data.name}</p>
            </div>
            <div style={{ minHeight: 100, minWidth: 100, background: `url('${data.img}') no-repeat center center / 50% ${data.color}` }}></div>
        </div>
    )
}

export default Card