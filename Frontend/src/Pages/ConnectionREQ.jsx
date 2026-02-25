import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Context_Connection } from '../Contect/ContextBrowser'

function ConnectionREQ() {

    const location = useLocation()

    const [pending, setPending] = useState('')

    const navigate = useNavigate()
    const { token, backendURL, same, setSame, connection, setConnection, final, setFinal, requestAccept, remove, setRemove } = useContext(Context_Connection)

console.log(requestAccept);
   console.log(location.state.value.token);
   
       const acceptTokenMatch = requestAccept.filter((itme)=> (
            itme.request === location.state.value.token
        ))
       console.log(acceptTokenMatch);

    // -------------userConnection request to backend------------------------
    const connectionreqTobackend = async (userData) => {
console.log(token);

        try {

            if (userData) {
                setFinal(false)
                setConnection(false)
                const userRequistSent = await axios.post(backendURL + '/api/user/request', { userData, token }, { headers: { token } })

                if (userRequistSent.data.success) {
                    setPending(userRequistSent.data.message)
                    console.log('///////////////////////////');
                 console.log(userRequistSent.data.savedREQ);   
                    console.log('It user REQ first Stage');
                    console.log('///////////////////////////');
                    
                } else {
                    console.log(userRequistSent.data.message);
                }
            }

        } catch (error) {
            console.log(error.message);
        }

    }
  
    // ----------------user request cancel-----------------------
    const RequestCancel = async (cancelREQ) => {
        setSame(true)

        try {

            const deleteREQResponce = await axios.delete(backendURL + `/api/user/userunrequest/${cancelREQ}`, { headers: { token } })
            if (deleteREQResponce.data.success) {
                console.log(deleteREQResponce.data.message);
            }
            else {
                console.log(deleteREQResponce.data.message);
            }

        } catch (error) {
            console.log(error.message);
        }
    }

  return (
    <div className='main-container'>
        <div className='heder-container'>
        <div className='text-container'>
            <span className='user-data'> {location?.state?.value?.firstName}</span>
            <span className='user-data'> {location?.state?.value?.lastName}</span>
        </div>
         <div>
              <span className='user-data'> {location?.state?.value?.email}</span>
          </div>

       
   <div>

  <div>
    {
        acceptTokenMatch[0]?.accepted ? <div>
            <div>
                <button onClick={()=> navigate('/message', {state:{token: token, selectedUser:location.state.value.token, selectedUserName:location.state.value}})}>message</button>
            </div>
              <div>
          <div>
             <div>
                {<button onClick={(()=> RequestCancel(location.state.value.email))}>Follow</button>
           
            }
             </div>
             <div>
                <button onClick={()=> navigate('/')}>Back</button>
             </div>
          </div>
         </div>
        </div> : <div>
        {
        same ? 
         <div>
 { connection ?
            <div className='button-box'>
            <button onClick={()=> setFinal(true)} className='user-cunection'>connect</button>
              <div>
                        <button onClick={()=> navigate('/')}>Back</button>
                    </div>
            {
                final ? <div className='final-container'>
                    <div className='final-head'>
                        <span className='final-text'>final connection</span>
                        <div>
                            <button onClick={(()=> connectionreqTobackend(location.state.value))}>should this connect ?</button>
                        </div>
                    </div>
                </div> : ''
               
            }
        </div>
        :  <div>
                 <div>
                   {
                    pending ? <h2>{pending}</h2> : <h2>request did not go</h2>
                   }
                 </div>
                </div>
          }
         </div> : 
         
         <div>
          <div>
             <div>
                {<button onClick={(()=> RequestCancel(location.state.value.email))}>Requested</button>
           
            }
             </div>
             <div>
                <button onClick={()=> navigate('/')}>Back</button>
             </div>
          </div>
         </div>
         
       }
       </div>


    }
  </div>
        
    
   </div>
      
            
        
         
        </div>     
    </div>
  )
}

export default ConnectionREQ
