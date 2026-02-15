import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Context_Connection } from '../Contect/ContextBrowser'

function ConnectionREQ() {
    const location = useLocation()

    const [final, setFinal] = useState(false)
    const [connection, setConnection] = useState(true)
    const [pending, setPending] = useState('')
    const [same, setSame] = useState(true)
    const [storeREQ, setStoreREQ] = useState([])
    const [match, setMatch] = useState([])
    const [request, setRequest] = useState([])

    const navigate = useNavigate()
    const { token, backendURL } = useContext(Context_Connection)
    console.log(token);

    const connectionreqTobackend = async (userData) => {

        try {

            if (userData) {
                setFinal(false)
                setConnection(false)
                const userRequistSent = await axios.post(backendURL + '/api/user/request', { userData, token }, { headers: { token } })

                if (userRequistSent.data.success) {
                    setPending(userRequistSent.data.message)
                    console.log(userRequistSent.data.savedREQ);

                } else {
                    console.log(userRequistSent.data.message);
                }
            }

        } catch (error) {
            console.log(error.message);
        }

    }
  
    // REQ list Of user
    const ListOFREQ = async () => {

        try {

            const responceREQList = await axios.get(backendURL + '/api/user/requestlist')
            if (responceREQList.data.success) {
                console.log(responceREQList.data.orginal);

                if (responceREQList.data.orginal) {
                    setMatch(responceREQList.data.orginal)
                    console.log(responceREQList.data.orginal);

                    console.log(match[0]?.request);
                    console.log(token);

                    // if (match[0]?.reciver) {
                    //     let filterUserREQ = match?.filter((items) => {
                    //         return items?.request === token
                    //     })
                    //     console.log(filterUserREQ);
                    //     setRequest(filterUserREQ)
                    // }
                }

                setStoreREQ(responceREQList.data.orginal || [])

            } else {
                console.log(responceREQList.data.message);
            }

        } catch (error) {
            console.log(error.message);

        }
    }

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

    useEffect(() => {
        ListOFREQ()
        console.log(request);
        
    }, [match])

    useEffect(() => {
  if (!match?.length) return;

  const filterUserREQ = match.filter(item =>
    item?.request === token
  );
console.log(filterUserREQ);

  setRequest(filterUserREQ);
  
}, [match, token]);


    useEffect(() => {

        if (!storeREQ || storeREQ.length === 0) return

        let newData = storeREQ?.filter((items) => {
            return items?.reciver == location.state.value.email
        })
        console.log(newData);

        console.log(newData[0]?.reciver);
        console.log(location.state.value.email);

        if (newData[0]?.reciver === location.state.value.email) {           
            setSame(false)

        } else {
            console.log('not done');
        }

    }, [storeREQ])
   
 
  return (
    <div className='main-container'>
        <div className='heder-container'>
        <div className='text-container'>
            <span className='user-data'> {location.state.value.firstName}</span>
            <span className='user-data'> {location.state.value.lastName}</span>
        </div>
         <div>
              <span className='user-data'> {location.state.value.email}</span>
          </div>

          {
            request.map((items)=> (
                <div>
                    <h1>request from: {items.email}</h1>
                </div>
            ))
          }

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
    </div>
  )
}

export default ConnectionREQ
