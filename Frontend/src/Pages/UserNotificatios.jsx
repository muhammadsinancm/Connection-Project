import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context_Connection } from '../Contect/ContextBrowser'
import axios from 'axios'

function UserNotificatios() { 
    
    const navigate = useNavigate()
    const {storeRequest,setStoreRequest, backendURL, token, requestAccept, remove, setRemove} = useContext(Context_Connection)
    const [removing, setRemoving] = useState([])
    const [findAndRemoveAccept, setFindAndRemoveAccept] = useState([])

console.log('List Of Accept');
console.log(storeRequest); // List of data mapping
console.log(requestAccept);
console.log('End');
console.log(remove);

localStorage.setItem('remove', JSON.stringify(storeRequest))
useEffect(()=> {
    
const setting = JSON.parse(localStorage.getItem('remove'))
  setRemoving(setting)
}, [storeRequest])
console.log(removing);


// ----------------User accept-------------------------
    const Accept = async (userAcceptData)=> {
       
        console.log(userAcceptData);

       try {

           const responceAccept = await axios.post(backendURL + '/api/user/accept', { userAcceptData, token, storeRequest })
           if (responceAccept.data.success) {
               const permanent = responceAccept.data.saving
               console.log(permanent.token);

             const saving = removing.filter((itmes)=> (
                itmes.token !== permanent.token
               ))

localStorage.removeItem('remove')
               localStorage.setItem('remove', JSON.stringify(saving))
               const dataRemoved = JSON.parse(localStorage.getItem('remove'))
                console.log(dataRemoved);
                
                setRemoving(dataRemoved)
               setStoreRequest(null)

               const setting = JSON.parse(localStorage.getItem('remove'))
               setRemoving(setting)
               console.log(setting[0]?.token);
               

           }

       } catch (error) {
           console.log(error.message);
       }
       
    }

    const Ignore = async (userIgnoreData)=> {
   console.log(userIgnoreData);
   
    }

useEffect(()=> {

}, [remove])

    return (
        <div>
            <div>
                <span>notifications For You</span>
            </div>
            <div>
                <div>
                    <span onClick={() => navigate('/')}>Back to Home</span>
                </div>
            </div>
            <div>
                <div>
                    <div>
                    {removing ?
                        removing.map((items, index) => (
                            <div key={index}>
                                <span>{items.firstName}</span>
                                <span>{items.lastName}</span><br />
                                <span>{items.email}</span> 
                                <button onClick={()=> Accept(items)}>Accept</button>
                                <button onClick={()=> Ignore(items)}>Ignore</button>
                            </div>
                        )) : ''
                    }
                </div>
                </div>
            </div>
        </div>
  )
}

export default UserNotificatios
