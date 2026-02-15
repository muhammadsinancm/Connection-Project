import React, { createContext } from 'react'
import { useState } from 'react'

const Context_Connection = createContext()
export { Context_Connection }

function ContextBrowser(props) {
  const [token, setToken] = useState( localStorage.getItem("token") || "")
  const [storeEmails, setStoreEmails] = useState([])

  const backendURL = import.meta.env.VITE_BACKEND_URL
  const propsValue = {
    backendURL,
    setToken,
    token,
    storeEmails,
    setStoreEmails
  }

  return (
    <Context_Connection.Provider value={propsValue}>
      {props.children}
    </Context_Connection.Provider>
  )
}

export default ContextBrowser
