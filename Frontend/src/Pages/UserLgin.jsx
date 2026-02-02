import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { Context_Connection } from '../Contect/ContextBrowser';
import { useEffect } from 'react';

function UserLgin() {

const {backendURL, setToken} = useContext(Context_Connection)

const [firstName, setFirtName] = useState('')
const [lastName, setLastName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [current, setCurrent] = useState('LOGIN')

    const Submit = async (event) => {
        event.preventDefault();

        try {
            if (current === 'LOGIN') {
                const responce = await axios.post(backendURL + '/api/users/login', { email, password })
                console.log(responce.data);
                setToken(responce.data.token)
                localStorage.setItem('token', responce.data.token)
                console.log(localStorage.getItem('token'));

            }
             else {
                const responce = await axios.post(backendURL + '/api/users/sign', { firstName, lastName, email, password })
                if (responce.data.success) {    
                console.log(responce.data.token);
                setToken(responce.data.token)
                localStorage.setItem('token', responce.data.token)
                console.log(localStorage.getItem('token'));
                
                
                }
                else {
                    console.log(responce.data.message);
                    
                }
            }

        } catch (error) {
            console.log(error.message);

        }

    }

  return (
      <div>
          <div>
              <form onSubmit={Submit}>
                  {current === 'LOGIN' ? '' : <input onChange={(e) => setFirtName(e.target.value)} value={firstName} type="text" placeholder='First Name' required />}
                  {current === 'LOGIN' ? '' : <input onChange={(e) => setLastName(e.target.value)} value={lastName} type="text" placeholder='Last Name' required />}
                  {current === 'LOGIN' ? '' : <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Enter Your New Email Address' required />}
                  {current === 'LOGIN' ? '' : <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Enter Your New Password' required />}

                  {
                    current === 'LOGIN' ? <>
                    <input onChange={(e)=> setEmail(e.target.value)} type="email" placeholder='Email' required />
                    <input onChange={(e)=> setPassword(e.target.value)} type="password" placeholder='Password' required />
                    </>  : ''
                  }

                  
                  <button>Submit</button>
              </form>
              <div>
                <button onClick={()=> setCurrent(current === 'LOGIN' ? 'SIGNUP' : 'LOGIN')}>{current}</button>
              </div>
          </div>
      </div>
  )
}

export default UserLgin
