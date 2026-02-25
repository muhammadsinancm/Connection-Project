import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context_Connection } from "../Contect/ContextBrowser";
import { useLocation, useNavigate } from "react-router-dom";

function Message() {

  const [saveUserText, setSaveUserText] = useState('')
  const [sendingUserToken, setSendingUserToken] = useState('')
  const [recivedUserToken, setRecivedUserToken] = useState('')
  const [userTextResponceData, setUserTextResponceData] = useState([]) //All users texts come here
  const [userSendTexts, setUserSendTexts] = useState([]) //Select user texts
  const [responceText, setResponceText] = useState([])
  const [speshal, setSpeshal] = useState([])
  const [textSaved, setTextSaved] = useState([])

  const { backendURL, token } = useContext(Context_Connection)

  const location = useLocation() //This location come from ConnectionREQ.js

  const navigate = useNavigate()

  //Control two states
  useEffect(() => {
    setSendingUserToken(location.state?.token) //This token is message sending user
    setRecivedUserToken(location.state?.selectedUser) // This token is reciver
  }, [sendingUserToken, recivedUserToken])


  // -----------User Input texts does pass---------------
  const userInputForSelectedUser = async (userEvent) => {
    userEvent.preventDefault()
    setSaveUserText('')

    try {

      const responceSave = await axios.post(backendURL + '/api/usertext/userinputrecive', { saveUserText, sendingUserToken, recivedUserToken })
      if (responceSave.data.success) {
        console.log(responceSave.data.message);
      }

    } catch (error) {
      console.log(error.message);

    }

  }

  //-------------User Texts doing display--------------------
  const userTextsShowOnTheDisplay = async () => {

    try {

      const responce = await axios.post(backendURL + '/api/usertext/userinputsent', { sendingUserToken, recivedUserToken, token })
      if (responce.data.success) {
        setUserTextResponceData(responce.data.userTextsToFrontend)
        setUserSendTexts(responce.data.userMessage) // reciver texts
        setSpeshal(responce.data.userTextsToFrontend)
      }

      const send = userTextResponceData.filter((itmes) => (
        itmes.sendingUserToken === token && itmes.recivedUserToken === recivedUserToken
      ))
      setResponceText(send)


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
  }, [userTextResponceData, userSendTexts])

  return (
    <div className="message-container">
      <div className="message-header">

        <div className="homebutton-container">
          <div className="homebutton-head">
            <button className="homebutton" onClick={() => navigate('/')}>Back To Home</button>
          </div>
        </div>

        <div>
          <div>
            {/* User Details */}
          </div>
        </div>

        <div className="input-container">
          <form onSubmit={userInputForSelectedUser}>
            <div className="input-header">
              <div className="input-box">
                <input className="input-text" onChange={(e) => setSaveUserText(e.target.value)} type="text" value={saveUserText} />
              </div>
            </div>
            <div className="submit-container">
              <div className="submit-head">
                <button className="submit-button" type='submit'>Send</button>
              </div>
            </div>
          </form>
        </div>

        <div className="receiver-container">
          <div className="receiver-head">
            <h3 className="receiver-title">Receiver Message</h3>
            <div className="receiver-text-header">
              {Array.isArray(responceText) &&
                Object.values(responceText).map((itmes, index) => (
                  <div className="receiver-text-display" key={index}>
                    <span className="receiver-text">{itmes?.userText}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        <div className="sender-container">
          <h3 className="sender-title">email: {location?.state?.selectedUserName?.email}</h3>
          <div className="sender-header">
            <div className="sender-box">
              {Array.isArray(userSendTexts) &&
                Object.values(textSaved).map((items, index) => (
                  <div className="sender-text-display" key={index}>
                    <span className="sender-text">{items.userText}</span>
                  </div>
                ))

              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message
