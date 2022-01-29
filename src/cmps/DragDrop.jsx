import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from "react-redux";
import { eventBusService } from '../services/event-bus.service'
import { addSong, updateStation, setDisplayedSongs, deleteSong } from '../store/station.action'
import { setSongs } from "../store/media.action"
import { likeSong, unlikeSong } from "../store/user.action";
import { Equalizer } from "./Equalizer";
import moment from 'moment';
import { GiPauseButton } from 'react-icons/gi';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Link } from 'react-router-dom';


export function _DragDrop({ station, stations, updateStation, currSongId, deleteSong, displayedSongs, likeSong, unlikeSong, user, setSongs, isPlaying, addSong }) {
  moment().format();

  const [songs, setSongsToRender] = useState(null);
  const [showModal, setModal] = useState(false);
  const [showOpts, setOpts] = useState(false);

  useEffect(() => {
    if (station) setSongsToRender(station.songs)
    else setSongsToRender(user.likedSongs)
  }, [])

  useEffect(() => {
    setSongsToRender(displayedSongs)
  }, [displayedSongs])

  useEffect(() => {
    setSongsToRender(station.songs)
  }, [station.songs])

  const onPlayPauseSong = async (station, songId) => {
    await setSongs(station, songId);
    eventBusService.emit('playPauseVideo');
  }

  // const onDeleteSong = async (station, songId) => {
  //   const updatedStation = await deleteSong(station, songId)
  //   if(deleteSongsOnNew) deleteSongsOnNew(updatedStation)
  // }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(songs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSongsToRender(items);
    station.songs = items
    updateStation(station)
  }

  const toggleMoreOpts = () => {
    setOpts(!showOpts);
  }

  const openAddModal = () => {
    setModal(!showModal);
  }

  const addSongToPlaylist = async (station, song) => {
    console.log('station', station);
    console.log('song', song);
    await addSong(station, song, false);
    console.log(`song ${song._id} added`)
  }

  if (!songs) return <React.Fragment></React.Fragment>
  return (
    <section>
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
      <div className="drag-drop-container">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="song-container">
            {(provided) => (
              <ul className="songs-list" {...provided.droppableProps} ref={provided.innerRef}>
                {songs && songs.map((song, index) => {
                  return (
                    <Draggable key={song._id} draggableId={song._id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <section key={song._id} className={`station-song-details flex`}>
                            <section className={`song-info flex ${song._id === currSongId ? 'playing' : ''}`}>
                              {song._id === currSongId && isPlaying ? <Equalizer className="equalizer" /> : <p className='title'>{index + 1}</p>}
                              <span
                                className="play-pause-icon" onClick={() => onPlayPauseSong(station, song._id)}>
                                {song._id === currSongId && isPlaying ? <GiPauseButton className="pause" /> :
                                  <i className="fas fa-play"></i>}
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
                                  {user?.likedSongs.some(likedSong => likedSong._id === song._id) ?
                                    <button className="like-btn">
                                      <i className="fas fa-heart liked" onClick={() => unlikeSong(song._id)} ></i>
                                    </button>
                                    :
                                    <button className="like-btn">
                                      <i className="far fa-heart" onClick={() => likeSong(song)}></i>
                                    </button>}
                                  {/* <button className="like-btn">
                                    <i className={user?.likedSongs.some(likedSong => likedSong._id === song._id) ? "fas fa-heart liked" : "far fa-heart"} onClick={() => likeSong(song)}></i>
                                  </button> */}
                                  <button className="more-btn" onClick={toggleMoreOpts}><FiMoreHorizontal /></button>
                                  {showOpts && <div className={`opts flex column`}>
                                    <button className="like-btn">
                                      {user?.likedSongs.some(likedSong => likedSong._id === song._id) ?
                                        <p className="" onClick={() => unlikeSong(song._id)} >Remove from your Liked Songs</p>
                                        :
                                        <p className="empty heart" onClick={() => likeSong(song)}>Save to your Liked Songs</p>
                                      }
                                    </button>
                                    <button className="delete-btn" onClick={() => deleteSong(station, song._id)}>
                                      Remove from this playlist</button>
                                    <button className={`addTo-btn`} onClick={openAddModal}>Add to playlist</button>
                                  </div>}
                                  <div className={`choose-playlist flex column ${showModal ? "" : "hidden"}`}>
                                    <Link to={"/newStation"}>Add to new playlist</Link>
                                    {user && stations.filter(station => user._id === station.createdBy._id).map(station => {
                                      return <button onClick={() => addSongToPlaylist(station, song)}>{station.name}</button>
                                    })}
                                  </div>
                                </div>

                              </section>

                            </section>

                          </section>

                        </li>
                      )
                      }
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </section >
  );
}


function mapStateToProps({ stationModule, mediaModule, userModule }) {
  return {
    stations: stationModule.stations,
    displayedSongs: stationModule.displayedSongs,
    currSongId: mediaModule.currSongId,
    user: userModule.user,
    isPlaying: mediaModule.isPlaying
  };
}

const mapDispatchToProps = {
  updateStation,
  setDisplayedSongs,
  deleteSong,
  setSongs,
  likeSong,
  unlikeSong,
  addSong
};

export const DragDrop = connect(mapStateToProps, mapDispatchToProps)(_DragDrop);





// _id, title, imgUrl, addedAtForShow, duration 
{/* <div className='drag-song-container flex align-center'>
<div className='idx-img-title flex align-center'>
  <small className='idx'>{index + 1}</small>
  <small className='play-icon'><i className="fas fa-play"></i></small>
  <div className='img-container'>
    <img src={imgUrl} />
  </div>
  <p>{title}</p>
</div>

<div className='dateAdded-duration flex'>
  <p>{addedAtForShow}</p>
  <p>{duration}</p>
</div>
</div> */}