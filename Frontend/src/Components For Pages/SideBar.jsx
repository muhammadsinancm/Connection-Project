import React from 'react'
import './SideBar.css'

function SideBar({ items }) {
  return (
    <aside className="sidebar">
      <ul className="chat-list">
        <li className="chat-item">
          <div className="chat-bubble">
            <p className="chat-name">{items.userInput}</p>
          </div>
        </li>
      </ul>
    </aside>
  )
}

export default SideBar