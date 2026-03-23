import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { backendURL } from './App'
import { useState } from 'react'
import './ListOfUser.css'
function ListOfUser() {

  const [emails, setEmails] = useState([])

  const usersEmailList = async ()=> {

    try {

      const responce = await axios.get(backendURL + '/api/admin/userEmaillist')
      if (responce.data.success) {
        console.log(responce.data.userEmails);
        setEmails(responce.data.userEmails)
      } else {
        console.log(responce.data.message);
      }
      
    } catch (error) {
      console.log(error.message);
    }

  }

  useEffect(()=> {
    usersEmailList()
  }, [])

  const DeleteUserEmail = async (user)=> {

    try {

      console.log(user);
      const respoce = await axios.delete(backendURL + `/api/admin/deleteuseremail/${user}`)
      if (respoce.data.success) {
        console.log(respoce.data.message);
      } else {
        console.log(respoce.data.message);
      }
      
    } catch (error) {
      console.log(error.message);
    }

  }

  return (
    <div>
      <div>
       {
        emails.map((itmes, index)=> (
          <div className='container' key={itmes._id || index}>
            <h1 className='user-emails'>ID: {itmes?._id}</h1><br />
            <h3 className='user-emails'>Email: {itmes?.email}</h3>
            <button className='update-user-email'>Update email</button>

             <h3 className='user-name'>FirstName: {itmes.firstName} {itmes.lastName}</h3>
             <button className='update-name'>Update Name</button>

              <h2 className='user-date'>Date: {itmes.date}</h2>
              <h4 className='user-token'>token: {itmes.token}</h4>
              <div className='admin-container'>
                <button className='delete-email' onClick={()=> DeleteUserEmail(itmes?._id)}>Delete User Email</button>
                <button className='update-email'>Update User Email</button>
                <button className='block-email'>Block User Email</button>
              </div>
          </div>
        ))
       }
      </div>
    </div>
  )
}

export default ListOfUser
