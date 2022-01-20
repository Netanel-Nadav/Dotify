import React, { useState, useEffect } from 'react';
import { StationList } from '../cmps/StationList';

import { stationService } from '../services/station.service';

export function Home() {

    const [stations, setStations] = useState(null)

    useEffect(async () => {
        const stations = await stationService.query()
        setStations(stations)
    }, [])


    return (
        <section className='stations-lists-container'>
            {stations ?
                <section >
                    <h1>Hello dotify</h1>
                    <StationList stations={stations} />

                    {/* stations lists by labels */}
                </section> : <h1>Loading...</h1>}



        </section>
    )
}