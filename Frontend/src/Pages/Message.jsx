import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context_Connection } from "../Contect/ContextBrowser";
import { useLocation } from "react-router-dom";


function Message() {

  const [saveUserText, setSaveUserText] = useState('')
  const [sendingUserToken, setSendingUserToken] = useState('')
  const [recivedUserToken, setRecivedUserToken] = useState('')
  const [userTextResponceData, setUserTextResponceData] = useState([])
  const [userSendTexts, setUserSendTexts] = useState([])
  const [responceText, setResponceText]= useState([])

  const {backendURL, token} = useContext(Context_Connection)

  const location = useLocation()

  useEffect(() => {
    setSendingUserToken(location.state?.token) //This token is message sending user
    setRecivedUserToken(location.state?.selectedUser) // This token is reciver
  }, [sendingUserToken, recivedUserToken])
   
  // -----------User Input texts does pass---------------
  const userInputForSelectedUser = async (userEvent)=> {
      userEvent.preventDefault()
      console.log(saveUserText);
      setSaveUserText('')

      try {

        const responceSave = await axios.post(backendURL + '/api/usertext/userinputrecive', {saveUserText, sendingUserToken, recivedUserToken})
        if (responceSave.data.success) {
          console.log(responceSave.data.message);
        }
        
      } catch (error) {
        console.log(error.message);
        
      }

  }

  const userTextsShowOnTheDisplay = async ()=> {

    try {

      const responce = await axios.post(backendURL + '/api/usertext/userinputsent', {sendingUserToken, recivedUserToken, token})
      if (responce.data.success) {
        setUserTextResponceData(responce.data.userTextsToFrontend)
        setUserSendTexts(responce.data.userMessage) // reciver texts
        console.log(responce.data.userMessage);
        console.log(responceText);
        
        
      }

      const send = userTextResponceData.filter((itmes)=> (
          itmes.sendingUserToken === token
      ))
      setResponceText(send)
     
      
    } catch (error) {
      console.log(error.message);
    }

  }

  useEffect(()=> {
    userTextsShowOnTheDisplay()
  }, [userTextResponceData, userSendTexts])

  return (
    <div>
      <div>
        <div>
          <div>
            {/* User Details */}
          </div>
        </div>

       <form onSubmit={userInputForSelectedUser}>
         <div>
          <div>
            <input onChange={(e)=> setSaveUserText(e.target.value)} type="text" value={saveUserText} />
          </div>
        </div>
        <div>
          <div>
            <button type='submit'>Send</button>
          </div>
        </div>
       </form>

       <div>
        <div>
          your texts
          <div>
            { Array.isArray(responceText) && 
             Object.values(responceText).map((itmes, index)=> (
                <div key={index}>
                  <span>{itmes?.userText}</span>
                </div>
              ))
            }
          </div>
        </div>
       </div>
////////////////////////////////////////////////////////////////////
reciver texts
       <div>
        <div>
          <div>
            { Array.isArray(userSendTexts) &&
            Object.values(userSendTexts).map((items, index)=> (
              <div key={index}>
               <span>{items.userText}</span>
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
