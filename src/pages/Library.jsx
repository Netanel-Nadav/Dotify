import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import { StationPreview } from '../cmps/StationPreview';

import { stationService } from '../services/station.service';
import { loadStations } from '../store/station.action';


function _Library({loadStations, stations}) {

    const [initDone, setInitiDone] = useState(false)

    // useEffect(async () => {
    //     if(!stations.length && !initDone) {
    //         loadStations()
    //         setInitiDone(true)
    //     }
    // }, [])

    // if(!stations) return <h1>Loading...</h1>
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


function mapStateToProps({ stationModule }) {
    return {
       stations: stationModule.stations
    }
}

const mapDispatchToProps = {
    loadStations
}


export const Library = connect(mapStateToProps, mapDispatchToProps)(_Library)