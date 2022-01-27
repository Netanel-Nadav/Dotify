
import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { Loader } from '../cmps/Loader';
import { StationPreview } from '../cmps/StationPreview';



function _GenreStations({stations}) {

    const [stationsToRender, setStations] = useState(null)
    const genreName = useParams().name


    useEffect (() => {
        const reqStations = stations.filter (station => station.tags.includes(genreName))
        setStations(reqStations)
    }, [])


    if(!stationsToRender) return <Loader/>
    return (
        <section className='station-list'>
            {stationsToRender.map(station => <StationPreview key={station._id} station={station}/>)}
        </section>
    )
}



function mapStateToProps({ stationModule }) {
    return {
       stations: stationModule.stations
    }
}

const mapDispatchToProps = {
}


export const GenreStations = connect(mapStateToProps, mapDispatchToProps)(_GenreStations)