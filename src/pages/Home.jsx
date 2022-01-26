import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Loader } from '../cmps/Loader';
import { StationList } from '../cmps/StationList';
import { loadStations } from '../store/station.action';


function _Home({ stations }) {

    return (
        <section className='stations-lists-container'>
            {stations ?
                <section >
                    <StationList stations={stations} />
                    {/* stations lists by labels */}
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
    loadStations
}


export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)