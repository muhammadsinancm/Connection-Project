import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Pages/Users.css'

function LeftBar() {
  return (
    <div className="left-bar-inner">

      <div className="compose-btn-container">
        <div className="compose-btn">
          <div className="compose-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="#001D35" />
            </svg>
          </div>
          <span className="compose-text">Compose</span>
        </div>
      </div>
{/* active */}
      <div>
        <NavLink to="/" className="nav-link">
          <span className="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V7L12 11.5L19 7V19ZM12 9.5L5 5H19L12 9.5Z" />
            </svg>
          </span>
          Inbox
        </NavLink>
        <NavLink to="/sent" className="nav-link">
          <span className="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" />
            </svg>
          </span>
          Sent
        </NavLink>
        <NavLink to="/drafts" className="nav-link">
          <span className="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" />
            </svg>
          </span>
          Drafts
        </NavLink>
      </div>
    </div>
  )
}

export default LeftBar
