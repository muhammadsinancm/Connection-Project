import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ListOfUser from './ListOfUser'
import AdminLogin from './AdminLogin'
import { useState } from 'react'
import { useEffect } from 'react'
import ListOfRequest from './ListOfRequest'
import SideBar from './SideBar'
export const backendURL = "https://connection-project-backend.onrender.com"
function App() {

  const [token, setToken] = useState(localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : '')

  useEffect(() => {
    localStorage.setItem('adminToken', token)
  }, [token])
  console.log(token);

  return (
    <div>
      {
        token === '' ? <AdminLogin setToken={setToken} /> :

          <div>
            <SideBar />
            <Routes>
              <Route path='/' element={<SideBar />} />
              <Route path='/useremail' element={<ListOfUser />} />
              <Route path='/userrequest' element={<ListOfRequest />} />
            </Routes>
          </div>
      }

    </div>
  )
}

export default App
