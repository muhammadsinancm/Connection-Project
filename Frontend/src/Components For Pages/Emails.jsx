import React, { useContext, useEffect, useState } from 'react'
import { Context_Connection } from '../Contect/ContextBrowser';
import './Emails.css'
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Emails() {
    const {emails, backendURL, setStoreREQ, storeREQ } = useContext(Context_Connection)
    
    const [userEmail, setUserEmail] = useState(emails)

const serchClone = structuredClone(emails)

    const userEmails = (value)=> {

        const filterEmails = serchClone.filter((items)=> (
            items.email.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        ))
        setUserEmail(filterEmails)
    }

useEffect(()=> {

}, [userEmail, emails, serchClone])
    
    return (
        <aside className="emails-sidebar">
            <div className="search-wrap">
                <input
                    className="search-input"
                    type="search"
                    placeholder="Search emails"
                    onChange={(e) => userEmails(e.target.value)}
                />
            </div>

            <ul className="email-list">
                {
                    userEmail.map((items, index) => (
                        <NavLink to={'/user'} state={{value:items}}>
                            <li key={index} className="email-item">
                            <div className="email-avatar">{items.email ? items.email.charAt(0) : '?'}</div>
                            <div className="email-address">{items.email}</div>
                        </li>
                        </NavLink>
                    ))
                }
            </ul>
        </aside>
    )
}

export default Emails
