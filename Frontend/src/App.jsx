import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import { Context_Connection } from './Contect/ContextBrowser'
import UserConnect from './Pages/UserConnect'
import UserLgin from './Pages/UserLgin'
import ConnectionREQ from './Pages/ConnectionREQ'

function App() {
  const {token} = useContext(Context_Connection)
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/user' element={<UserConnect/>}/>
        <Route path='/loginorSing' element={<UserLgin/>}/>
        <Route path='/connectionReq' element={<ConnectionREQ/>}/>
      </Routes>
    </div>
  )
}
export default App