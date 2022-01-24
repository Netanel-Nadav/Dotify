import { useEffect } from "react";
import { connect } from "react-redux";

import { setSongs, setStation } from "../store/media.action";
import { deleteSong, setDisplayedSongs } from "../store/station.action";
import { DragDrop } from "./DragDrop";
import { Equalizer } from "./Equalizer";


function _PlayList({ station, setSongs, setStation, deleteSong, setDisplayedSongs, displayedSongs, currSongId }) {
  useEffect(() => {
    setStation(station);
    setDisplayedSongs(station);
  }, []);

  return (
    <section className="playlist">
      <section className="station-song-info-title flex">
        <div className="title-container flex">
          <p className="song-index">#</p>
          <p className="title">Title</p>
        </div>
        <section className="wrraper flex space-around">
          <p className="date-addedAt">Date Added</p>
          <p className="duration">
            <i className="fas fa-clock"></i>
          </p>
        </section>
      </section>
      <hr />
      <section className="songs-container flex column">
        {displayedSongs.map((song, idx) => {
          return (
            <section key={song._id} className={`station-song-details flex`}>
              {/* <DragDrop displayedSongs={displayedSongs}/> */}
              <section
                className={`song-info flex ${song._id === currSongId ? "playing" : ""
                  }`}
              >
                {song._id !== currSongId ? (
                  <p className="absolute">{idx + 1}</p>
                ) : (
                  <Equalizer />
                )}
                <span
                  className={`play-icon absolute ${song._id === currSongId ? "dont-show" : ""
                    }`}
                  onClick={() => setSongs(station, song._id)}
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
              <section className="wrraper flex space-around">
                <section className="song-addedAt">
                  <p>{song.addedAtForShow}</p>
                </section>
                <section className="song-duration btns flex">
                  <p>{song.duration}</p>
                  <div className="btn-container flex">
                    <button className="like-btn">
                      <i className="far fa-heart"></i>
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteSong(station._id, song._id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </section>
              </section>
            </section>
          );
        })}
      </section>
      <hr />
    </section>
  );
}

function mapStateToProps({ stationModule, mediaModule }) {
  return {
    displayedSongs: stationModule.displayedSongs,
    currSongId: mediaModule.currSongId
  };
}

const mapDispatchToProps = {
  setSongs,
  setStation,
  deleteSong,
  setDisplayedSongs
};

export const PlayList = connect(mapStateToProps, mapDispatchToProps)(_PlayList);
