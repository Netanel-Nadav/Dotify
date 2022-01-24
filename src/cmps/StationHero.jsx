import React, { useState } from "react";
import { connect } from "react-redux";


import { EditPlaylist } from "./EditPlaylist"
import { updateStation } from "../store/station.action"

export function _StationHero({ station, updateStation }) {



  const [isModalShown, setIsModalShown] = useState(false)

  return (
    <section className="station-header">


      <div className="hero-container flex align-center">
        <div className="img-container">
          <div className="edit-container">
            <button className="edit-btn" onClick={() => setIsModalShown(!isModalShown)}>
              <i className="fas fa-edit"></i>
            </button>
          </div>
          <i className="fas fa-user user-icon"></i>
        </div>
        <div className="user-info">
          <small>Playlist</small>

          <h1>{station?.name}</h1>
          {station._id && <p>
            {station?.createdBy?.fullname} &nbsp; &#8226; &nbsp;
            {station?.likesCount} likes &nbsp; &#8226; &nbsp;
            {station?.songs.length} songs
          </p>}
        </div>
      </div>
      {isModalShown &&
        <EditPlaylist station={station} updateStation={updateStation} setIsModalShown={setIsModalShown} />}
    </section>
  );
}



function mapStateToProps({ }) {
  return {

  };
}

const mapDispatchToProps = {
  updateStation

};

export const StationHero = connect(mapStateToProps, mapDispatchToProps)(_StationHero);