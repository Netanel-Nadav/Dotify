import React from "react";

export function StationHero({ station }) {
  return (
    <section className="station-header">


      <div className="hero-container flex">
        <div className="img-container">
          <i className="fas fa-user user-icon"></i>
        </div>
        <div className="user-info">
          <small>Playlist</small>
          <h1 contentEditable>{station?.name}</h1>
          {station._id && <p>
            {station?.createdBy?.fullname} &nbsp; &#8226; &nbsp;
            {station?.likesCount} likes &nbsp; &#8226; &nbsp;
            {station?.songs.length} songs
          </p>}
        </div>
      </div>


    </section>
  );
}
