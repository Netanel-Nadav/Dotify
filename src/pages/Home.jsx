import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Loader } from '../cmps/Loader';
import { StationList } from '../cmps/StationList';
import { StationListByGenre } from '../cmps/StationListByGenre';
import { stationService } from '../services/station.service';
import { loadStations, getGenres } from '../store/station.action';


function _Home({ stations, getGenres }) {

    const [genres, setGenres] = useState(null)

    useEffect ( async () => {
        const allGenres = await getGenres()
        setGenres(allGenres)
    },[])

    if(!genres) return <Loader/>
    return (
        <section className='stations-lists-container'>
            {stations ?
                <section >
                    {genres.map(genre => <StationListByGenre key={genre.name} stations={stations} genre={genre.name} />)}
                </section> : <Loader />}
        </section>
    )
}


function mapStateToProps({ stationModule }) {
    return {
        stations: stationModule.stations
    }
}

const mapDispatchToProps = {
    loadStations,
    getGenres
}


export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)