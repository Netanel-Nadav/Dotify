import React, { useState } from "react";
import { connect } from "react-redux";

import { socketService } from "../services/socket.service";

import { EditPlaylist } from "./EditPlaylist"
import {toggleSharedListening} from '../store/user.action'
import { updateStation } from "../store/station.action"

export function _StationHero({ station, updateStation, user, toggleSharedListening }) {


  const [isModalShown, setIsModalShown] = useState(false)


  // const onToggleSharedListening = (stationId) => {
  //     if(!user.isSharedListening) {
  //       socketService.emit('join',stationId)
  //     } else socketService.emit('leave',stationId)
  //     toggleSharedListening()
  // }

  const {imgUrl, backgroundColor, songs} = station
  const transperent = 'rgb(0 0 0 / 0%)'
  return (
    <section className="station-header flex justify-center align-center" style={{backgroundImage: station._id ? `linear-gradient(181deg, ${backgroundColor}, ${transperent})` : `linear-gradient(181deg, rgb(192, 232, 216), ${transperent})`}}>
      <div className="hero-container flex">
        <div className="img-container" style={{backgroundImage: station.imgUrl ? `url(${imgUrl})` : `url(${songs[0]?.imgUrl})`}}>
          {station._id && <div className="edit-container">
            <button className="edit-btn" onClick={() => setIsModalShown(!isModalShown)}>
              <i className="fas fa-edit"></i>
            </button>
          </div>}
          {/* <i className="fas fa-user user-icon"></i> */}
        </div>
        <div className="user-info">
          <small>Playlist</small>

          {station.name ? <h1>{station.name}</h1> : <h1>New Playlist</h1>}
          {station._id && <p>
            <strong>{station?.createdBy?.fullname}</strong> &nbsp; &#8226; &nbsp;
            {station?.likesCount} likes &nbsp; &#8226; &nbsp;
            {station?.songs.length} songs &nbsp; &#8226; &nbsp;
            {station?.totalDuration}
          </p>}
        </div>
        {/* {user && <button onClick={() => onToggleSharedListening(station._id)}>Play Together</button>} */}
      </div>
      {isModalShown &&
        <EditPlaylist station={station} updateStation={updateStation} setIsModalShown={setIsModalShown} />}
    </section>
  );
}



function mapStateToProps({ userModule }) {
  return {
    user: userModule.user
  };
}

const mapDispatchToProps = {
  updateStation,
  toggleSharedListening

};

export const StationHero = connect(mapStateToProps, mapDispatchToProps)(_StationHero);