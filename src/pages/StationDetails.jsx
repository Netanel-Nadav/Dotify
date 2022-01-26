import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import {setDisplayedSongs} from '../store/station.action'

import { stationService } from "../services/station.service";

import { PlayList } from '../cmps/PlayList';
import { StationHero } from '../cmps/StationHero';
import { DragDrop } from '../cmps/DragDrop';
import { Loader } from '../cmps/Loader';



function _StationDetails({ match,stations, setDisplayedSongs }) {
    const [station, setStation] = useState(null)

    useEffect(async () => {
        const stationId = match.params.id
        const reqStation = stations.filter (station => station._id === stationId)[0]
        // setDisplayedSongs(reqStation)
        setStation(reqStation)
    }, [stations])

    if (!station) return <Loader />
    return (
        <section className='station'>
            <StationHero station={station} />
            <DragDrop station={station} />
            {/* <PlayList station={station}/> */}
        </section>
    )
}


function mapStateToProps({ stationModule }) {
    return {
       stations: stationModule.stations
    }
}

const mapDispatchToProps = {
    setDisplayedSongs
}


export const StationDetails = connect(mapStateToProps, mapDispatchToProps)(_StationDetails)