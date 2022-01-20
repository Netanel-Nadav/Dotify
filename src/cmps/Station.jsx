import React, { useState, useEffect } from 'react';

import { stationService } from "../services/station.service";

export function Station(stationId = null){
    const [station,setStation] = useState(null)

    useEffect ( async () => {
        const reqStation = await stationService.getById(stationId)
        setStation(reqStation)
    }, [])

    if(!station) return <h1>Loading...</h1>
    return (
        <section className='station'>
            <section className='station-hero'>
                <img src={station.imgUrl || station.songs[0].imgUrl} />
                <section>
                    <h3>STATION</h3>
                    <h1>{station.name}</h1>
                    <ul>
                        <li>{station.createdBy.fullname}</li>
                        <li>{station.likesCount} likes</li>
                        <li>{station.songs.length} songs</li>
                        <li>playlist time</li>
                    </ul>
                </section>
            </section>
            <section className='station-song-details'>
                <span>Title</span>
                <span>Date Added</span>
                <span>Duration</span>
            </section>
            <hr />
            {station.songs.map((song,idx) => {
                        return (
                            <section key={song._id} className='station-song-details'>
                                <span>{idx+1}</span>
                                <img src={song.imgUrl} />
                                <span>{song.title}</span>
                                <span>date</span>
                                <span>{song.duration}</span>
                            </section>
                        )
                    })}
        </section>
    )
}