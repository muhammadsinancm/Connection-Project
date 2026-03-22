import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Context_Connection } from '../Contect/ContextBrowser'
import './ConnectionREQ.css'

function ConnectionREQ() {

  const location = useLocation()

  const [pending, setPending] = useState('')
  const [storeREQ, setStoreREQ] = useState([])
  const [requestAccept, setRequestAccept] = useState([])
  const [storings, setStorings] = useState([])
  const [finding, setFinding] = useState(false)



  const navigate = useNavigate()
  const { token, backendURL, same, setConnection, final, setFinal, setUserAccepted } = useContext(Context_Connection)

  const acceptTokenMatch = requestAccept.filter((itme) => (
    itme.request === location.state.value.token
  ))

  // -----------REQ list Of user------------------
  const ListOFREQ = async () => {

    try {

      const responceREQList = await axios.get(backendURL + '/api/user/requestlist', {headers:{token}})
      if (responceREQList.data.success) {
        if (responceREQList.data.orginal) {
          console.log(responceREQList.data.orginal);
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

      const responce = await axios.put(backendURL + `/api/user/messageallow/${token}`, {}, {headers:{token}})
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

  //  -------Calling Message Allow--------
  useEffect(() => {
    listOfMessagepermision()
  }, [])

  // ----------This useEffect doing for request filter----------
  useEffect(() => {

    if (!storeREQ || storeREQ.length === 0) return

    let newData = storeREQ?.filter((items) => {
      return items?.request === token && items?.accepted === false
    })
    setStorings(newData)

  }, [storeREQ])

  // -------------userConnection request to backend------------------------
  const connectionreqTobackend = async (userData) => {

    localStorage.setItem('moving', JSON.stringify(false))

    try {

      if (userData) {
        setFinal(false)
        setConnection(false)
        const userRequistSent = await axios.post(backendURL + '/api/user/request', { userData, token }, { headers: { token } })

        if (userRequistSent.data.success) {
          setPending(userRequistSent.data.message)
          setUserAccepted(userRequistSent.data.savedREQ)
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

  useState(() => {

  }, [same])

  useEffect(() => {

    storeREQ.filter((items) => {
      let newOne = items?.token === token && items?.accepted === false && items.request === location.state.value.token
      console.log(newOne);
      setFinding(newOne)
    })

  }, [storeREQ, finding])

  return (

    <div className='main-container'>
      <div className='heder-container'>
        <div className='text-container'>
          <div className='profile-letter'>
            {location?.state?.value?.email?.charAt(0)?.toUpperCase()}
          </div>
          <span className='user-data'> {location?.state?.value?.firstName}</span>
          <span className='user-data'> {location?.state?.value?.lastName}</span>
        </div>
        <span className='user-data'> {location?.state?.value?.email}</span>


        <div className='user-id-controal'>
          {
            acceptTokenMatch[0]?.accepted ? <div>
              <div className='to-message'>
                <button className='message' onClick={() => navigate('/message', { state: { token: token, selectedUser: location.state.value.token, selectedUserName: location.state.value } })}>message</button>
              </div>
              <div className='unfollow-user'>
                <div className='unfollow-body'>
                  {<button className='unfollow' onClick={(() => RequestCancel(location.state.value.email))}>Follow</button>

                  }
                  <button onClick={() => navigate('/')}>Back</button>
                </div>
              </div>
            </div> : <div className='connection-last'>
              <div className='connection-container'>

                <div>

                  <div>
                    {
                      finding && location.state.value.token ?
                        <div className='final-request-container'>
                          <div className='final-request-head'>
                            <div className='final-request'>
                              {<button className='request' onClick={(() => RequestCancel(location.state.value.email))}>Requested</button>}
                            </div>
                            <div className='back-to-home-head'>
                              <button className='back-to-home' onClick={() => navigate('/')}>Back</button>
                            </div>
                          </div>
                        </div> :
                        <div className='button-box'>
                          <button onClick={() => setFinal(true)} className='user-cunection'>connect</button>
                          <button className='back-to-home' onClick={() => navigate('/')}>Back</button>
                          {
                            final ? <div className='final-container'>
                              <div className='final-head'>
                                <span className='final-text'>final connection</span>
                                <div>
                                  <button className='final-connection' onClick={() => connectionreqTobackend(location?.state?.value)}>should this connect ?</button>
                                </div>
                              </div>
                            </div> : <div></div>

                          }
                        </div>

                    }
                  </div>
                </div>

              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
export default ConnectionREQ
