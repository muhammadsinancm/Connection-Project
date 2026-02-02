import React, { useContext, useState } from 'react'
import './InputStyles.css'
import axios from 'axios'
import { Context_Connection } from '../Contect/ContextBrowser'
import UserLgin from '../Pages/UserLgin'

function InputTab() {
    const {backendURL, token} = useContext(Context_Connection)
const [userInput, setUSerInput] = useState('')

    const onSubmit = async (event)=> { 
      event.preventDefault()

       try {
        const responceText = await axios.post(backendURL + '/api/user/text', {userInput})
        console.log(responceText.data);
        
       } catch (error) {
        console.log(error.message);
        
       }
    }

    const LogOut =()=> {
      localStorage.removeItem('token')
      window.location.reload()
    }
 

  return (
    <div>
      {
        token ? <div>
          <form onSubmit={onSubmit} className="input-tab">
            <input onChange={(e) => setUSerInput(e.target.value)} value={userInput}
              className="chat-input"
              placeholder="Type a message..."
              aria-label="Type a message"
            />
            <button type="submit" className="send-btn">Send</button>
          </form>
          <div>
            <button onClick={() => LogOut()}>Log out</button>
          </div>
        </div> : <UserLgin />
      }
    </div>
  )
}

export default InputTab
