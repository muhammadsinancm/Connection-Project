import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context_Connection } from "../Contect/ContextBrowser";
import { useLocation, useNavigate } from "react-router-dom";
import './Message.css';
import { TextSelecteClear } from "../Contect/Context";
import { toast } from "react-toastify";
import './Toast.css'
import { Home, Trash2 } from 'lucide-react'
import { BeatLoader } from "react-spinners";

export function ChatHeader({ responceText }) {

  const { token } = useContext(Context_Connection)
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="chat-header">
      <button className="back-btn" onClick={() => navigate('/')}><Home size={20} />Home</button>
      <div className="header-info">
        <div onClick={() => navigate('/profile', { state: { selectedUserData: responceText, selectedUser: location.state.selectedUser, token: token } })} className="avatar">{responceText?.userName?.email?.charAt(0)?.toUpperCase() || responceText?.userDataFind[0]?.email?.charAt(0)?.toUpperCase()}</div>
        <div className="user-profile">
          <h3 className="user-email">{responceText?.userName?.email || responceText?.userDataFind[0]?.email}</h3>
          <p className="user-active">Active now</p>
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
            <PopUp />
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

export function PopUp() {
  const { token, backendURL } = useContext(Context_Connection)

  const { selectPopUp, setSelectPopUp } = useContext(TextSelecteClear)

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

    try {

      const responce = await axios.delete(backendURL + `/api/usertext/userinputdelete/${EventDelete}`, { headers: { token } })

      if (responce.data.success) {
        toast.success('Message Deleted', {
          className: "custom-toast-delete-text",
          icon: <Trash2 size={20} color="white" />,
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        })
        console.log(responce.data.message);
      } else {
        console.log(responce.data.message);
      }

    } catch (error) {
      console.log(error.message);
    }

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

  const { backendURL, sendingUserToken, setSendingUserToken, recivedUserToken, token, setRecivedUserToken } = useContext(Context_Connection)
  const [saveUserText, setSaveUserText] = useState('')

  const location = useLocation() //This location come from ConnectionREQ.js

  //Control two states______________________________________________
  useEffect(() => {
    setSendingUserToken(location.state?.token) //This token is message sending user
    setRecivedUserToken(location.state?.selectedUser) // This token is reciver


  }, [sendingUserToken, recivedUserToken])

  const userInputForSelectedUser = async (userEvent) => {

    userEvent.preventDefault()
    setSaveUserText('')

    try {

      const responceSave = await axios.post(backendURL + '/api/usertext/userinputrecive', { saveUserText, sendingUserToken, recivedUserToken }, { headers: { token } })
      if (responceSave.data.success) {
        console.log(responceSave.data.savedUserTextandDatas);

      }

    } catch (error) {
      console.log(error.message);

    }

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
  const [userSendTexts, setUserSendTexts] = useState([]) //Select user texts
  const [userName, setUserName] = useState('')

  const { backendURL, token, userTexts, setUserTexts, sendingUserToken, setSendingUserToken, recivedUserToken, setRecivedUserToken } = useContext(Context_Connection)

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


  // -------------User Texts doing display--------------------
  const userTextsShowOnTheDisplay = async () => {

    try {

      const responce = await axios.post(backendURL + '/api/usertext/userinputsent', { sendingUserToken, recivedUserToken, token }, { headers: { token } })
      if (responce.data.success) {
        setUserTextResponceData(responce.data.userTextsToFrontend)
        setUserSendTexts(responce.data.userMessage) // reciver texts
        setSpeshal(responce.data.userTextsToFrontend)
        setUserTexts(textSaved)

      }

      const send = userTextResponceData.filter((itmes) => (
        itmes.sendingUserToken === token && itmes.recivedUserToken === recivedUserToken
      ))
      setResponceText(send)



    } catch (error) {
      console.log(error.message);
    }

  }
  useEffect(() => {

  }, [userTexts])

  //UseEffect for userTexts Display
  useEffect(() => {
    userTextsShowOnTheDisplay()

    const FinalFilterTexts = speshal.filter((item) => (
      item.sendingUserToken === recivedUserToken && item.recivedUserToken === token
    ))
    setTextSaved(FinalFilterTexts)

  }, [userTextResponceData, userSendTexts, responceText])


  //Convert to modern-------------------------------------
  const mixedMessages = [...responceText, ...textSaved].sort((a, b) => (
    new Date(a?.date).getTime() - new Date(b?.date).getTime()
  ))

  return (

    <div className="chat">
      <ChatHeader responceText={{ userName, userDataFind }} />

      <div className="messages">
        {Array.isArray(mixedMessages) &&
          Object.values(mixedMessages).map((items, index) => (
            <Messages key={items?._id || index} data={items} />
          ))
        }
      </div>
      <InputBar />
    </div>



  )
}

export default Message
