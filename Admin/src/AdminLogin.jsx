import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { backendURL } from './App';

function AdminLogin({setToken}) {

    const [adminEmail, setAdminEmail] = useState('')
    const [adminPassword, setAdminPassword] = useState('')

  const UserSubmit = async (event) => {
    console.log(adminEmail);
    console.log(adminPassword);
    
    try {
        event.preventDefault();

        const responce = await axios.post(backendURL + '/api/admin/login', {adminEmail, adminPassword})
        if (responce.data.success) {
            setToken(responce.data.token)
        } else {
            console.log(responce.data.message);
        }
        
    } catch (error) {
        console.log(error.message);
    }
  }

  return (
    <div>
      <div className='container'>
        <div className='heder'>
            <form onSubmit={UserSubmit}>
                <input onChange={(e)=> setAdminEmail(e.target.value)} className='admin-email' type="email" />
                <input onChange={(e)=> setAdminPassword(e.target.value)} className='admin-password' type="password" />
                <button className='admin-sumit-button' type='submit'>submit</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
