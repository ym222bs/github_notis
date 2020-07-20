import React from 'react'
// style={{ width: '100%', marginBottom: '1rem' }}
const AllEvents = ({ eventList }) => {
    console.log('ALL EVENTS?: ', eventList)
    let count = 0
    return (
        <div style={{ overflow: 'auto', height: '628px' }}>
            {eventList &&
                eventList.map((property) => (
                    <div key={count++}>
                        <div
                            className='card'
                            style={{ width: '100%', marginBottom: '1rem' }}
                        >
                            <div className='card-body'>
                                <h5 className='card-title'>
                                    New{' '}
                                    <span style={{ color: '#1ca3b9' }}>
                                        {property.type}
                                    </span>
                                </h5>
                                <h6 className='card-subtitle mb-2 text-muted'>
                                    in {property.type}
                                </h6>
                                <p className='card-text'>by {property.type}</p>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default AllEvents
