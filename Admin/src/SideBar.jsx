import React from 'react'
import { NavLink } from 'react-router-dom'
import './SideBar.css'

function SideBar() {
  return (
    <div className='container'>

      <div className='user-email-list'>
        <NavLink to={'/useremail'}>
         Email List
        </NavLink>
      </div>

      <div className='user-request-list'>
        <NavLink to={'/userrequest'}>
         Request List
        </NavLink>
      </div>

    </div>
  )
}

export default SideBar
