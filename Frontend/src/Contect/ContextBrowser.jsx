import React, { createContext } from 'react'
import { useState } from 'react'

const Context_Connection = createContext()
export { Context_Connection }

function ContextBrowser(props) {
  const [token, setToken] = useState( localStorage.getItem("token") || "")

  const backendURL = import.meta.env.VITE_BACKEND_URL
  const propsValue = {
    backendURL,
    setToken,
    token
  }
console.log(backendURL);

  return (
    <Context_Connection.Provider value={propsValue}>
      {props.children}
    </Context_Connection.Provider>
  )
}

export default ContextBrowser
