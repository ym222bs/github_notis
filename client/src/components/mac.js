import React from 'react'


const style = {
    textAlign: 'center',
    margin: 0
}

// Terminal , 
// TODO: Do fetch here to select data, organizations for example, filter out the type of data that is needed, 
// Hooks may be here as well
const Mac = ({ userData, selected }) => {
    // const selectedData = selected === 'All' ? userData : userData[selected]
    // const jsonData = JSON.stringify(selectedData, null, 4)
    return (
        <div className='window'>
            <div className='title-bar'>CommandoMaster
            <div className='buttons'>
                    <div className='mac-btn close' />
                    <div className='mac-btn minimize' />
                </div>
            </div>
            <div style={style} className='content'>
Hello
            </div>

        </div>
    )
}

export default Mac