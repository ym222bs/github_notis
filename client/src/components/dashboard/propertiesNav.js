// import React, { Fragment, useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react'
// // const { forwardRef, useRef, useImperativeHandle } = React

// import CardOfEvents from './cardOfEvents.js'
// import CardOfRepos from './cardOfRepos.js'
// import axios from 'axios'

// //  Option === Specific Organization
// const PropertiesNav = ({ option, generateRef }) => {
//   console.log('generateRef: ', generateRef)
//   const [githubUrl, setGithubUrl] = useState(null)
//   const [apiUrl, setApiUrl] = useState(null)
//   const [event, setEvent] = useState(null)
//   const [repo, setRepo] = useState(null)

//   const cleanValue = () => {

//     if (event !== null || repo !== null) {
//       setEvent(null)
//       setRepo(null)
//     }
//   }

//   if (option) {
//     var { events_url, repos_url, hooks_url } = option
//   }

//   // Set option:
//   const handleNavOption = (type) => {
//     switch (type) {
//       case 'events':
//         setGithubUrl(events_url)
//         setApiUrl('events')
//         break
//       case 'repos':
//         setGithubUrl(repos_url)
//         setApiUrl('repos')
//         break
//       case 'hook':
//         setGithubUrl(hooks_url)
//         setApiUrl('webhook')
//         break
//       default:
//         return null
//     }
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       if (option) {
//         const api = `gitprofile/${apiUrl}`
//         const propertyData = await axios.post(api, {
//           data: {
//             githubUrl: githubUrl,
//             orgname: option.login
//           },
//           headers: {
//             'Content-Type': 'application/json'
//           },
//         })
//         apiUrl === 'events' ? await setEvent(propertyData.data) : await setRepo(propertyData.data)
//       }
//     }

//     fetchData()

//   }, [githubUrl || apiUrl])

//   // useEffect(() => {
//   //   generateRef.generateRef.current = cleanValue
//   //   return () => {
//   //     generateRef.generateRef.current = null
//   //   }
//   // })

//   return (

//     <Fragment>
//       <div className='flex-container'>
//         <ul className='navbar navbar-expand-sm'>
//           <li className='navbar-nav'>
//             {
//               option &&
//               <div
//                 className='nav-link'
//                 style={{ color: '#17a2b8' }}>
//                 {option.login}
//               </div>
//             }
//             <a
//               href='#'
//               className='nav-link btn btn-link'
//               onClick={() => handleNavOption('events')}

//             >
//               Events
// 						</a>
//             <a
//               href='#'
//               className='nav-link btn btn-link'
//               onClick={() => handleNavOption('repos')}
//             >
//               Repos
// 						</a>
//             <a
//               href='#'
//               className='nav-link btn btn-link'
//               onClick={() => handleNavOption('hook')}
//             >
//               Create Hook
// 						</a>
//           </li>
//         </ul>
//         <div>
//           {
//             apiUrl === 'events' && event &&
//             <CardOfEvents events={event} />
//           }

//           {
//             apiUrl === 'repos' && repo &&
//             <CardOfRepos events={repo} />
//           }
//         </div>
//       </div>
//     </Fragment>
//   )
// }




// export default PropertiesNav