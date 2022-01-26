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
                <div className='wrraper flex'>
                    <div className='info-container'>
                        <h3>{station.name}</h3>
                        <small>{station.createdBy.fullname}</small>
                    </div>
                    <div className='likes-count flex column align-center space-between'>
                        <small>{station.likesCount}</small>
                    <i className="fas fa-heart heart-icon"></i>
                    </div>
                </div>
            </section>
        </Link>
    )
}

function mapStateToProps({}) {
  return {};
}

const mapDispatchToProps = {
  setStation
};

export const StationPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_StationPreview);
