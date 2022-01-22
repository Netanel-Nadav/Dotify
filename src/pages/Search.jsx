import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import { Recommendations } from '../cmps/Recommendations';

import { stationService } from '../services/station.service';
import {setSongs} from '../store/media.action'

function _Search({setSongs}) {

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
        setList(searchRes)

    };

    const onSetSongs = async (idx) => {
        list.songs.forEach( song => {
            song._id = song.id
            delete song.id
        })
        setSongs(list,idx)
    }


    return (
        <section className='search-container'>
            <section className='search-by-text'>
                <form onSubmit={search}>
                    <input autoFocus value={query} placeholder='Enter song or artist name'
                        onChange={e => setQuery(e.target.value)} />
                    <button>search</button>
                </form>
                {list.songs.length > 0 && <section className='list-container flex column'>
                    <h1>Search Results</h1>
                    {list.songs.map((item, idx) => {
                        return (
                            <section key={item.id} className='song flex'>
                                <section className='song-info flex'>
                                    <p>{idx + 1}</p>
                                    <span className="play-icon absolute" onClick={() => onSetSongs(idx)}><i className="fas fa-play"></i></span>
                                    <section className='img-container'>
                                        <img src={item.bestThumbnail.url} />
                                    </section>
                                    <p>{item.title}</p>
                                </section>
                                <section className='btns-and-like flex'>
                                    <button>like</button>
                                    <p className='duration'>{item.duration}</p>
                                    <button>add</button>
                                </section>
                            </section>
                        )
                    })}
                    <hr />
                </section>
                }
                {list.recommendations && <Recommendations list={list.recommendations} />}
            </section>

            {
                genres && !list.songs.length &&
                <section className='stations-by-genre flex'>
                    {genres.map(genre => {
                        return (
                            <section key={genre.name} className='genre' style={{ backgroundColor: genre.backgroundColor }}>
                                <h1>{genre.name}</h1>
                                {/* <img src={genre.imgUrl} /> */}
                            </section>
                        )
                    })}
                </section>
            }
        </section>
    )
}

function mapStateToProps({  }) {
    return {
    }
}

const mapDispatchToProps = {
    setSongs
}


export const Search = connect(mapStateToProps, mapDispatchToProps)(_Search)