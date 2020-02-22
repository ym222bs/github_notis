import React from 'react'

const style = {
    textAlign: 'center',
    margin: 0
}

const Mac = () => {
    const curl = "$ curl -H 'Authorization: token ACCESS_TOKEN' https://api.github.com/user"

    return (
        <div className='window'>
            <div className='title-bar'>CommandoMaster
            <div className='buttons'>
                    <div className='mac-btn open mr-1 ' style={{backgroundColor: '#00FF7F'}} />
                    <div className='mac-btn close' style={{backgroundColor: 'red'}} />
                    <div className='mac-btn minimize mr-1' style={{backgroundColor: '#FFA500'}} />
                </div>
            </div>
            <div style={style} className='content'>
                {curl}
            </div>
        </div>
    )
}

export default Mac