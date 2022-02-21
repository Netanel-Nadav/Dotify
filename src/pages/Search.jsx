import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import { Recommendations } from '../cmps/Recommendations';

import { likeSong } from "../store/user.action";
import { stationService } from '../services/station.service';
import { eventBusService } from '../services/event-bus.service'

import { setSongs, toggleIsPlaying } from '../store/media.action'
import { Link } from "react-router-dom";


function _Search({ setSongs, likeSong, user, toggleIsPlaying }) {

    const [genres, setGenres] = useState(null)
    const [query, setQuery] = useState('');
    const [list, setList] = useState({ songs: [] })

    useEffect(async () => {
        const allGenres = await stationService.getStationsGenre()
        setGenres(allGenres)
    }, [])

    const search = async (ev) => {
        ev.preventDefault();
        const searchRes = await stationService.searchYouTube(query)
        searchRes.songs.forEach(song => {
            song._id = song.id
            delete song.id
        })
        setList(searchRes)
    };

    const onSetSongs = async (songId) => {
        await setSongs(list, songId)
        eventBusService.emit('playPauseVideo');
    }

    const setQueryOnSearch = (query) => {
        setQuery(query)
        window.scrollTo(0, 0)
    }

    return (
        <section className='search-container'>
            <section className='search-by-text'>
                <form onSubmit={search} className='flex justify-center'>
                    <input autoFocus value={query} placeholder='Enter song or artist name'
                        onChange={e => setQuery(e.target.value)} />
                </form>
                {list.songs.length > 0 && <section className='list-container flex column'>
                    <h1>Search Results</h1>
                    {list.songs.map((item, idx) => {
                        return (
                            <section key={item._id} className='song flex'>
                                <section className='song-info flex'>
                                    <p className='song-idx'>{idx + 1}</p>
                                    <span className="play-icon" onClick={() => onSetSongs(item._id)}><i className="fas fa-play"></i></span>
                                    <section className='song-img-container'>
                                        <img src={item.bestThumbnail.url} onError={({ currentTarget }) => {
                                            currentTarget.onerror = null;
                                            currentTarget.src = 'https://res.cloudinary.com/dvxuxsyoe/image/upload/v1643626113/l4almbflgdazzlmyzmq6.jpg'
                                        }} />
                                    </section>
                                    <p>{item.title}</p>
                                </section>
                                <section className='btns-and-like flex'>
                                    <button><i className={user?.likedSongs.some(likedSong => likedSong._id === item.id) ? "fas fa-heart liked" : "far fa-heart"} onClick={() => likeSong(item)}></i></button>
                                    <p className='duration'>{item.duration}</p>
                                </section>
                            </section>
                        )
                    })}
                    <hr />
                </section>
                }
                {list.recommendations && <Recommendations list={list.recommendations} setQueryOnSearch={setQueryOnSearch} />}
            </section>

            {
                genres && !list.songs.length &&
                <section className='stations-by-genre flex justify-center'>
                    {genres.map(genre => {
                        return (
                            <Link to={`/genre/${genre.name}`} key={genre.name}>
                                <section className='genre' style={{ backgroundColor: genre.backgroundColor }}>
                                    <h1>{genre.name}</h1>
                                    <section className='img-container square-ratio'>
                                        <img src={genre.imgUrl} onError={({ currentTarget }) => {
                                            currentTarget.onerror = null;
                                            currentTarget.src = 'https://res.cloudinary.com/dvxuxsyoe/image/upload/v1643626113/l4almbflgdazzlmyzmq6.jpg'
                                        }} />
                                    </section>
                                </section>
                            </Link>
                        )
                    })}
                </section>
            }
        </section>
    )
}

function mapStateToProps({ userModule }) {
    return {
        user: userModule.user,
    }
}

const mapDispatchToProps = {
    setSongs,
    likeSong,
    toggleIsPlaying
}


export const Search = connect(mapStateToProps, mapDispatchToProps)(_Search)