
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { StationPreview } from '../cmps/StationPreview';
import { Loader } from '../cmps/Loader'
import { stationService } from '../services/station.service'



export function StationListByGenre({ stations, genre }) {

    const [stationsByGenre, setStationsByGenre] = useState(null)

    useEffect(() => {
        setStationByGenre()
    }, [])


    const setStationByGenre = async () => {
        try {
            const stationsByGenre = await stationService.getStationByGenre(stations, genre)
            setStationsByGenre(stationsByGenre)
        } catch (err) {
            console.log('Error while setting stations by genres', err)
        }
    }

    if (!stationsByGenre) return <Loader />
    return (
        <section className='station-list-by-genre'>
            <div className='wrraper flex space-between align-center'>
                <h1>{genre}</h1>
                <Link to={`/genre/${genre}`}><p>See all</p></Link>
            </div>
            <section className='station-list'>
                {stationsByGenre.slice(0, 8).map(station => <StationPreview key={station._id} station={station} />)}
            </section>
        </section>
    )
}