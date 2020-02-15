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
                    <div className='mac-btn close' />
                    <div className='mac-btn minimize' />
                </div>
            </div>
            <div style={style} className='content'>
                {curl}
            </div>
        </div>
    )
}

export default Mac