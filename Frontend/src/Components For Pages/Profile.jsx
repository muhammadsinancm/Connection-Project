import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './UserNotifications.css'
import { Context_Connection } from '../Contect/ContextBrowser'
import { Bell, MessageCircleQuestion, Settings, Trash2, User, X } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { io } from 'socket.io-client'
import { useRef } from 'react'

export function Notifications() {
    
    const { backendURL, token } = useContext(Context_Connection)

    const [notification, setNotification] = useState([])
    const [latestData, setLatestData] = useState([])
    const [accepted, setAccepted] = useState([])
    const useRefSocket = useRef(null)

    useEffect(()=> {
     const newSocketProviding = io('http://localhost:4000', {
     auth:{serverOffset: 0},
     transports: ['websocket', 'polling']
   })

   useRefSocket.current = newSocketProviding

   newSocketProviding.on('connect', () => {
    newSocketProviding.emit('initial datas')
   })

   const userRequest = (datas)=> {
     setNotification(datas)
   }

   const serverResponce = (latest)=> {
      setNotification((pre)=> [...pre, latest])
      
   }

   const acceptHandler = (accepted) => {
    setAccepted(accepted)
    }

    const previosAcceptHandler = (previos) => {

    }

    const messageAcceptHandler = (messageAccept)=> {

    }

   newSocketProviding.on('user request', userRequest)
   newSocketProviding.on('server responce', serverResponce)
   newSocketProviding.on('accept', acceptHandler)
   newSocketProviding.on('previos accept', previosAcceptHandler)
   newSocketProviding.on('message accept', messageAcceptHandler)
   newSocketProviding.on('previos delete', (deleted)=> {
    console.log(deleted);
    
   })

   return()=> {
    newSocketProviding.off('previos delete')
    newSocketProviding.off('message accept', messageAcceptHandler)
    newSocketProviding.off('accept', acceptHandler)
     newSocketProviding.off('previos accept', previosAcceptHandler)
     
    newSocketProviding.off('server responce', serverResponce)
    newSocketProviding.off('user request', userRequest)
    newSocketProviding.disconnect()
   }

    }, [])
console.log(accepted);
console.log(latestData);

    useEffect(()=> {
if (!notification || notification.length === 0) return

    let newData = notification?.filter((items) => {
      return items?.request === token && items?.accepted === false
    })

setLatestData(newData)
    }, [notification])

    // ----------------User accept-------------------------
    const Accept = async (userAcceptData) => {
        console.log(userAcceptData);
        
        toast.success("Request Accepted", {
            className: "custom-toast-copy-text",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
        });

       useRefSocket.current.emit('accept user request', userAcceptData, token)

    }


// 1@gmail.com email
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OGM1MjBlMjg1MjE4NDkzZmIxZTcwZCIsImlhdCI6MTc3MDgwNjQxMn0.TLthE-qh6qVWSjLSIjbVWx6rDfXTk9unuNS3gc1sy9Y token
// {
//   _id: '69d2a5c957544ccb862255cb',
//   firstName: 'muhammad',
//   lastName: ' sinan',
//   email: '1@gmail.com',
//   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OGM1MTllMjg1MjE4NDkzZmIxZTcwNiIsImlhdCI6MTc3MDgwNjY1NX0.CBIlGsrW0T5J0SwQH021cpMgxX_nkQPqV-HJVHO4BfI',
//   request: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OGM1MjBlMjg1MjE4NDkzZmIxZTcwZCIsImlhdCI6MTc3MDgwNjQxMn0.TLthE-qh6qVWSjLSIjbVWx6rDfXTk9unuNS3gc1sy9Y',
//   reciver: 'muhammadsinancm30@gmail.com',
//   accepted: false,
//   roomId: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OGM1MTllMjg1MjE4NDkzZmIxZTcwNiIsImlhdCI6MTc3MDgwNjY1NX0.CBIlGsrW0T5J0SwQH021cpMgxX_nkQPqV-HJVHO4BfI-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OGM1MjBlMjg1MjE4NDkzZmIxZTcwZCIsImlhdCI6MTc3MDgwNjQxMn0.TLthE-qh6qVWSjLSIjbVWx6rDfXTk9unuNS3gc1sy9Y',
//   date: '2026-04-05T18:11:21.624Z',
//   __v: 0
// } cancel user data
// User disconnected
// ++++++++++++++++++++++++++++++
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OGM1MTllMjg1MjE4NDkzZmIxZTcwNiIsImlhdCI6MTc3MDgwNjY1NX0.CBIlGsrW0T5J0SwQH021cpMgxX_nkQPqV-HJVHO4BfI-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OGM1MjBlMjg1MjE4NDkzZmIxZTcwZCIsImlhdCI6MTc3MDgwNjQxMn0.TLthE-qh6qVWSjLSIjbVWx6rDfXTk9unuNS3gc1sy9Y
// [
//   {
//     _id: new ObjectId('69d2a5c957544ccb862255cb'),
//     firstName: 'muhammad',
//     lastName: ' sinan',
//     email: '1@gmail.com',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OGM1MTllMjg1MjE4NDkzZmIxZTcwNiIsImlhdCI6MTc3MDgwNjY1NX0.CBIlGsrW0T5J0SwQH021cpMgxX_nkQPqV-HJVHO4BfI',
//     request: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OGM1MjBlMjg1MjE4NDkzZmIxZTcwZCIsImlhdCI6MTc3MDgwNjQxMn0.TLthE-qh6qVWSjLSIjbVWx6rDfXTk9unuNS3gc1sy9Y',
//     reciver: 'muhammadsinancm30@gmail.com',
//     accepted: false,
//     roomId: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OGM1MTllMjg1MjE4NDkzZmIxZTcwNiIsImlhdCI6MTc3MDgwNjY1NX0.CBIlGsrW0T5J0SwQH021cpMgxX_nkQPqV-HJVHO4BfI-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OGM1MjBlMjg1MjE4NDkzZmIxZTcwZCIsImlhdCI6MTc3MDgwNjQxMn0.TLthE-qh6qVWSjLSIjbVWx6rDfXTk9unuNS3gc1sy9Y',
//     date: 2026-04-05T18:11:21.624Z,
//     __v: 0
//   }
// ]
// ++++++++++++++++++++++++++++++





    const Ignore = async (cancel) => {
        console.log(cancel);
        
        toast.success('Request removed', {
            className: "custom-toast-delete-text",
            icon: <Trash2 size={20} color="white" />,
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
        })
        
         const cancelREQ = cancel.reciver
         const cancelToken = cancel._id
      useRefSocket.current.emit('ingore user', cancelToken)

    }

    return (
        <div className='container-notification'>
            <div className='head-notification'>
                <span className='notification-text'>notifications For You</span>
                {latestData ?
                    latestData.map((items, index) => (
                        <div key={index}>
                            <span className='first-name'>{items?.firstName}  {items?.lastName}</span><br />
                            <span className='user-email'>{items?.email}</span>
                            <button className='button-accept' onClick={() => Accept(items)}>Accept</button>
                            <button className='butoon-ignore' onClick={() => Ignore(items)}>Ignore</button>
                        </div>
                    )) : ''
                }
            </div>
        </div>
    )
}

function Profile() {
 const [allow, setAllow] = useState(false)
    const [userIcon, setUserIcon] = useState(false)
    const [userDataSave, setUserDataSave] = useState([])
    const [listOfRequest, setListOfRequest] = useState([])
    const [count, setCount] = useState([])
    const [requests, setRequests] = useState([])

  const { backendURL, token } = useContext(Context_Connection)

useEffect(()=> {
     const newSocketProviding = io('http://localhost:4000', {
     auth:{serverOffset: 0},
     transports: ['websocket', 'polling']
   })

   newSocketProviding.on('connect', () => {
    newSocketProviding.emit('user token sent to server', token);
    newSocketProviding.emit('initial datas')
  });

  const request = (REQ)=> {
    console.log(REQ);
    
     setListOfRequest(REQ)
  }

  const serverResponce = (newRequest)=> {
     setListOfRequest((pre)=> [...pre, newRequest])   
  }

  const previosDataDelete = (deletedUser)=> {
    setListOfRequest((pre)=> [...pre, deletedUser]);
    
  }
  newSocketProviding.on('previos delete', (deleted)=> {
    console.log(deleted);
    
   })

  newSocketProviding.on('server responce', serverResponce)
  newSocketProviding.on('user request', request)
   newSocketProviding.on('user deleted', previosDataDelete)

   newSocketProviding.on('responce for client', async (person)=> {setUserDataSave(person)})

   return ()=> {
     newSocketProviding.off('previos delete')
    newSocketProviding.off('user deleted', previosDataDelete)
    newSocketProviding.off('server responce', serverResponce)
    newSocketProviding.off('user request', request)
     newSocketProviding.disconnect()
   }

    }, [token])     

 useEffect(() => {

    if (!listOfRequest || listOfRequest.length === 0) return

    let newData = listOfRequest?.filter((items) => {
      return items?.request === token && items?.accepted === false
    })

console.log(newData);

    const storeRequestCount = []
    // setStoreCount(storeRequestCount)
    setCount(storeRequestCount)
    for (const key in newData) {
      storeRequestCount.push(Number(key) + 1)
    }


  }, [listOfRequest]);


    const navigate = useNavigate()
    console.log(count[count.length - 1]);
console.log(count);

    const LogOut = () => {
        navigate('/loginorSing')
    }

    const UserProfile = async () => {

        setUserIcon(!userIcon)

    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

            <div style={{ padding: '8px', cursor: 'pointer' }} title="Support">
                <MessageCircleQuestion size={25} />
            </div>
            <div onClick={() => { setAllow(!allow) }} style={{ padding: '8px', cursor: 'pointer' }} title="Notification">
                <div style={{ position: "relative", display: "inline-block" }}>
                    <Bell size={25} style={{ marginTop: '0px' }} className="icon-shake-once cursor-pointer" />
                    {count.length > 0 ?
                        <span style={{
                            position: "absolute",
                            top: "1px",
                            right: "-3px",
                            background: "#0066ff",
                            borderRadius: "50%",
                            width: "15px",
                            height: "15px",
                            paddingLeft: '3px',
                            color: 'white',
                            marginTop: '0px',
                            fontSize: 'small',
                            fontFamily: 'revert',
                            fontWeight: 'lighter',
                        }}>{count[[count.length - 1]]}
                        </span> : ''
                    }
                </div>

                <div>
                    {allow &&
                        <Notifications />
                    }
                </div>


            </div>
            <div style={{ padding: '8px', cursor: 'pointer' }} title="Settings">
                <Settings size={25} />
            </div>

            <div className='hover-container' title='Profile' onClick={() => UserProfile()}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0066ff',
                    fontWeight: '500',
                    fontSize: '18px',
                    cursor: 'pointer',
                    marginTop: '-3px'
                }}>
                    <User size={25} />
                </div>
            </div>
            <div>
                {
                    userIcon ? <div className='contaioner-profile'>
                        <div className='head-profile'>
                            <div className='profile-letters'>
                                {userDataSave?.email?.charAt(0)?.toUpperCase()}
                            </div>
                            <label className='user-profile-email'>{userDataSave?.email}</label>
                            <span className='user-first-name'>{userDataSave?.firstName}  {userDataSave?.lastName}</span>
                            <button className='log-out' onClick={() => LogOut()}>Log Out</button>
                            <button className='close-button'><X onClick={() => setUserIcon(!userIcon)} size={35} style={{ paddingLeft: '3px' }} color='#0066ff' /></button>
                        </div>
                    </div> : ''
                }
            </div>
        </div>
    )
}

export default Profile
