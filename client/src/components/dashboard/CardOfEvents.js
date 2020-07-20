import React from 'react'
import _ from 'lodash'

const CardOfEvents = ({ events }) => {
    if (!_.isEmpty(events)) {
        const newArrayOfObjects = Object.entries(events).map((e) => e[1])
        // console.log('arrayofobjects: ', newArrayOfObjects)

        let count = 0

        return (
            <div
                style={{ overflow: 'auto', height: '628px', display: 'block' }}
            >
                {newArrayOfObjects.map((property) => (
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
                                    in {property.repo.name}
                                </h6>
                                <p className='card-text'>
                                    by {property.actor.login}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    } else {
        return (
            <div
                className='container empty-message'
                style={{ padding: '20px', fontSize: '15px' }}
            >
                This organization seems to be empty on events.
            </div>
        )
    }
}

export default CardOfEvents
