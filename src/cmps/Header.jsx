import React from 'react'

import { connect } from 'react-redux'
import { useState} from 'react';
import { UserModal } from './UserModal';
import { logout } from '../store/user.action'
import { useHistory } from 'react-router-dom';


export function _Header({ user, logout }) {

    const [isUserModalShown, setIsUserModalOpen] = useState(false);
    const history = useHistory()

    const toggleUserModal = () => {
        setIsUserModalOpen(!isUserModalShown)
    }

    const onGoBack = () => {
        history.goBack()
    }

    const onGoForward = () => {
        history.goForward()
    }


    return (
        <header className='app-header flex space-between align-center'>
            <div className='back-foword-container flex'>
                <button onClick={onGoBack} className='back-btn'><i className="fas fa-arrow-left"></i></button>
                <button onClick={onGoForward} className='back-btn'><i className="fas fa-arrow-right"></i></button>
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