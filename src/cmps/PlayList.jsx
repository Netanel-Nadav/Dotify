import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from 'moment';

import { setSongs, setStation } from "../store/media.action";
import { deleteSong, setDisplayedSongs } from "../store/station.action";
import { likeSong } from "../store/user.action";
import { DragDrop } from "./DragDrop";
import { Equalizer } from "./Equalizer";


function _PlayList({ station, setSongs, deleteSong, setDisplayedSongs, displayedSongs, currSongId, player, isPlaying, likeSong, user }) {
  moment().format();

  useEffect(() => {
    setDisplayedSongs(station);
  }, []);

  const onPlaySong = async (station, songId) => {
    await setSongs(station, songId);
    player.playVideo();
  }

  return (
    <section className="playlist">
      <section className="station-song-info-title flex">
        <div className="title-container flex">
          <p className="song-index">#</p>
          <p className="title">Title</p>
        </div>
        <section className="wrraper flex space-between">
          <p className="date-addedAt">Date Added</p>
          <p className="duration">
            <i className="fas fa-clock"></i>
          </p>
        </section>
      </section>
      <hr />
      {/* <DragDrop /> */}
      {
        displayedSongs.length > 0 && <section className="songs-container flex column">
          {displayedSongs.map((song, idx) => {
            return (
              <section key={song._id} className={`station-song-details flex`}>
                <section className={`song-info flex ${song._id === currSongId ? 'playing' : ''}`}>
                  {song._id !== currSongId ? <p className='title'>{idx + 1}</p> : <Equalizer />}
                  <span
                    className={`play-icon ${song._id === currSongId ? 'dont-show' : ''}`}
                    onClick={() => onPlaySong(station, song._id)}
                  >
                    <i
                      className={`fas fa-play ${song._id === currSongId ? "equalizer" : ""
                        }`}
                    ></i>
                  </span>
                  <section
                    className={`img-container ${song._id === currSongId ? "playing" : ""
                      }`}
                  >
                    <img src={song.imgUrl} />
                  </section>
                  <p className="">{song.title}</p>
                </section>
                <section className="wrraper flex space-between">
                  <section className="song-addedAt">
                    <p>{moment(song.addedAt).fromNow()}</p>
                  </section>
                  <section className="song-duration btns flex">
                    <p>{song.duration}</p>
                    <div className="btn-container flex">
                      <button className="like-btn">
                        <i className={user?.likedSongs.some(likedSong => likedSong._id === song._id) ? "fas fa-heart liked" : "far fa-heart"} onClick={() => likeSong(song)}></i>
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteSong(station, song._id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </section>
                </section>
              </section>
            );
          })
          }
        </section>}
      <hr />
    </section>
  );
}

function mapStateToProps({ stationModule, mediaModule, userModule }) {
  return {
    displayedSongs: stationModule.displayedSongs,
    currSongId: mediaModule.currSongId,
    player: mediaModule.player,
    user: userModule.user
  };
}

const mapDispatchToProps = {
  setSongs,
  setStation,
  deleteSong,
  setDisplayedSongs,
  likeSong
};

export const PlayList = connect(mapStateToProps, mapDispatchToProps)(_PlayList);
