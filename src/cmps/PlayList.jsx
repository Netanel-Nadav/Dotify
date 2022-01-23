
import { useEffect } from 'react'
import { connect } from 'react-redux'

import {setSongs, setStation} from '../store/media.action'
import {deleteSong, setDisplayedSongs} from '../store/station.action'


function _PlayList({ station, setSongs, setStation, deleteSong, setDisplayedSongs ,displayedSongs }) {

    useEffect (() => {
        setStation(station)
        setDisplayedSongs(station)
    }, [])


    return (
        <section className="playlist">
            <section className='station-song-info-title flex'>
                <p className='title'>Title</p>
                <section className="wrraper flex space-around">
                    <p className='date-addedAt'>Date Added</p>
                    <p className='duration'><i className="fas fa-clock"></i></p>
                </section>
            </section>
            <hr />
            <section className="songs-container flex column">
                {displayedSongs.map((song, idx) => {
                    return (
                        <section key={song._id} className='station-song-details flex'>
                            <section className='song-info flex'>
                                <p className="absolute">{idx + 1}</p>
                                <span className="play-icon absolute" onClick={() => setSongs(station,song._id)}><i className="fas fa-play"></i></span>
                                <section className='img-container'>
                                    <img src={song.imgUrl} />
                                </section>
                                <p>{song.title}</p>
                            </section>
                            <section className="wrraper flex space-around">
                                <section className='song-addedAt'>
                                    <p>some date</p>
                                </section>
                                <section className='song-duration btns flex'>
                                    <p>{song.duration}</p>
                                    <button className="like-btn">Like</button>
                                    <button className="delete-btn" onClick={() => deleteSong(station._id,song._id)}>Delete</button>
                                </section>
                            </section>
                        </section>


                    )
                })}
            </section>
            <hr />
        </section>
    )
}

function mapStateToProps({ stationModule }) {
    return {
        displayedSongs: stationModule.displayedSongs
    }
}

const mapDispatchToProps = {
    setSongs,
    setStation,
    deleteSong,
    setDisplayedSongs
}


export const PlayList = connect(mapStateToProps, mapDispatchToProps)(_PlayList)
