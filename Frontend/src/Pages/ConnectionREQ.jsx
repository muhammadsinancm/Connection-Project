import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Context_Connection } from '../Contect/ContextBrowser'
import './ConnectionREQ.css';
import { useRef } from 'react';
import { io } from 'socket.io-client';

function ConnectionREQ() {

  const location = useLocation()

  const [pending, setPending] = useState('')
  const [storeREQ, setStoreREQ] = useState([])
  const [requestAccept, setRequestAccept] = useState([])
  const [userRequest, setUserRequest] = useState([])
  const useRefSocket = useRef(null)


  const navigate = useNavigate()
  const { token, setConnection, final, setFinal } = useContext(Context_Connection)

  useEffect(() => {
    const newSocketProviding = io('https://connection-project-backend.onrender.com', {
      auth: {
        serverOffset: 0,
        token: token
      },
      transports: ['websocket', 'polling']
    })

    useRefSocket.current = newSocketProviding

    newSocketProviding.on('connect', () => {
      newSocketProviding.emit('initial datas')
      useRefSocket.current.emit('message allow', token, location?.state?.value?.token)
    })

    const requestPass = (setRequest) => {
      setPending(setRequest)
      setUserRequest((prev) => [...prev, setRequest])
    }

    const deletedUser = (deleted) => {
      let newData = deleted?.filter((items) => {
        return items?.request === location?.state?.value?.token && items?.accepted === false && items?.token === token
      })
      setUserRequest(newData)
    }

    const UserDetet = () => {

      setRequestAccept([])
    }
    const acceptHandler = (accepted) => {
      setRequestAccept((pre) => [...pre, accepted])
    }

    const previosAcceptHandler = (previos) => {
      setRequestAccept(previos)
    }

    const userRequestList = (requestList) => {

      let newData = requestList?.filter((items) => {
        return items?.request === location?.state?.value?.token && items?.accepted === false && items?.token === token
      })
      setUserRequest(newData)
    }

    newSocketProviding.on('accept', acceptHandler)
    newSocketProviding.on('previos accept', previosAcceptHandler)
    newSocketProviding.on('user request list', userRequestList)
    newSocketProviding.on('server responce', requestPass)
    newSocketProviding.on('user request', deletedUser)
    newSocketProviding.on('user deleted', UserDetet)
    newSocketProviding.on('previos delete', (prev) => {
      setStoreREQ(prev)
    })


    return () => {
      newSocketProviding.off('user request list', userRequestList)
      newSocketProviding.off('message allow')
      newSocketProviding.off('accept', acceptHandler)
      newSocketProviding.off('previos accept', previosAcceptHandler)
      newSocketProviding.off('previos delete')
      newSocketProviding.off('user deleted', UserDetet)
      newSocketProviding.off('server responce', requestPass)
      newSocketProviding.off('user request', deletedUser)
      newSocketProviding.disconnect()
    }

  }, [token])

  // -------------userConnection request to backend------------------------
  const connectionreqTobackend = async (userData) => {
    useRefSocket.current.emit('request user data to server', userData, token)
    setFinal(false)
    setConnection(false)
    localStorage.setItem('moving', JSON.stringify(false))

  }

  // ----------------user request cancel-----------------------
  const RequestCancel = async (cancel) => {
    const cancelREQ = cancel.email
    useRefSocket.current.emit('user request cancel or unfollw', cancelREQ, token, cancel)
  }

  return (

    <div className='main-container'>
      <div className='heder-container'>
        <div className='text-container'>
          <div className='profile-letter'>
            {location?.state?.value?.email?.charAt(0)?.toUpperCase()}
          </div>
          <span className='user-data'> {location?.state?.value?.firstName}</span>
          <span className='user-data'> {location?.state?.value?.lastName}</span>
        </div>
        <span className='user-data'> {location?.state?.value?.email}</span>


        <div className='user-id-controal'>
          {
            requestAccept[0]?.token === token ? <div>
              <div className='to-message'>
                <button className='message' onClick={() => navigate('/message', { state: { token: token, selectedUser: location.state.value.token, selectedUserName: location.state.value } })}>message</button>
              </div>
              <div className='unfollow-user'>
                <div className='unfollow-body'>
                  {<button className='unfollow' onClick={(() => RequestCancel(location.state.value))}>Unfollow</button>

                  }
                  <button onClick={() => navigate('/')}>Back</button>
                </div>
              </div>
            </div> : <div className='connection-last'>
              <div className='connection-container'>

                <div>

                  <div>
                    {
                      userRequest[0]?.accepted === false && userRequest[0]?.token === token ?
                        <div className='final-request-container'>
                          <div className='final-request-head'>
                            <div className='final-request'>
                              {<button className='request' onClick={(() => RequestCancel(location.state.value))}>Requested</button>}
                            </div>
                            <div className='back-to-home-head'>
                              <button className='back-to-home' onClick={() => navigate('/')}>Back</button>
                            </div>
                          </div>
                        </div> :
                        <div className='button-box'>
                          <button onClick={() => setFinal(true)} className='user-cunection'>connect</button>
                          <button className='back-to-home' onClick={() => navigate('/')}>Back</button>
                          {
                            final ? <div className='final-container'>
                              <div className='final-head'>
                                <span className='final-text'>final connection</span>
                                <div>
                                  <button className='final-connection' onClick={() => connectionreqTobackend(location?.state?.value)}>should this connect ?</button>
                                </div>
                              </div>
                            </div> : <div></div>

                          }
                        </div>

                    }
                  </div>
                </div>

              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
export default ConnectionREQ
