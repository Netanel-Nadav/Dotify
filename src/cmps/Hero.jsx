import React from 'react';

export function Hero({ user }) {

    const { imgUrl, username } = user
    return (
        <div className="hero">
            <div className="user-info flex align-center">
                <div className="img-container">
                    <i className="fas fa-user user-icon"></i>
                </div>
                <div className="user-details">
                    <small>Profile</small>
                    <h1>{username}</h1>
                </div>
            </div>
        </div>
    )
}
