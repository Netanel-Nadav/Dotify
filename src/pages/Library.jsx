import React, { useState, useEffect } from 'react';
import { StationPreview } from '../cmps/StationPreview';

import { stationService } from '../services/station.service';


export function Library() {

    const [stations, setStations] = useState(null)

    useEffect ( async () => {
        const allStations = await stationService.query()
        setStations(allStations)
    })


    if(!stations) return <h1>Loading...</h1>
    return (
        <section className='station-list-library flex'>
            {stations.map(station => {
                return (
                 <StationPreview key={station._id} station={station}/>
                )
            })}
        </section>
    )
}