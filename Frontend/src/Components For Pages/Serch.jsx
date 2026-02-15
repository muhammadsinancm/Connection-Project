import React from 'react'
import { useContext } from 'react'
import { Context_Connection } from '../Contect/ContextBrowser'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Serch() {
    const { storeEmails, setStoreEmails } = useContext(Context_Connection)
    const [serch, setSerch] = useState([])

    const userEmailsSerch = (value) => {

        if (!value.trim()) {
            setSerch([])
            return
        }

        const serchFilterEmails = storeEmails.filter((items) => (
            items.email.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        ))
        setSerch(serchFilterEmails)
    }

    const userEmailSelect = async (email)=> {
          console.log(email);

          
    }

    return (
        <div className="search-bar">
            <div className="search-input-wrapper">
                <div className="search-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#444746">
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                </div>
                <input
                    onChange={(e) => userEmailsSerch(e.target.value)}
                    type="text"
                    placeholder="Search mail"
                    className="search-input"
                />
                <div className="filter-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#444746">
                        <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" />
                    </svg>
                </div>
            </div>
            {serch.length > 0 && (
                <div className="search-results">
                    {serch.map((items, index) => (
                        <div key={index} className="search-result-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#5f6368" style={{ marginRight: '16px' }}>
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                            <NavLink to='/connectionReq' state={{value:items}}>
                             <div>
                                <p onClick={()=> userEmailSelect(items)} style={{ margin: 0, fontSize: '14px', color: '#202124' }}>{items.email}</p>
                            </div>   
                            </NavLink>
                            
                        </div>
                    ))
                    }
                </div>
            )}
        </div>
    )
}

export default Serch
