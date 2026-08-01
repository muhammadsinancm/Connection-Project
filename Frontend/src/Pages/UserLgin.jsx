import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { Context_Connection } from '../Contect/ContextBrowser';
import './UserLgin.css'
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import './loading.css'

function UserLgin() {

  const { backendURL, setToken } = useContext(Context_Connection)
  const navigate = useNavigate()
  const [firstName, setFirtName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [current, setCurrent] = useState('LOGIN')
  const [loading, setLoading] = useState(false)
  const [store, setStore] = useState('')

  const Submit = async (event) => {
    setLoading(true)
    event.preventDefault();

    try {

      if (current === 'LOGIN') {
        const responce = await axios.post(backendURL + '/api/users/login', { email, password })
        console.log(responce.data);

        if (responce.data.success === true) {
          setStore(responce.data)
        } else {
          setStore(null)
        }
        setToken(responce.data.newToken)
        localStorage.setItem('token', responce.data.newToken)
        setTimeout(() => {
          navigate('/home')
        }, 3000)

      }
      else {
        const responce = await axios.post(backendURL + 'api/users/sign', { firstName, lastName, email, password })
        if (responce.data.success) {
          console.log(responce.data.token);
          setToken(responce.data.token)
          localStorage.setItem('token', responce.data.token)
          alert('success: ', 'working')

          setTimeout(() => {
            navigate('/home')
          }, 3000)
        }
        else {
          console.log(responce.data.message);
          alert('error: ' + error.message)
        }
      }

    } catch (error) {
      console.log(error.message);

    }
  }

  return (
    <div>
      {
        !loading ? <div className="userpage-wrap">
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
                    <input id="login-email" className="input" onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' required />
                  </div>

                  <div className="field">
                    <label htmlFor="login-password">Password</label>
                    <input id="login-password" className="input" onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' required />
                  </div>
                </>
              )}

              <div className="actions">
                <button type="submit" className="btn-primary">{current}</button>
                <button type="button" className="btn-switch" onClick={() => setCurrent(current === 'LOGIN' ? 'SIGNUP' : 'LOGIN')}>{current === "LOGIN" ? 'SIGNUP' : 'LOGIN'}</button>
              </div>
            </form>

          </div>
        </div> : <div>
          <div>
            {
              store ? '' : <div style={{
                position: 'fixed',
                top: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}>
                <div
                  style={{
                    position: 'fixed',
                    top: '183%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                  }}
                >
                  <div className="gradient-spinner" />
                  <h3 className="pulse-text" style={{ whiteSpace: 'nowrap' }}>Please Waite Loading</h3>
                </div>
              </div>
            }
            {
              store ? <div style={{
                position: 'fixed',
                top: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}>
                <h1 style={{
                  fontSize: '2.7rem', background: 'linear-gradient(90deg, #6c63ff, #00c9ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: '700',
                  whiteSpace: 'nowrap'
                }}>Welcome To LogIn</h1>
                <h2 style={{
                  fontSize: '2.0rem',
                  color: '#6c63ff',
                  fontWeight: '600',
                }}>{store?.userEmailFind?.firstName + store?.userEmailFind?.lastName}</h2>
                <div
                  style={{
                    position: 'fixed',
                    top: '183%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                  }}
                >
                  <div className="gradient-spinner" />
                  <h3 className="pulse-text">Loading</h3>
                </div>
              </div> : null
            }

          </div>
        </div>
      }
    </div>
  )
}

export default UserLgin