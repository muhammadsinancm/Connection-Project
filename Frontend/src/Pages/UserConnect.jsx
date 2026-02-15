import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Context_Connection } from '../Contect/ContextBrowser';
import axios from 'axios';

function UserConnect() {
     
    const { token, backendURL, setStoreREQ, storeREQ } = useContext(Context_Connection)

    const [userData, setUserData] = useState(null)


    const location = useLocation()

    useEffect(() => {
        if (location?.state?.value) {
            setUserData(location?.state?.value)
            
        }
    }, [location.state])

const userConnectionReq = async ()=> {
   
      try {

        const responce = await axios.post(backendURL + '/api/userreq/conection', {userData, token})
        if (responce.data.success) {
          if (responce.data.userFindConection) {
            setStoreREQ(responce.data.userFindConection)
            console.log(responce.data);     
          }   
        }

        else {
            console.log(responce.data.message);
            
        }
        
      } catch (error) {
        console.log(error.message);
        
      }    
}

useEffect(()=> {

}, [storeREQ])
    
  return (
    <div>
      <div>
       <h1>{userData?.firstName} {userData?.lastName}</h1>
       <h1>{userData?.email}</h1>
       <h1>{userData?.userId}</h1>
      </div>

      <div>
        <button onClick={()=> userConnectionReq()}>Connect the user</button>
      </div>

      <div>
        <div>
            <NavLink to={'/'}>
            <button>Back</button>
            </NavLink>
        </div>
      </div>

    </div>
  )
}

export default UserConnect
