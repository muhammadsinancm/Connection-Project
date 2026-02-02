import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'

function App() {
  return (
    <div className='px-4 sm:px-[Svw] md:px-[7vw] lg:px-[9vw]'>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  )
}
export default App