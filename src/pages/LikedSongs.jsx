import React from 'react';
import { connect } from "react-redux";
import { DragDrop } from "../cmps/DragDrop";
import { LikedSongsHero } from "../cmps/LikedSongsHero";
import { MdMusicNote } from 'react-icons/md';


export function _LikedSongs({ user }) {
    console.log(user);
    return (
        <section className='like-page'>
            <LikedSongsHero />
            {user.likedSongs.length ? <DragDrop /> :
                <div className="no-liked-songs flex column align-center">
                    <div className="note"><MdMusicNote /></div>
                    <h1>Songs you like will appear here</h1>
                    <h5>Save songs by tapping the heart icon.</h5>
                </div>}
        </section>
    )
}

function mapStateToProps({ userModule }) {
    return {
        user: userModule.user
    };
}

const mapDispatchToProps = {
};

export const LikedSongs = connect(mapStateToProps, mapDispatchToProps)(_LikedSongs);