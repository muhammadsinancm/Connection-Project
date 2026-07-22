import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ContextBrowser, { Context_Connection } from './Contect/ContextBrowser'
import UserConnect from './Pages/UserConnect'
import UserLgin from './Pages/UserLgin'
import ConnectionREQ from './Pages/ConnectionREQ'
import Message from './Pages/Message'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import FirstLoadingPages from './Pages/FirstLoadPage'

function ProtectedRoute({ children }) {
  const { token } = useContext(Context_Connection);

  if (!token) {
    return <Navigate to="/loginorSing" replace />;
  }

  return children;
}

function App() {

  return (
    <div>
      <ToastContainer position="top-center"
        style={{ width: "fit-content", left: "50%", transform: "translateX(-50%)" }} />
      <Routes>
         <Route path='/' element={<FirstLoadingPages/>}/>
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/user' element={<ProtectedRoute><UserConnect /></ProtectedRoute>} />
        <Route path='/loginorSing' element={<UserLgin />} />
        <Route path='/connectionReq' element={<ProtectedRoute><ConnectionREQ /></ProtectedRoute>} />
        <Route path='/context' element={<ProtectedRoute><ContextBrowser /></ProtectedRoute>} />
        <Route path='/message' element={<ProtectedRoute><Message /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}
export default App