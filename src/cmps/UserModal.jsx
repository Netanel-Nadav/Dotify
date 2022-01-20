import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function UserModal({user, logout, toggleUserModal}) {

    return (
        <section className='user-modal flex column'>
            {user && <Link to={`/user/${user._id}`}> <button>Profile</button></Link>}
            {user && <Link to="#" onClick={toggleUserModal}><button onClick={logout}>Logout</button></Link>}
            {!user && <Link to="/login"> <button onClick={toggleUserModal}>Login</button></Link>}
        </section>
        
    )
}

