import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import { Loader } from '../cmps/Loader';
import { StationListByGenre } from '../cmps/StationListByGenre';
import { loadStations, getGenres } from '../store/station.action';



function _Home({ stations, getGenres }) {

    const [genres, setGenres] = useState(null)
    const [stationsToRender, setStationsToRender] = useState(null)

    useEffect(async () => {
        const allGenres = await getGenres()
        setGenres(allGenres)
    }, [])

    useEffect(() => {
        setStationsToRender(stations)
    },[stations])

    if (!genres || !stationsToRender) return <Loader />
    return (
        <section className='stations-lists-container'>
            <section >
                {genres.map(genre => <StationListByGenre key={genre.name} stations={stationsToRender} genre={genre.name} />)}
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
    loadStations,
    getGenres
}


export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)