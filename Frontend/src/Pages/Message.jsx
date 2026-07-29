import { useContext, useEffect, useState } from "react";
import ContextBrowser, { Context_Connection } from "../Contect/ContextBrowser";
import { useLocation, useNavigate } from "react-router-dom";
import './Message.css';
import { TextSelecteClear } from "../Contect/Context";
import { toast } from "react-toastify";
import './Toast.css'
import { Home } from 'lucide-react'
import { BeatLoader } from "react-spinners";
import { io } from "socket.io-client";
import { useRef } from "react";
import { db } from "../config/db";
import { useLiveQuery } from 'dexie-react-hooks'

export function ChatHeader({ responceText }) {

  const navigate = useNavigate()

  return (
    <div className="chat-header">
      <button className="back-btn" onClick={() => navigate('/')}><Home size={20} />Home</button>
      <div className="header-info">
        <div className="avatar">{responceText?.userName?.email?.charAt(0)?.toUpperCase() || responceText?.userDataFind[0]?.email?.charAt(0)?.toUpperCase()}</div>
        <div className="user-profile">
          <h3 className="user-email">{responceText?.userName?.email || responceText?.userDataFind[0]?.email}</h3>
        </div>
      </div>
    </div>
  )
}

export function Messages({ data }) {

  const [dataSaved, setDataSaved] = useState([data])
  const [sendingUserToken, setSendingUserToken] = useState('')
  const [recivedUserToken, setRecivedUserToken] = useState('')
  const [selectPopUp, setSelectPopUp] = useState(null)
  const [loading, setLoading] = useState(false)

  let time = data.date
  const date = new Date(time)

  const time12 = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  })

  const { token } = useContext(Context_Connection)

  const location = useLocation() //This location come from ConnectionREQ.js


  useEffect(() => {

    //This token is message sending user
    setSendingUserToken(location.state?.token)
    // This token is reciver
    setRecivedUserToken(location.state?.selectedUser)

  }, [sendingUserToken, recivedUserToken, dataSaved])

  const datasss = dataSaved.filter((itmes) => (
    itmes?.recivedUserToken !== token
  ))

  const datasssss = dataSaved.filter((itmes) => (
    itmes?.recivedUserToken === token
  ))

  useEffect(() => {
    setLoading(true)

  }, [selectPopUp])

  return (
    <>
      {
        loading ? <div>
          {datasssss[0]?.userText && (
            <div className="row theirs">
              <div onClick={() => setSelectPopUp(datasssss[0] === selectPopUp ? null : datasssss[0])} className="bubble theirs">
                <span className="text">{datasssss[0]?.userText}</span>
                <span className="time">{time12}</span>
              </div>
            </div>
          )}
        </div> : <BeatLoader color="#0066ff" size={10} className="row theirs" />
      }

      {
        loading ? <div>
          {datasss[0]?.userText && (
            <div className="row mine">
              <div onClick={() => setSelectPopUp(datasss[0] === selectPopUp ? null : datasss[0])} className="bubble mine">
                <span className="text">{datasss[0]?.userText}</span>
                <span className="time">{time12}</span>
              </div>
            </div>
          )}
        </div> : <BeatLoader color="#0066ff" className="row mine" size={10} />
      }
      {
        selectPopUp ? <div>
          <TextSelecteClear.Provider value={{ selectPopUp, setSelectPopUp }}>
            <PopUp tokens={location} />
          </TextSelecteClear.Provider>

        </div> : ''
      }
    </>
  )
}

export function CopyIcon() {

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

export function ReplayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 00-4-4H4" />
    </svg>
  );
}

export function DeleteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}

export function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export function SendIcon() {

  return (
    <div>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    </div>
  );
}

export function PopUp({ tokens }) {

  const { token } = useContext(Context_Connection)

  const { selectPopUp, setSelectPopUp } = useContext(TextSelecteClear)

  const useRefSocket = useRef(null)

  useEffect(() => {

    const newSocketProviding = io('http://localhost:4000', {
      auth: {
        serverOffset: 0,
        token: token
      },
      transports: ['websocket', 'polling']
    })

    useRefSocket.current = newSocketProviding

    const loadLocalMessages = async () => {
    }
    loadLocalMessages()

    newSocketProviding.on('connect', () => {
      newSocketProviding.emit('initial datas')
      newSocketProviding.emit('user message previos', token, location.state?.selectedUser)

      if (token && tokens?.state?.selectedUser) {
        newSocketProviding.emit('message join', token, tokens?.state?.selectedUser)
      }
    })

    return () => {
      newSocketProviding.disconnect()
    }

  }, [])

  const textCopy = (event) => {
    toast.success("Message copy", {
      className: "custom-toast-copy-text",
      icon: "✅",
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false,
    });

    setSelectPopUp(null)
    console.log(event);
    navigator.clipboard.writeText(event).catch(() => { });

  }

  const textDelete = async (EventDelete) => {
    const item = await db.todos.where("_id").equals(EventDelete).first();
    if (item) {
      await db.todos.delete(item.id); // item.id = Dexie auto-increment key
    }

    useRefSocket.current.emit('user message delete', tokens?.state?.token, tokens?.state?.selectedUser, EventDelete)
  }

  return (
    <div className={`user-select-container${selectPopUp._id}`}>
      <div onClick={() => textCopy(selectPopUp?.userText)} className="item">
        <CopyIcon /> <label>Copy</label>

      </div>
      <div className="item">
        <ReplayIcon /> Reply
      </div>
      {
        selectPopUp.sendingUserToken === token && (
          <div onClick={() => textDelete(selectPopUp?._id)} className="item danger">
            <DeleteIcon /> Delete
          </div>
        )}

    </div>
  )
}

//--------------------This is user message and send button------------------------ 
export function InputBar() {

  const { sendingUserToken, setSendingUserToken, recivedUserToken, token, setRecivedUserToken } = useContext(Context_Connection)
  const [saveUserText, setSaveUserText] = useState('')
  const [sender, setSender] = useState([])
  const useReffSocket = useRef(null)

  const location = useLocation() //This location come from ConnectionREQ.js

  //Control two states______________________________________________
  useEffect(() => {
    setSendingUserToken(location.state?.token) //This token is message sending user
    setRecivedUserToken(location.state?.selectedUser) // This token is reciver


  }, [sendingUserToken, recivedUserToken])

  useEffect(() => {
    const newSocketProviding = io('http://localhost:4000', {
      auth: {
        serverOffset: 0,
        token: token
      },
      transports: ['websocket', 'polling']
    })
    useReffSocket.current = newSocketProviding

    newSocketProviding.on('connect', () => {
      newSocketProviding.emit('user token sent to server', token);
      newSocketProviding.emit('initial datas')
    })

    newSocketProviding.on('responce for client', async (person) => { setSender(person) })

  }, [])

  const userInputForSelectedUser = async (userEvent) => {
    userEvent.preventDefault()
    setSaveUserText('')
    useReffSocket.current.emit('user message send', location.state?.token, location.state?.selectedUser, saveUserText, sender)
  }
  return (

    <div className="input-bar">
      <form onSubmit={userInputForSelectedUser} className="input-bar form">
        <input className="user-input" onChange={(e) => setSaveUserText(e.target.value)} value={saveUserText} type="text" placeholder="Type a message..." />
        <button className="send-btn" type='submit'><SendIcon /></button>
      </form>
    </div>
  );
}

//-----------------------------End-------------------------------------


function Message() {
  const [responceText, setResponceText] = useState([])
  const [speshal, setSpeshal] = useState([])
  const [userTextResponceData, setUserTextResponceData] = useState([]) //All users texts come here
  const [textSaved, setTextSaved] = useState([])
  const [userName, setUserName] = useState('')

  const useRefSocket = useRef(null)

  const { token, sendingUserToken, setSendingUserToken, recivedUserToken, setRecivedUserToken } = useContext(Context_Connection)

  const location = useLocation() //This location come from ConnectionREQ.js

  //Control two states
  useEffect(() => {
    setSendingUserToken(location.state?.token) //This token is message sending user
    setRecivedUserToken(location.state?.selectedUser) // This token is reciver
    setUserName(location.state?.selectedUserName)
  }, [sendingUserToken, recivedUserToken, userName])

  const userDataFind = Object.values(userName).filter((items) => {
    return items?.token === recivedUserToken
  })

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


  const messages = useLiveQuery(() =>
    db.todos.where("roomID").equals([token, location.state?.selectedUser].sort().join("-"))
      .sortBy("date", [token, location.state?.selectedUser]))

  useEffect(() => {
    const message = messages?.filter((itmes) => (
      itmes?._id !== messages?._id
    ))

    setUserTextResponceData(message)
    setSpeshal(message)
  }, [messages])

  useEffect(() => {
    const newSocketProviding = io('http://localhost:4000', {
      auth: {
        serverOffset: 0,
        token: token
      },
      transports: ['websocket', 'polling']
    })
    useRefSocket.current = newSocketProviding

    newSocketProviding.on('connect', () => {
      newSocketProviding.emit('initial datas')
      newSocketProviding.emit('user message previos', token, location.state?.selectedUser)

      if (token && location.state?.selectedUser) {
        newSocketProviding.emit('message join', token, location.state?.selectedUser)
      }
    })

    const userLatestMessages = async (messages) => {
      await db.todos.add(messages);
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

    newSocketProviding.on('user message deleted', messageDeleted)
    newSocketProviding.on('user message previos', userTextsToFrontend)
    newSocketProviding.on('user message show', userLatestMessages)

    return () => {
      newSocketProviding.off('user message deleted', messageDeleted)
      newSocketProviding.off('user message previos', userTextsToFrontend)
      newSocketProviding.off('user message show', userLatestMessages)
      newSocketProviding.disconnect()
    }

  }, [])

  useEffect(() => {

    const dataToArray = Array.isArray(userTextResponceData) ? userTextResponceData : Object.values(userTextResponceData || [])

    const send = dataToArray.filter((itmes) => (
      itmes?.sendingUserToken === token && itmes?.recivedUserToken === recivedUserToken
    ))
    setResponceText(send)

    const dataToArraySpeshal = Array.isArray(speshal) ? speshal : Object.values(speshal || [])

    const FinalFilterTexts = dataToArraySpeshal.filter((item) => (
      item?.sendingUserToken === recivedUserToken && item?.recivedUserToken === token
    ))
    setTextSaved(FinalFilterTexts)

  }, [userTextResponceData, speshal])


  const mixedMessages = [...responceText, ...textSaved].sort((a, b) => (
    new Date(a?.date).getTime() - new Date(b?.date).getTime()
  ))

  const newDatas = mixedMessages.filter((items, index, self) => {
    return index === self.findIndex((m) => m._id === items._id)
  })

  return (

    <div className="chat">
      <ChatHeader responceText={{ userName, userDataFind }} />

      <div className="messages">
        {Array.isArray(newDatas) &&
          Object.values(newDatas).map((items, index) => (
            <Messages key={items?._id || index} data={items} />
          ))
        }
      </div>
      <InputBar />
    </div>

  )
}

export default Message
