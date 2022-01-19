import React from 'react'



export function Header() {
    return (
        <header className='app-header flex space-between align-center'>
            <div className='back-foword-container flex'>
                <button className='back-btn'>&lt;</button>
                <button className='back-btn'>&gt;</button>
            </div>
            <div className='user-login-container'>
                <button className='login-btn flex align-center'>
                            <i className="fas fa-user-circle icon"></i>
                        <span className='user-name'>User Name</span>
                </button>
            </div>
        </header>
    )
}
