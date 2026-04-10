import React from 'react'
import { useEffect } from 'react';
import axios from 'axios'
import { backendURL } from './App';
import { useState } from 'react';
import './ListOfRequest.css'
function ListOfRequest() {

  const [userRequest, setUserRequest] = useState([])

  const userRequestList = async () => {

    try {

      const responce = await axios.get(backendURL + '/api/admin/userrequestlist')
      if (responce.data.success) {
        console.log(responce.data.userRequest);
        setUserRequest(responce.data.userRequest)
      }

    } catch (error) {
      console.log(error.message);
    }

  }

  useEffect(() => {
    userRequestList()
  }, [])

  return (
    <div>
      <div>
        {
          userRequest.map((items, index) => (
            <div className='container' key={items?._id || index}>
              <h2 className='user-email'>Email: {items?.email}</h2>
              <button className='user-email-update'>Update Email</button>

              <h2 className='user-first-name'>Name: {items?.firstName} {items?.lastName}</h2>
              <button className='user-fistname-update'>Update Firstname</button>

              <h3 className='user-token'>Token: {items?.token}</h3>
              <h3 className='user-request'>Request: {items?.request}</h3>
              <h3 className='user-reciver'>Reciver: {items?.reciver}</h3>

              <h3 className='user-accepted'>Accepted: {items?.accepted}</h3>
              <button className='user-accepted'>Update Accepted</button>
              
              <h3 className='user-date'>Date: {items?.date}</h3>
              
              <div className='admin-button'>
                <button className='user-email-delete'>Delete Email</button>
                <button className='user-email-update'>Update Email</button>
                <button className='user-email-block'>Block Email</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ListOfRequest
