import React from 'react'

const cardOfRepos = ({ events }) => {
  console.log('property inside card: ', type)

  const newArrayOfObjects = Object.entries(events).map(e => e[1])
  console.log('newArrayDataOfOjbect: ', newArrayOfObjects[0].id)


  return (
    <div>
      {
        newArrayOfObjects.slice(0, 5).map(property =>
          <>
            < div className="card">
              <div className="card-header">
                Quote
              </div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                  <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                </blockquote>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}


export default cardOfRepos
