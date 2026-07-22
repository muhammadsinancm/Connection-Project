import axios from 'axios'
import React, { createContext, useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Context_Connection = createContext()
export { Context_Connection }

function ContextBrowser(props) {

  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const [storeEmails, setStoreEmails] = useState([])
  const [connection, setConnection] = useState(true)
  const [final, setFinal] = useState(false)
  const [locations, setLocations] = useState('')
  const [sendingUserToken, setSendingUserToken] = useState('')
  const [recivedUserToken, setRecivedUserToken] = useState('')

  const locationUser = useLocation()

  useEffect(() => {
    setLocations(locationUser?.state?.value)

  }, [])

  const backendURL = 'http://localhost:4000'


  const propsValue = {
    backendURL,
    setToken,
    token,
    storeEmails,
    setStoreEmails,
    connection,
    setConnection,
    final,
    setFinal,
    sendingUserToken,
    setSendingUserToken,
    recivedUserToken,
    setRecivedUserToken,
  }

  return (
    <Context_Connection.Provider value={propsValue}>
      {props.children}
    </Context_Connection.Provider>
  )
}

export default ContextBrowser
