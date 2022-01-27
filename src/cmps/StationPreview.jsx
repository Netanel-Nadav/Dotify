import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setStation } from "../store/media.action";

function _StationPreview({ station, setStation }) {

    if (!station.songs.length) return <React.Fragment></React.Fragment>
    return (
        <Link to={`/station/${station._id}`}>
            <section className='station-preview card flex' onClick={() => setStation(station)} >
                <div className='img-container square-ratio'>
                    <img src={station.imgUrl ? station.imgUrl : station.songs[0].imgUrl} />
                </div>
                <button className='play-btn' ><i className="fas fa-play-circle"></i></button>

                <div className='info-container flex column'>
                    <h3>{station.name}</h3>
                    <small>{station.createdBy.fullname}</small>

                    <div className="likes-count-container flex align-center">
                        <i className="fas fa-heart heart-icon"></i>
                        <small><em>{station.likesCount}</em></small>
                    </div>

                </div>
            </section>
        </Link>
    )
}

function mapStateToProps({ }) {
    return {};
}

const mapDispatchToProps = {
    setStation
};

export const StationPreview = connect(
    mapStateToProps,
    mapDispatchToProps
)(_StationPreview);
