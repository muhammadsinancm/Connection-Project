import React, { useState } from 'react'
import './HomeChatStyles.css'
import InputTab from './InputTab'
import TopBar from './TopBar'
import SideBar from './SideBar'
import UserLgin from '../Pages/UserLgin'

function HomePageChat() {

  return (
    <div>
    <div className='inputHeder'>
        <div className='inputBox'>
          
            <InputTab/>
        </div>
    </div>
  </div>
  ) 
}

export default HomePageChat
