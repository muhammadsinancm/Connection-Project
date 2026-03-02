import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context_Connection } from "../Contect/ContextBrowser";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import './Message.css';



export function ChatHeader() {
  const navigate = useNavigate()
  return (
    <div className="chat-header">
      <button className="back-btn" onClick={() => navigate('/')}>  Home</button>
      <div className="header-info">
        <div className="avatar">A</div>
        <div>
          <h3>Arjun</h3>
          <p>Active now</p>
        </div>
      </div>
    </div>
  )
}

export function Messages({ data }) {
  const [dataSaved, setDataSaved] = useState([data])
  const [sendingUserToken, setSendingUserToken] = useState('')
  const [recivedUserToken, setRecivedUserToken] = useState('')
  console.log(data);

  const { token } = useContext(Context_Connection)

  const location = useLocation() //This location come from ConnectionREQ.js

  useEffect(() => {
    setSendingUserToken(location.state?.token) //This token is message sending user
    setRecivedUserToken(location.state?.selectedUser) // This token is reciver
  }, [sendingUserToken, recivedUserToken, dataSaved])



  const datasss = dataSaved.filter((itmes) => (
    itmes?.recivedUserToken !== token
  ))

  const datasssss = dataSaved.filter((itmes) => (
    itmes?.recivedUserToken === token
  ))

  return (
    <>
      {datasss[0]?.userText && (
        <div className="row theirs">
          <div className="bubble theirs">
            <span className="text">{datasss[0]?.userText}</span>
            <span className="time">10:24</span>
          </div>
        </div>
      )}

      {datasssss[0]?.userText && (
        <div className="row mine">
          <div className="bubble mine">
            <span className="text">{datasssss[0]?.userText}</span>
            <span className="time">10:24</span>
          </div>
        </div>
      )}
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

// export function BackIcon() {
//   return (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <polyline points="15 18 9 12 15 6" />
//   </svg>
// );
// }

export function SendIcon() {

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

export function PopUp({ mine }) {
  return (
    <div className="popup">
      <div className="item">
        <CopyIcon /> Copy
      </div>
      <div className="item">
        <ReplayIcon /> Reply
      </div>
      {
        mine && (
          <div className="item danger">
            <DeleteIcon /> Delete
          </div>
        )}

    </div>
  )
}

//--------------------This is user message and send button------------------------ 
export function InputBar() {

  const { backendURL, token } = useContext(Context_Connection)
  const [saveUserText, setSaveUserText] = useState('')

  const location = useLocation() //This location come from ConnectionREQ.js
  const [sendingUserToken, setSendingUserToken] = useState('')
  const [recivedUserToken, setRecivedUserToken] = useState('')

  //Control two states______________________________________________
  useEffect(() => {
    setSendingUserToken(location.state?.token) //This token is message sending user
    setRecivedUserToken(location.state?.selectedUser) // This token is reciver
  }, [sendingUserToken, recivedUserToken])

  const userInputForSelectedUser = async (userEvent) => {

    userEvent.preventDefault()
    setSaveUserText('')

    try {

      const responceSave = await axios.post(backendURL + '/api/usertext/userinputrecive', { saveUserText, sendingUserToken, recivedUserToken })
      if (responceSave.data.success) {
      }

    } catch (error) {
      console.log(error.message);

    }

  }
  return (

    <div className="input-bar">
      <form onSubmit={userInputForSelectedUser} className="input-bar form">
        <input onChange={(e) => setSaveUserText(e.target.value)} value={saveUserText} type="text" placeholder="Type a message..." />
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

  const [sendingUserToken, setSendingUserToken] = useState('')
  const [recivedUserToken, setRecivedUserToken] = useState('')

  const { backendURL, token } = useContext(Context_Connection)

  const location = useLocation() //This location come from ConnectionREQ.js



  //Control two states
  useEffect(() => {
    setSendingUserToken(location.state?.token) //This token is message sending user
    setRecivedUserToken(location.state?.selectedUser) // This token is reciver
  }, [sendingUserToken, recivedUserToken])


  // -------------User Texts doing display--------------------
  const userTextsShowOnTheDisplay = async () => {
    console.log('display fetching');

    try {

      const responce = await axios.post(backendURL + '/api/usertext/userinputsent', { sendingUserToken, recivedUserToken, token })
      if (responce.data.success) {
        setUserTextResponceData(responce.data.userTextsToFrontend)
        setUserSendTexts(responce.data.userMessage) // reciver texts
        setSpeshal(responce.data.userTextsToFrontend)
        console.log(responce.data.userTextsToFrontend);

      }

      const send = userTextResponceData.filter((itmes) => (
        itmes.sendingUserToken === token && itmes.recivedUserToken === recivedUserToken
      ))
      setResponceText(send)
      console.log(send);


    } catch (error) {
      console.log(error.message);
    }

  }

  //UseEffect for userTexts Display
  useEffect(() => {
    userTextsShowOnTheDisplay()

    const FinalFilterTexts = speshal.filter((item) => (
      item.sendingUserToken === recivedUserToken && item.recivedUserToken === token
    ))
    setTextSaved(FinalFilterTexts)
    console.log(FinalFilterTexts);

    console.log(responceText);
    console.log(textSaved);
    console.log(userSendTexts);

  }, [userTextResponceData, userSendTexts, responceText])


  //Convet to modern-------------------------------------

  return (


    <div className="chat">
      <ChatHeader />

      <div className="messages">
        {Array.isArray(responceText) &&
          Object.values(responceText).map((items, index) => (
            <Messages key={`send-${index}`} data={items} />
          ))
        }

        {Array.isArray(userSendTexts) &&
          Object.values(textSaved).map((items, index) => (
            <Messages key={`recv-${index}`} data={items} />
          ))
        }
      </div>
      <InputBar />
    </div>



  )
}

export default Message
