import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../Pages/Users.css'
function Profile() {

    const navigate = useNavigate()

    const LogOut = () => {
        navigate('/loginorSing')
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

            <div style={{ padding: '8px', cursor: 'pointer' }} title="Support">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#5f6368">
                    <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
                </svg>
            </div>
            <div style={{ padding: '8px', cursor: 'pointer' }} title="Settings">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#5f6368">
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84a.484.484 0 0 0-.48.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.74 8.87a.49.49 0 0 0 .12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32a.488.488 0 0 0 .59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.48-.41l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96a.488.488 0 0 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                </svg>
            </div>
            <div style={{ padding: '8px', cursor: 'pointer', marginRight: '8px' }} title="Google Apps">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#5f6368">
                    <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
                </svg>
            </div>

            <div className='hover-container'>
                <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#8e24aa', /* Purple color example */
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: '500',
                fontSize: '18px',
                cursor: 'pointer'
            }}>
                P
            </div>
            <div className='hover-display'>
                <span onClick={()=> LogOut()}>Log Out</span>
            </div>
            </div>
            
        </div>
    )
}

export default Profile
