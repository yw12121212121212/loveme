import React from 'react'
import { BrowserRouter, Route ,Routes   } from 'react-router-dom'
import Login from '../views/Login/index'
import NewsSendBox from '../views/sandbox/NewsSandBox'

export default function IndexRouter() {
  return (
    <BrowserRouter>
       <Routes>
       <Route path='/login' element={<Login/>} />
        <Route path='/*'  element={<NewsSendBox/>}/>
        </Routes>
    </BrowserRouter>
  )
}
