import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './UserNotifications.css'
import { Context_Connection } from '../Contect/ContextBrowser'
import { Bell, MessageCircleQuestion, Settings, Trash2, User, X } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'

export function Notifications() {
    const { storeRequest, backendURL, token } = useContext(Context_Connection)
    console.log(storeRequest);

    // ----------------User accept-------------------------
        const Accept = async (userAcceptData)=> {
             toast.success("Request Accepted", {
              className: "custom-toast-copy-text",
              autoClose: 2000,
              hideProgressBar: true,
              closeButton: false,
            });

           try {
    
               const responceAccept = await axios.post(backendURL + '/api/user/accept', { userAcceptData, token, storeRequest }, {headers:{token}})
               if (responceAccept.data.success) {
                   const permanent = responceAccept.data.saving
                   console.log(permanent);
               }
    
           } catch (error) {
               console.log(error.message);
           }
           
        }
    
        const Ignore = async (ingoreUser)=> {
             toast.success('Request removed', {
          className: "custom-toast-delete-text",
          icon:<Trash2 size={20} color="white"/>,
          autoClose:3000,
          hideProgressBar: true,
          closeButton: false,
        })
       const userIgnoreData = ingoreUser?.token

       try {

        const responce = await axios.delete(backendURL + `/api/user/ignore/${userIgnoreData}`, {headers:{token}})
        if (responce.data.success) {
            console.log(responce.data.message);
        } else {
            console.log(responce.data.message);
        }
        
       } catch (error) {
        console.log(error.message);
       }
       
        }
    
   return (
        <div className='container-notification'>
            <div className='head-notification'>
                <span className='notification-text'>notifications For You</span>
                    {storeRequest ?
                        storeRequest.map((items, index) => (
                            <div key={index}>
                                <span className='first-name'>{items.firstName}  {items.lastName}</span><br />
                                <span className='user-email'>{items.email}</span> 
                                <button className='button-accept' onClick={()=> Accept(items)}>Accept</button>
                                <button className='butoon-ignore' onClick={()=> Ignore(items)}>Ignore</button>
                            </div>
                        )) : ''
                    }
            </div>
        </div>
  )
}

function Profile() {


    const { storeCount, backendURL, token } = useContext(Context_Connection)
    console.log(storeCount);  
    
    const [allow, setAllow] = useState(false)
    const [userIcon, setUserIcon] = useState(false)
    const [userDataSave, setUserDataSave] = useState([])

    const navigate = useNavigate()
    console.log(storeCount[storeCount.length - 1]);
    
    const LogOut = () => {
        navigate('/loginorSing')
    }

    const UserProfile = async () => {

        setUserIcon(!userIcon)

        try {

            const responce = await axios.post(backendURL + '/api/user/userProfile', { token }, {headers:{token}})

            if (responce.data.success) {
                setUserDataSave(responce.data.userDataFinding)
            }
            else {
                console.log(responce.data.message);
            }

        } catch (error) {
            console.log(error.message);
        }

    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

            <div style={{ padding: '8px', cursor: 'pointer' }} title="Support">
               <MessageCircleQuestion size={25} />
            </div>
            <div onClick={() => {setAllow(!allow)}} style={{ padding: '8px', cursor: 'pointer' }} title="Notification">
                <div style={{ position: "relative", display: "inline-block" }}>
                    <Bell size={25} style={{marginTop:'7px'}} className="icon-shake-once cursor-pointer" />
                    {storeCount.length > 0 ?
                        <span style={{
                            position: "absolute",
                            top: "2px",
                            right: "-3px",
                            background: "#0066ff",
                            borderRadius: "50%",
                            width: "15px",
                            height: "15px",
                            paddingLeft:'3px',
                            color:'white',
                            marginTop:'0px',
                            fontSize:'small',
                            fontFamily:'revert',
                            fontWeight:'lighter',
                        }}>{storeCount[[storeCount.length - 1]]}
                        </span> : ''
                    }
                </div>

                 <div>
                    { allow &&
                        <Notifications/>
                    }
                 </div>
                        

            </div>
            <div style={{ padding: '8px', cursor: 'pointer' }} title="Settings">
                <Settings size={25} />
            </div>           

            <div className='hover-container' title='Profile' onClick={()=> UserProfile()}>
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
                    <button className='log-out' onClick={()=> LogOut()}>Log Out</button>
                    <button className='close-button'><X onClick={()=> setUserIcon(!userIcon)} size={35} style={{ paddingLeft: '3px' }} color='#0066ff' /></button>
                </div>
            </div> : ''
                }
            </div>
        </div>
    )
}

export default Profile
