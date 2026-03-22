import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './UserProfile.css'
import { Context_Connection } from '../Contect/ContextBrowser'
import axios from 'axios'

const UserTools = ()=> {
    
}
export {UserTools}


export function UserFollowRemove({sedTheDeleteArrowFunction}) {

    const {backendURL ,token, connection, setConnection, same, setSame} = useContext(Context_Connection)

console.log(token);

    const [saveResponce, setSaveResponce] = useState('')
     
     const RequestCancel = async (cancel) => {
        let cancelREQ = cancel?.email
setSame(true)

        try {

            const deleteREQResponce = await axios.delete(backendURL + `/api/user/userunrequest/${cancelREQ}`, { headers: { token } })
            if (deleteREQResponce.data.success) {
                console.log(deleteREQResponce.data.message);
                setSaveResponce(deleteREQResponce.data.success)
                setConnection(true)
            }
            else {
                console.log(deleteREQResponce.data.message);
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        return sedTheDeleteArrowFunction(RequestCancel, saveResponce)
    }, [saveResponce, connection, same, connection])

    useState(()=> {
    console.log(same);
    
    }, [same])
    

}


function UserProfile() {

    const [same, setSame] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    const {locationUser, requestAccept} = useContext(Context_Connection)

     const acceptTokenMatch = requestAccept.filter((itme)=> (
            itme.request === locationUser?.state?.selectedUserData?.token
        ))
    
    // User location_____________________________
    const selectedUser = location?.state?.selectedUserData
    
    const userFunction = (values, success) => {
        setSaveSuccess(success)
        values(selectedUser)
    }

useEffect(()=> {                                  

}, [same, saveSuccess])
                                             
  return (
    <div className='container-users'>
      <div className='head-users'>
        <div className='profile-letter'>
             {selectedUser?.email?.charAt(0)?.toUpperCase()}
            <img alt="" className='profile'/>
        </div>
        <div className='user-details'>
            <h1 className='user-email'>{selectedUser?.email}</h1>
        <h2 className='user-name'>{selectedUser?.firstName} {selectedUser?.lastName}</h2>
        </div>
        <div className='users-container'>
            <div className='user-contoral'>
               {
                acceptTokenMatch[0]?.accepted ? <button className='unfollow' onClick={()=> setSame(selectedUser)}>Unfollow</button> :
                <button className='follow'>Follow</button>
                
               }
                
                 {acceptTokenMatch[0]?.accepted ? <button className='messages' onClick={()=>navigate('/message', {state:{selectedUser:selectedUser.token, selectedUserName:selectedUser}})}>Message</button> : ''}
             <button className='home' onClick={()=> navigate('/')}>Home</button>
            </div>
        </div>
      </div>
      
      {
        same && 
<UserFollowRemove sedTheDeleteArrowFunction={userFunction}/>
      }
    </div>
  )
}

export default UserProfile
