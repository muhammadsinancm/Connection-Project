import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ContextBrowser, { Context_Connection } from './Contect/ContextBrowser'
import UserConnect from './Pages/UserConnect'
import UserLgin from './Pages/UserLgin'
import ConnectionREQ from './Pages/ConnectionREQ'
import UserNotificatios from './Pages/UserNotificatios'
import UserText from './Pages/UserText'
import Message from './Pages/Message'

function App() {
  const {token} = useContext(Context_Connection)
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/user' element={<UserConnect/>}/>
        <Route path='/loginorSing' element={<UserLgin/>}/>
        <Route path='/connectionReq' element={<ConnectionREQ/>}/>
        <Route path='/notification' element={<UserNotificatios/>}/>
        <Route path='/context' element={<ContextBrowser/>}/>
        {/* <Route path='message' element={<UserText/>}/> */}
        <Route path='/message' element={<Message/>}/>
      </Routes>
    </div>
  )
}
export default App