import React, { useEffect } from 'react'
import { useContext } from 'react'
import ContextBrowser, { Context_Connection } from '../Contect/ContextBrowser'
import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import '../Pages/Users.css'
import { Search } from 'lucide-react'

export function UserText() {

}


function Serch() {
    const { storeEmails } = useContext(Context_Connection)
    const [serch, setSerch] = useState([])
    
    const navigate = useNavigate()

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

    return (
        <div className="search-bar">
            <div className="search-input-wrapper">
                <div className="search-icon">
                   <Search size={20} />
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
                <div className="search-result">
                    {serch.map((items, index) => (
                        <div key={index} className="search-result-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#5f6368" style={{ marginRight: '16px' }}>
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                            <NavLink to={'/connectionReq'} state={{value:items}}>
                            <div className='to-connectios' onClick={()=> navigate('/context', {state:{value:items}})}>
                                <span className='user-emails' aistyle={{ margin: 0, fontSize: '14px', color: '#202124' }}>{items.email}</span>
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
