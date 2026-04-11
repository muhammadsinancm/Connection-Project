import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context_Connection } from '../Contect/ContextBrowser'
import './MessagesList.css'
import { useNavigate } from 'react-router-dom'
import { BeatLoader } from "react-spinners";
import { BookOpen, MessageCircle, MessageSquare, Trash2, X } from 'lucide-react'
import { toast } from 'react-toastify'
import { io } from 'socket.io-client'
import { useRef } from 'react'

function MessagesList() {

  const { backendURL, token, storeEmails, locationUser } = useContext(Context_Connection)
  const [userTexts, setUserTexts] = useState([])
  const [open, setOpen] = useState(false)
  const [messageControal, setMessageControal] = useState(true)
  const [time, setTime] = useState(false)
  const [dataSave, setDataSave] = useState([])
  const useRefSocket = useRef(null)

  const clone = structuredClone(userTexts)
  const [userTextsUpdated, setUserTextsUpdated] = useState(clone)

  const navigate = useNavigate()

  const newUserData = userTexts.filter((items) => {
    return items?._id === dataSave?._id
  })

  const newUserDataAdding = newUserData.map((items) => {
    let date = items?.date
    const setDate = new Date(date)
    const hours = setDate.getHours();
    const minutes = setDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    let dates = `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm} ${setDate.getDate()}/${setDate.getMonth() + 1}/${setDate.getFullYear()}`;

    return {
      userText: items?.userText,
      date: dates,
      emailForUser: items?.emailForUser,
      recivedUserToken: items?.recivedUserToken,
      sendingUserToken: items?.sendingUserToken,
      _id: items?._id
    }

  })

  const changeData = () => {
    const changed = userTexts.map((item) => {
      let oldDate = item?.date

      const date = new Date(oldDate)
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      let dates = `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

      if (item?.userText.length < 10) {
        return {
          userText: item?.userText,
          date: dates,
          emailForUser: item?.emailForUser,
          recivedUserToken: item?.recivedUserToken,
          sendingUserToken: item?.sendingUserToken,
          _id: item?._id
        }
      }
      return {
        userText: item?.userText.slice(0, 21) + '...',
        date: dates,
        emailForUser: item?.emailForUser,
        recivedUserToken: item?.recivedUserToken,
        sendingUserToken: item?.sendingUserToken,
        _id: item?._id
      }
    })
    setUserTextsUpdated(changed.reverse())
  }
console.log(newUserDataAdding);

  useEffect(() => {
    changeData()

  }, [userTexts])

  useEffect(()=> {
   
    const newSocketProviding = io('https://connection-project-frontend.onrender.com', {
      auth:{
        serverOffset: 0,
        token:token
      },
       transports: ['websocket', 'polling']
    })
    
    useRefSocket.current = newSocketProviding
    

    newSocketProviding.on('connect', () => {
      newSocketProviding.emit('initial datas')
      newSocketProviding.emit('user message old')
    })

    newSocketProviding.on('user message', (data) => {

      setUserTexts((pre)=> {
        const merged = [...pre, data];
        const filtered = merged.filter((items)=> items?.recivedUserToken === token)
        return [...new Map(filtered.map((item) => [item._id, item])).values()]
      })
      setTime(true)
    })
    

    newSocketProviding.on('user message old', (data) => {
      console.log(data);
      setUserTexts(data.filter((items)=> items?.recivedUserToken === token))
      setTime(true)
    })

    newSocketProviding.on

    
    return ()=> {
      newSocketProviding.off('user message old')
      newSocketProviding.off('user message')
      newSocketProviding.disconnect()
    }

  }, [])
console.log(userTexts);

//   const messageDelete = async (userData) => {
//         useRefSocket.current.emit('user message delete', token, userData?.sendingUserToken, userData?._id)
// console.log(token);

// console.log(userData?.sendingUserToken);
// console.log(userData?._id);

//      toast.success('Message Deleted', {
//               className: "custom-toast-delete-text",
//               icon: <Trash2 size={20} color="white" />,
//               autoClose: 3000,
//               hideProgressBar: true,
//               closeButton: false,
//             })


//   }

  const MessageToUser = async (text) => {

    const storeEmailsClone = structuredClone(storeEmails)

    if (text?.recivedUserToken === token) {
      navigate('/message', { state: { token: token, selectedUser: text.sendingUserToken, selectedUserName: storeEmailsClone } })
    } else {
      return null
    }
  }

  return (
    <div className='container'>
      <div className='message-container'>
        <h2 className='message-text'>MessagesList</h2>
      </div>
      <div>
        <div className='items-container'>
          {time ? userTextsUpdated?.map((items, index) => (

            <div key={index}>
              <div className='items-heder'>
                <div className='hover'>
                  <button className='user-select' onClick={() => { setOpen(true), setDataSave(items), setMessageControal(false) }}><BookOpen size={20} /></button>
                  <button className='user-select' onClick={() => MessageToUser(items)}><MessageCircle size={20} /></button>
                  {/* <button className='user-select' onClick={() => messageDelete(items)}><Trash2 size={18} color='red' /></button> */}
                </div>
                <button className='user-select' ><MessageSquare size={25} /></button>

                <label className='user-emails'>{items?.emailForUser}</label>
                <span className='user-text'>{items?.userText}</span>
                <span className='user-date'>{items?.date}</span>

              </div>

            </div>

          )) : <BeatLoader color="#0066ff" size={20} className='custom-loading-spinner ' />

          }
        </div>
        <div>

          {
            open ? <div className='overlay'>
              <div className='modal'>
                <h2 className='user-email-new'>From: {newUserDataAdding[0]?.emailForUser}</h2>
                <p className='user-message-new'>{newUserDataAdding[0]?.userText}</p>
                <span className='user-message-date'>{newUserDataAdding[0]?.date}</span>
                <button className='close-button' onClick={() => setOpen(false)}><X size={35} style={{ paddingLeft: '3px' }} color='#0066ff' /></button>
              </div>
            </div> : ''
          }

        </div>
      </div>
    </div>
  )
}

export default MessagesList

export function MessageOpen({ value }) {
  console.log(value);

  return (
    <div className='open-container'>
      <div className='open-head'>
        <div className='open-selected'>
          <h1 className='open-text'>{value?.emailForUser}</h1>
        </div>
        <div>
          <span>remove</span>
        </div>
      </div>
    </div>
  )
}