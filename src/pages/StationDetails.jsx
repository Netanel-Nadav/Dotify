import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import { setDisplayedSongs, addSong } from '../store/station.action'
import { setStation } from '../store/media.action'

import { stationService } from "../services/station.service";

import { PlayList } from '../cmps/PlayList';
import { StationHero } from '../cmps/StationHero';
import { DragDrop } from '../cmps/DragDrop';
import { Loader } from '../cmps/Loader';
import { socketService } from '../services/socket.service';



function _StationDetails({ match, stations, setDisplayedSongs, setStation, addSong }) {
    const [station, setStationToRender] = useState(null)
    const [query, setQuery] = useState('');
    const [list, setList] = useState({ songs: [] })

    useEffect(async () => {
        const stationId = match.params.id
        const reqStation = stations.filter(station => station._id === stationId)[0]
        setStation(reqStation)
        setStationToRender(reqStation)
    }, [stations, match.params.id])


    const search = async (ev) => {
        ev.preventDefault();
        const searchRes = await stationService.searchYouTube(query)
        setList(searchRes)
    };

    const onAddSong = async (song) => {
        const updatedStation = await addSong(station, song)
        socketService.emit('update station', updatedStation)
    }

    if (!station) return <Loader />
    return (
        <section className='station'>
            <StationHero station={station} />
            <DragDrop station={station} />
            <section className='search-by-text'>
                <div className="form-container flex column align-center">
                    <p>Let's find something for your playlist</p>
                    <form onSubmit={search} className='flex justify-center'>
                        <input autoFocus value={query} placeholder='Enter song or artist name'
                            onChange={e => setQuery(e.target.value)} />
                    </form>
                </div>
                {list.songs.length > 0 && <section className='search-results flex column'>
                    {list.songs.map((item, idx) => {
                        if (station.songs.every((currSong) => currSong._id !== item.id)) {
                            return (
                                <section key={idx} className='song-container flex'>
                                    <section className='song-info flex'>
                                        <section className='img-container'>
                                            <img src={item.bestThumbnail.url} />
                                        </section>
                                        <p className='title'>{item.title}</p>
                                    </section>

                                    <section className="wrraper flex space-around">
                                        <section className="song-duration">
                                            <p className="duration">{item.duration}</p>
                                        </section>
                                        <section className="add-song-btn">
                                            <button onClick={() => onAddSong(item)}>
                                                Add
                                            </button>
                                        </section>
                                    </section>

                                </section>
                            )
                        }
                    })}
                </section>
                }
            </section>



        </section>
    )
}


function mapStateToProps({ stationModule }) {
    return {
        stations: stationModule.stations
    }
}

const mapDispatchToProps = {
    setDisplayedSongs,
    setStation,
    addSong
}


export const StationDetails = connect(mapStateToProps, mapDispatchToProps)(_StationDetails)