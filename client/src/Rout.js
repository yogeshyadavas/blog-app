import React from 'react'
import { useRoutes } from 'react-router-dom'
import GetBloges from './Components/GetBloges'
import Form from './Components/Form'
import More from './Components/More'

const Rout = () => {
  return useRoutes ([
    {
        path: '/',
        element: <GetBloges/> ,
    },
    {
        path: '/form',
        element: <Form/>,
    },
   
    {
        path:'/More',
        element:<More/>,
    },
  ]
   
  )
}

export default Rout