import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ContextBrowser from './Contect/ContextBrowser'
import UserConnect from './Pages/UserConnect'
import UserLgin from './Pages/UserLgin'
import ConnectionREQ from './Pages/ConnectionREQ'
import Message from './Pages/Message'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
function App() {

  return (
    <div>
      <ToastContainer position="top-center"
        style={{ width: "fit-content", left: "50%", transform: "translateX(-50%)" }} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user' element={<UserConnect />} />
        <Route path='/loginorSing' element={<UserLgin />} />
        <Route path='/connectionReq' element={<ConnectionREQ />} />
        <Route path='/context' element={<ContextBrowser />} />
        <Route path='/message' element={<Message />} />
      </Routes>
    </div>
  )
}
export default App