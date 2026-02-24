import axios from 'axios'
import React, { createContext, useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import UserNotificatios from '../Pages/UserNotificatios'

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

  const location = useLocation()
  console.log(location?.state?.value?.token);

  const backendURL = import.meta.env.VITE_BACKEND_URL

  // -----------REQ list Of user------------------
  const ListOFREQ = async () => {

    try {

      const responceREQList = await axios.get(backendURL + '/api/user/requestlist')
      if (responceREQList.data.success) {
        if (responceREQList.data.orginal) {
          console.log(responceREQList.data.orginal);
          
          setMatch(responceREQList.data.orginal)
        }

        setStoreREQ(responceREQList.data.orginal)

      } else {
        console.log(responceREQList.data.message);
      }

    } catch (error) {
      console.log(error.message);

    }
  }

  // ---------this useEffect using List of request---------------- 
  useEffect(() => {
    ListOFREQ()

  }, [])


//  -----------List Of User Connection Allow-------------
  const listOfMessagepermision = async () => {

    try {

      const responce = await axios.put(backendURL + `/api/user/messageallow/${token}`)
      if (responce.data.success) {
        console.log(responce.data.filterConnectionAllow);
        
        if (responce.data.filterConnectionAllow) {
          
        }
        setRequestAccept(responce.data.filterConnectionAllow)
      }

    } catch (error) {
      console.log(error.message);

    }

  }

//  -------Calling  Message Allow--------
  useEffect(()=> {
      listOfMessagepermision()
  }, [])

  // ----------This useEffect doing for request filter----------
  useEffect(() => {

    if (!storeREQ || storeREQ.length === 0) return

    let newData = storeREQ?.filter((items) => {
      return items?.request === token
    })

    let storing = storeREQ.filter((items) => (
      items.request === location?.state?.value?.token
    ))
    console.log('you got it', newData);

    const storeRequestCount = []
    setStoreCount(storeRequestCount)
    for (const key in newData) {
        storeRequestCount.push(Number(key)+1)  
    }

    console.log(storeRequestCount);
    

    if (newData) {
      setStoreRequest(newData)
    }

    const maching = storeREQ.filter((items) => (
      items?.token === token
    ))

    if (maching[0]?.token === token && storing[0]?.request === location?.state?.value?.token) {
      setSame(false)

    } else {
      console.log('not done');
    }

  }, [storeREQ])


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
    setRemove
  }

  return (
    <Context_Connection.Provider value={propsValue}>
      {props.children}
    </Context_Connection.Provider>
  )
}

export default ContextBrowser
