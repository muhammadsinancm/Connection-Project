import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './UserNotifications.css'
import { Context_Connection } from '../Contect/ContextBrowser'
import { Bell, Settings, Trash2, User, X } from 'lucide-react'
import { toast } from 'react-toastify'
import { io } from 'socket.io-client'
import { useRef } from 'react'

export function Notifications() {

    const { token } = useContext(Context_Connection)

    const [notification, setNotification] = useState([])
    const [latestData, setLatestData] = useState([])
    const [accepted, setAccepted] = useState([])
    const useRefSocket = useRef(null)

    useEffect(() => {
        const newSocketProviding = io('https://connection-project-backend.onrender.com', {
            auth: { serverOffset: 0 },
            transports: ['websocket', 'polling']
        })

        useRefSocket.current = newSocketProviding

        newSocketProviding.on('connect', () => {
            newSocketProviding.emit('initial datas')
        })

        const userRequest = (datas) => {
            setNotification(datas)
        }

        const serverResponce = (latest) => {
            setNotification((pre) => [...pre, latest])
        }

        const acceptHandler = (accepted) => {
            setAccepted(accepted)
        }

        const userDeleted = (data) => {
            setNotification((pre) => [...pre, data])
        }

        newSocketProviding.on('user request', userRequest)
        newSocketProviding.on('server responce', serverResponce)
        newSocketProviding.on('accept', acceptHandler)
        newSocketProviding.on('user deleted', userDeleted)

        return () => {
            newSocketProviding.off('accept', acceptHandler)
            newSocketProviding.off('server responce', serverResponce)
            newSocketProviding.off('user request', userRequest)
            newSocketProviding.off('user deleted', userDeleted)
            newSocketProviding.disconnect()
        }
    }, [])

    useEffect(() => {
        if (!notification || notification.length === 0) return

        let newData = notification?.filter((items) => {
            return items?.request === token && items?.accepted === false
        })

        setLatestData(newData)
    }, [notification])

    // ----------------User accept-------------------------
    const Accept = async (userAcceptData) => {

        toast.success("Request Accepted", {
            className: "custom-toast-copy-text",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
        });

        useRefSocket.current.emit('accept user request', userAcceptData, token)
    }

    const Ignore = async (cancel) => {

        toast.success('Request removed', {
            className: "custom-toast-delete-text",
            icon: <Trash2 size={20} color="white" />,
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: false,
        })

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
    const [userDataSave, setUserDataSave] = useState(() => {
        const user = localStorage.getItem('profile data')
        return user ? JSON.parse(user) : []
    })
    const [listOfRequest, setListOfRequest] = useState([])
    const [count, setCount] = useState([])

    const { token } = useContext(Context_Connection)

    useEffect(() => {
        const newSocketProviding = io('https://connection-project-backend.onrender.com', {
            auth: { serverOffset: 0 },
            transports: ['websocket', 'polling']
        })

        newSocketProviding.on('connect', () => {
            newSocketProviding.emit('user token sent to server', token);
            newSocketProviding.emit('initial datas')
        });

        const request = (REQ) => {
            setListOfRequest(REQ)
        }

        const serverResponce = (newRequest) => {
            setListOfRequest((pre) => [...pre, newRequest])
        }

        const previosDataDelete = (deletedUser) => {
            setListOfRequest((pre) => [...pre, deletedUser]);
        }

        newSocketProviding.on('server responce', serverResponce)
        newSocketProviding.on('user request', request)
        newSocketProviding.on('user deleted', previosDataDelete)

        newSocketProviding.on('responce for client', async (person) => {
            setUserDataSave(person)
            localStorage.setItem('profile data', JSON.stringify(person))
        })

        return () => {
            newSocketProviding.off('responce for client')
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

        const storeRequestCount = []
        setCount(storeRequestCount)
        for (const key in newData) {
            storeRequestCount.push(Number(key) + 1)
        }

    }, [listOfRequest]);


    const navigate = useNavigate()
    // console.log(count[count.length - 1]);

    const LogOut = () => {
        localStorage.removeItem('token')
        navigate('/loginorSing')
    }

    const UserProfile = async () => {
        setUserIcon(!userIcon)

    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
