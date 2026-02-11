import React, { useContext, useState } from 'react'
import './InputStyles.css'
import axios from 'axios'
import { Context_Connection } from '../Contect/ContextBrowser'
import UserLgin from '../Pages/UserLgin'
import SideBar from './SideBar'
import { useEffect } from 'react'


function InputTab() {
  const { backendURL, token, setEmails, emails, setStoreREQ, storeREQ } = useContext(Context_Connection)
  const [userInput, setUSerInput] = useState([])
  const [store, setSotre] = useState([])
      const [notification, setNotification] = useState([])

    const onSubmit = async (event)=> {
      event.preventDefault()
  
       try {

       const responce =  await axios.post(backendURL + '/api/user/text', {userInput, token}, {headers:{token}})
        
        if (responce.data.success) {
          console.log('text add is working');
          console.log(responce.data.text);
          

        } else {
          console.log('text add is not working');
        }
        
        
        
       } catch (error) {
        console.log(error.message);
        
       }

    }


    
const userNotification = async ()=> {
  
     const responce = await axios.post(backendURL + '/api/userreq/notification', {token, storeREQ})
     if (responce.data.notficatios) {
      setNotification(responce.data.notficatios)

      if (responce.data.notficatios) {
        console.log(responce.data.notficatios);
      }
       
     } else {
 
 console.log('wait');
     }
        
}

useEffect(()=> {
   userNotification();
   
}, [])


    useEffect(()=> {
      listOfText()
    }, [token, emails])


    const listOfText = async ()=> {

      try {

        const responce = await axios.post(backendURL + '/api/user/recive', {token},  {headers:{token}})
        if (responce.data.success) {
          
          setSotre(responce.data.userText) 
          setEmails(responce.data.userEmail)
        }
        else {
          console.log('no text found');
        }
 
      } catch (error) {
        console.log(error.message);
        
      }

    }

useEffect(()=> {
  
}, [emails])


    const LogOut =()=> {
      localStorage.removeItem('token')
      window.location.reload()
    }

    

  return (
    <div>
      {
        token ? <div>
            <div className="messages">
              {
                store.map((items, index)=> (
                 <div className='message-row' key={index}>
                  <SideBar items={items}/>
                 </div>
                ))
              }
            </div>

          <form onSubmit={onSubmit} className="input-tab">
            <input onChange={(e) => setUSerInput(e.target.value)} value={userInput}
              className="chat-input"
              placeholder="Type a message..."
              aria-label="Type a message"
            />
            <button type="submit" className="send-btn">Send</button>
          </form>
          <div className="logout-wrapper">
            <button onClick={() => LogOut()} className="logout-btn">Log out</button>
          </div>
    
        </div> : <UserLgin />
      }
    </div>
  )
}

export default InputTab
