import React from 'react'
import { useContext } from 'react'
import { Context_Connection } from '../Contect/ContextBrowser'
import UserLgin from './UserLgin'
import axios from 'axios'
import { useEffect } from 'react'
import LeftBar from '../Components For Pages/LeftBar'
import Serch from '../Components For Pages/Serch'
import Profile from '../Components For Pages/Profile'
import './Users.css'

function Users() {

    const { backendURL, token, storeEmails, setStoreEmails } = useContext(Context_Connection)

    const userEmalList = async () => {
        console.log(token);

        try {

            const responceEmails = await axios.post(backendURL + '/api/users/emails', { token })
            if (!responceEmails.data.success) {
                console.log(responceEmails.data.message);
            }

            setStoreEmails(responceEmails.data.newResponce)
            console.log(responceEmails.data.newResponce);

        } catch (error) {
            console.log(error.message);
        }

    }

    useEffect(() => {
        userEmalList()
    }, [])


    return (
        <div>

            {
                token ? <div className="users-container">

                    <div className="left-bar-container">
                        <LeftBar />
                    </div>

                    <div className="main-content">
                        <div className="header-container">
                            <div className="search-container-wrapper">
                                <Serch />
                            </div>
                            <div>
                                <Profile />
                            </div>
                        </div>

                        <div className="email-list-container">

                            
                        </div>
                    </div>

                </div> : <UserLgin />


            }

        </div>
    )
}

export default Users
