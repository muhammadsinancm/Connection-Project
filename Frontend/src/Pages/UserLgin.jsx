import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { Context_Connection } from '../Contect/ContextBrowser';
import { useEffect } from 'react';
import './UserLgin.css'
import { useNavigate } from 'react-router-dom';

function UserLgin() {

const {backendURL, setToken, token} = useContext(Context_Connection)
const navigate = useNavigate()
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
                console.log(responce.data.message);
                
                setToken(responce.data.newToken)
                localStorage.setItem('token', responce.data.newToken)
                navigate('/')

            }
            else {
                const responce = await axios.post(backendURL + '/api/users/sign', { firstName, lastName, email, password })
                if (responce.data.success) {
                    console.log(responce.data.token);
                    setToken(responce.data.token)
                    localStorage.setItem('token', responce.data.token)
                    navigate('/')
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
    <div className="userpage-wrap">
      <div className="user-card">
        <div className="user-head">
          <h2 className="user-brand">{current === 'LOGIN' ? 'Welcome Back' : 'Create Account'}</h2>
          <div className="user-sub">{current === 'LOGIN' ? 'Log In to Your Account' : 'Sign up to get started'}</div>
        </div>

        <form onSubmit={Submit} className="form-field" aria-label="auth-form">

                  {current !== 'LOGIN' && (
                      <>
                          <div className="field">
                              <label htmlFor="firstName">First Name</label>
                              <input id="firstName" className="input" onChange={(e) => setFirtName(e.target.value)} value={firstName} type="text" placeholder='First Name' required />
                          </div>
                          <div className="field">
                              <label htmlFor="lastName">Last Name</label>
                              <input id="lastName" className="input" onChange={(e) => setLastName(e.target.value)} value={lastName} type="text" placeholder='Last Name' required />
                          </div>
                          <div className="field">
                              <label htmlFor="signup-email">Email</label>
                              <input id="signup-email" className="input" onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Enter Your New Email Address' required />
                          </div>
                          <div className="field">
                              <label htmlFor="signup-password">Password</label>
                              <input id="signup-password" className="input" onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Enter Your New Password' required />
                          </div>
                      </>
                  )}

          {current === 'LOGIN' && (
            <>
              <div className="field">
                <label htmlFor="login-email">Email</label>
                <input id="login-email" className="input" onChange={(e)=> setEmail(e.target.value)} type="email" placeholder='Email' required />
              </div>

              <div className="field">
                <label htmlFor="login-password">Password</label>
                <input id="login-password" className="input" onChange={(e)=> setPassword(e.target.value)} type="password" placeholder='Password' required />
              </div>
            </>
          )}

          <div className="actions">
            <button type="submit" className="btn-primary">Log In</button>
            <button type="button" className="btn-switch" onClick={()=> setCurrent(current === 'LOGIN' ? 'SIGNUP' : 'LOGIN')}>{current}</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default UserLgin