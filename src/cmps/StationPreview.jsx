import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { socketService } from "../services/socket.service";

import { setStation } from "../store/media.action";
import { likeStation, unLikeStation } from "../store/user.action";
import { updateStation } from "../store/station.action";

function _StationPreview({ station, setStation, user, likeStation, unLikeStation, updateStation }) {

    const [stationToRender, setStationToRender] = useState(null)

    useEffect(() => {
        setStationToRender(station)
    }, [station.likesCount])

    
    const onHandleLikeStation = async (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        if (user.likedStations.some(likedStation => likedStation === station._id)) {
            await unLikeStation(station._id)
            station.likesCount--
        } else {
            await likeStation(station._id)
            station.likesCount++
        }
        const updatedStation = await updateStation(station)
        socketService.emit('update station', updatedStation)
    }

    if (!stationToRender) return <React.Fragment></React.Fragment>
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
                    {/* <small>{station.createdBy.fullname}</small> */}

                    {/* <div className="likes-count-container flex align-center">
                        <i className="fas fa-heart heart-icon"></i>
                        <small><em>{station.likesCount}</em></small>
                    </div> */}
                    <div className="likes-count-container flex align-center">
                        {user?.likedStations.some(likedStation => likedStation === station._id) ?
                            <i className="fas fa-heart liked" onClick={onHandleLikeStation}></i>
                            :
                            <i className="far fa-heart heart-icon" onClick={onHandleLikeStation} ></i>}
                        <small><em>{stationToRender.likesCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</em></small>
                    </div>

                </div>
            </section>
        </Link>
    )
}

function mapStateToProps({ userModule }) {
    return {
        user: userModule.user
    };
}

const mapDispatchToProps = {
    setStation,
    likeStation,
    unLikeStation,
    updateStation
};

export const StationPreview = connect(
    mapStateToProps,
    mapDispatchToProps
)(_StationPreview);
