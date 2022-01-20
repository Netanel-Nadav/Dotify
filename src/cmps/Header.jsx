import React from 'react'

import { connect } from 'react-redux'
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UserModal } from './UserModal';
import { login, logout, signup } from '../store/user.action'

export function _Header({ user, logout}) {

    const [isUserModalShown, setIsUserModalOpen] = useState(false);

    const toggleUserModal = () => {
        setIsUserModalOpen(!isUserModalShown)
    }

    const onGoBack = () => {
        this.props.history.push('/')
    }
   
    return (
        <header className='app-header flex space-between align-center'>
            <div className='back-foword-container flex'>
                <button onClick={onGoBack} className='back-btn'>&lt;</button>
                <button className='back-btn'>&gt;</button>
            </div>
            <div className='user-login-container'>
                <button onClick={toggleUserModal} className='login-btn flex align-center'>
                    <i className="fas fa-user-circle icon"></i>
                    {user ? <span className='user-name'>{user.username}</span> : 'Guest'}
                </button>
            </div>
            {isUserModalShown && <UserModal user={user} logout={logout} toggleUserModal={toggleUserModal} />}
        </header>
    )
}



function mapStateToProps({ userModule }) {
    return {
        user: userModule.user
    }
}

const mapDispatchToProps = {
    logout,
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header)