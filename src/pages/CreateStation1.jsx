import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import { stationService } from "../services/station.service";

import { StationHero } from "../cmps/StationHero";
import { DragDrop } from "../cmps/DragDrop";
import { Recommendations } from "../cmps/Recommendations";

import { makeNewStation, addSong } from "../store/station.action";


function _CreateStation1({ addSong, makeNewStation }) {
    const [newStation, setNewStation] = useState({songs: []})
    const [query, setQuery] = useState('')
    const [list, setList] = useState()


    const onSetQuery = (ev) => {
        setQuery(ev.target.value)
        window.scrollTo(0, 0)
    }

    const search = async (ev) => {
        ev.preventDefault();
        const searchRes = await stationService.searchYouTube(query);
        setList(searchRes)
    };

    const onAddSong = async (song) => {
        if (!newStation._id) {
            const station = await makeNewStation();
            setNewStation(newStation => station)
        }
        const savedStation = await addSong(newStation, song);
        setNewStation(savedStation)
    };
    
    const onMakeNewStation = async () => {
        const station = await makeNewStation();
        setNewStation(station)
        return Promise.resolve();
    }

    
    return (
        <section className='new-station'>
            <StationHero station={newStation}/>

            {newStation && <DragDrop station={newStation}/>}

            <section className="new-station-search">
                <div className="form-container flex column align-center">
                    <p>Let's find something for your playlist</p>
                    <form onSubmit={search}>
                        <input
                            autoFocus
                            value={query}
                            onChange={onSetQuery}
                            placeholder="Enter song or artist name"
                        />
                        {/* <button className="search-btn">Search</button> */}
                    </form>
                </div>

                {list && (
                    <section className="search-results flex column">
                        {list.songs.map((item, idx) => {
                            if (
                                newStation.songs.every((currSong) => currSong._id !== item.id)
                            ) {
                                return (
                                    <section key={idx} className="song-container flex">
                                        <section className="song-info flex">
                                            <section className="img-container">
                                                <img src={item.bestThumbnail.url} />
                                            </section>
                                            <p className="title">{item.title}</p>
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
                                );
                            }
                        })}
                    </section>
                )}
            </section>
            {list?.recommendations && (
                <section>
                    <hr />
                    <Recommendations list={list.recommendations} onSetQuery={onSetQuery} />
                </section>
            )}
        </section>
    )
}


function mapStateToProps() {
    return {};
}

const mapDispatchToProps = {
    makeNewStation,
    addSong
};

export const CreateStation1 = connect(mapStateToProps, mapDispatchToProps)(_CreateStation1);
