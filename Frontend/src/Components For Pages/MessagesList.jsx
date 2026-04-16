import React, { useContext, useEffect, useState } from 'react'
import { Context_Connection } from '../Contect/ContextBrowser'
import './MessagesList.css'
import { useNavigate } from 'react-router-dom'
import { BeatLoader } from "react-spinners";
import { BookOpen, MessageCircle, MessageSquare, X } from 'lucide-react'
import { io } from 'socket.io-client'
import { useRef } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../config/db'
function MessagesList() {

  const { token, storeEmails } = useContext(Context_Connection)

  const [open, setOpen] = useState(false)
  const [messageControal, setMessageControal] = useState(true)
  const [time, setTime] = useState(false)
  const [dataSave, setDataSave] = useState([])
  const useRefSocket = useRef(null)
  const [localtext, setLocalText] = useState()
  const [userTextsUpdated, setUserTextsUpdated] = useState()

  const navigate = useNavigate()

  const newUserData = localtext?.filter((items) => {
    return items?._id === dataSave?._id
  })

  const newUserDataAdding = newUserData?.map((items) => {
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
    const changed = localtext?.map((item) => {
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
    setUserTextsUpdated((changed || []).reverse())
  }

  useEffect(() => {
    changeData()

  }, [localtext])

  const removeDuplicates = async () => {
    const all = await db.todos.toArray();

    const seen = new Set();
    const duplicateIds = [];

    all.forEach(msg => {
      if (seen.has(msg._id)) {
        duplicateIds.push(msg.id);
      } else {
        seen.add(msg._id);
      }
    });

    if (duplicateIds.length > 0) {
      await db.todos.bulkDelete(duplicateIds);
    }
  };

  useEffect(() => {
    removeDuplicates();
  }, []);

  const allMessages = useLiveQuery(() => db.todos.toArray());

  useEffect(() => {
    const seen = new Set()
    const userMessage = allMessages?.filter((items) => {
      if (seen.has(items?._id)) return false;
      seen.add(items?._id)
      return items?.recivedUserToken === token
    })
    setLocalText(userMessage)

  }, [allMessages])

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
      newSocketProviding.emit('user message old')
    })

    newSocketProviding.on('user message', async (data) => {
      await db.todos.add(data);
      setTime(true)
    })

    const messageDeleted = async (messages) => {
      await db.transaction("rw", db.todos, async () => {
        for (const msg of messages) {
          await db.todos.put(msg);
        }
      });
      const updatedIds = messages.map((m) => m._id);
      await db.todos
        .filter((msg) => !updatedIds.includes(msg._id))
        .delete();
    }
    const userTextsToFrontend = async (messages) => {
      await db.transaction("rw", db.todos, async () => {
        for (const msg of messages) {
          await db.todos.put(msg);
        }
      });
      const updatedIds = messages.map((m) => m._id);
      await db.todos
        .filter((msg) => !updatedIds.includes(msg._id))
        .delete();
    }

    newSocketProviding.on('user message deleted', messageDeleted)
    newSocketProviding.on('user message old', userTextsToFrontend)

    return () => {
      newSocketProviding.off('user message old', userTextsToFrontend)
      newSocketProviding.off('user message deleted', messageDeleted)
      newSocketProviding.off('user message')
      newSocketProviding.disconnect()
    }
  }, [])

  const MessageToUser = async (text) => {
    const storeEmailsClone = structuredClone(storeEmails)

    if (text?.recivedUserToken === token) {
      navigate('/message', { state: { token: token, selectedUser: text.sendingUserToken, selectedUserName: storeEmailsClone } })
    } else {
      return null
    }
  }

  useEffect(() => {
    if (localtext?.length > 0) {
      setTime(true);
    }
  }, [localtext]);

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