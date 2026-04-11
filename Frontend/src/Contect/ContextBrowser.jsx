import axios from 'axios'
import React, { createContext, useEffect } from 'react'
import { useState } from 'react'
import { data, useLocation, useNavigate } from 'react-router-dom'
import {io} from 'socket.io-client'

const Context_Connection = createContext()
export { Context_Connection }



function ContextBrowser(props) {
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const [storeEmails, setStoreEmails] = useState([])
  const [request, setRequest] = useState([])
  const [storeREQ, setStoreREQ] = useState([])
  const [match, setMatch] = useState([])
  const [same, setSame] = useState(true)
  const [storeRequest, setStoreRequest] = useState([])
  const [storeCount, setStoreCount] = useState([])
  const [connection, setConnection] = useState(true)
  const [final, setFinal] = useState(false)
  const [requestAccept, setRequestAccept] = useState([])
  const [remove, setRemove] = useState([])
  const [locations, setLocations] = useState('')
  const [followRemove, setFollowRemove] = useState('')
  const [userTexts, setUserTexts] = useState([])
  const [sendingUserToken, setSendingUserToken] = useState('')
  const [recivedUserToken, setRecivedUserToken] = useState('')
  const [socket, setsocket] = useState(null)

  const locationUser = useLocation()
console.log(token);

useEffect(()=> {

<<<<<<< HEAD
  const newSocketProviding = io('https://connection-project-frontend.onrender.com', {
=======
  const newSocketProviding = io('https://connection-project-backend.onrender.com', {
>>>>>>> cc4e570e52b070978152c0d8241b291f24834639
  auth:{serverOffset: 0},
  transports: ['websocket', 'polling']
})

const userRequest = (request)=> {
  setStoreREQ(request)
  setMatch(request)
}

newSocketProviding.on('user request',userRequest)

setsocket(newSocketProviding)

newSocketProviding.on('connect', () => {

})

newSocketProviding.on('user message', (messages)=> {
  console.log(messages);
})
return () => {
  newSocketProviding.off('user message')
  newSocketProviding.off('user request', userRequest)
  newSocketProviding.disconnect()
}
}, [])

  useEffect(() => {

  }, [userTexts])

  useEffect(() => {
    setLocations(locationUser?.state?.value)

  }, [])

  const backendURL = "https://connection-project-backend.onrender.com"

  // -----------REQ list Of user------------------
  // const ListOFREQ = async () => {

  //   try {

  //     const responceREQList = await axios.get(backendURL + '/api/user/requestlist', { headers: { token } })
  //     if (responceREQList.data.success) {
  //       if (responceREQList.data.orginal) {
  //         console.log(responceREQList.data.orginal);
  //         setMatch(responceREQList.data.orginal)
  //       }
  //       // setStoreREQ(responceREQList.data.orginal)

  //     } else {
  //       console.log(responceREQList.data.message);
  //     }

  //   } catch (error) {
  //     console.log(error.message);

  //   }
  // }

  // ---------this useEffect using List of request---------------- 
  // useEffect(() => {
  //   ListOFREQ()

  // }, [])

  //  -----------List Of User Connection Allow-------------
 
  const listOfMessagepermision = async () => {

    try {

      const responce = await axios.put(backendURL + `/api/user/messageallow/${token}`, {}, { headers: { token } })
      if (responce.data.success) {

        if (responce.data.filterConnectionAllow) {

        }
        setRequestAccept(responce.data.filterConnectionAllow)
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  //  -------Calling  Message Allow--------
  useEffect(() => {
    listOfMessagepermision()
  }, [])

  // ----------This useEffect doing for request filter----------
  useEffect(() => {

    if (!storeREQ || storeREQ.length === 0) return

    let newData = storeREQ?.filter((items) => {
      return items?.request === token && items?.accepted === false
    })

    let storing = storeREQ.filter((items) => (
      items.request === items.request && items.token === token
    ))

    const storeRequestCount = []
    setStoreCount(storeRequestCount)
    for (const key in newData) {
      storeRequestCount.push(Number(key) + 1)
    }

    if (newData) {
      setStoreRequest(newData)
    }

  }, [storeREQ]);


  const propsValue = {
    backendURL,
    setToken,
    token,
    storeEmails,
    setStoreEmails,
    request,
    setRequest,
    storeREQ,
    setStoreREQ,
    match,
    setMatch,
    same,
    setSame,
    storeRequest,
    setStoreRequest,
    storeCount,
    connection,
    setConnection,
    final,
    setFinal,
    requestAccept,
    setRequestAccept,
    remove,
    setRemove,
    locations,
    locationUser,
    followRemove,
    setFollowRemove,
    userTexts,
    setUserTexts,
    sendingUserToken,
    setSendingUserToken,
    recivedUserToken,
    setRecivedUserToken,
    socket
  }

  return (
    <Context_Connection.Provider value={propsValue}>
      {props.children}
    </Context_Connection.Provider>
  )
}

export default ContextBrowser
