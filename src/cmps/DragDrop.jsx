import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from "react-redux";
import { eventBusService } from '../services/event-bus.service'
import { addSong, updateStation, setDisplayedSongs, deleteSong } from '../store/station.action'
import { socketService } from '../services/socket.service';
import { setSongs, setSongsAfterDnd } from "../store/media.action"
import { likeSong, unlikeSong, updateUser } from "../store/user.action";
import { Equalizer } from "./Equalizer";
import moment from 'moment';
import { GiPauseButton } from 'react-icons/gi';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Link } from 'react-router-dom';


export function _DragDrop({ station, stations, updateStation, currSongId, deleteSong, displayedSongs, likeSong, unlikeSong, user, setSongs, isPlaying, addSong, updateUser, setSongsAfterDnd }) {
  moment().format();

  const [songs, setSongsToRender] = useState(null);
  const [showModal, setModal] = useState(false);
  const [showOpts, setOpts] = useState(false);
  const [currSong, setCurrSong] = useState(null)

  useEffect(() => {
    if (station) setSongsToRender(station.songs)
    else setSongsToRender(user.likedSongs)
  }, [displayedSongs,user.likedSongs])

  const onDeleteSong = async (station, songId) => {
    const updatedStation = await deleteSong(station, songId)
    socketService.emit('update station', updatedStation)
  }

  const onHandleLikeSong = async (songId) => {
    if (user?.likedSongs.some(likedSong => likedSong._id === songId)) unlikeSong(songId)
    else likeSong(songId)
    setOpts(false)
  }

  const onPlayPauseSong = async (station, songId) => {
    await setSongs(station, songId);
    eventBusService.emit('playPauseVideo');
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(songs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSongsToRender(items);

    if (station) {
      station.songs = items
      updateStation(station)
      setSongsAfterDnd(station)
    } else {
      user.likedSongs = items
      updateUser(user)
    }

    socketService.emit('update station', station)

  }

  const toggleMoreOpts = (songId) => {
    setCurrSong(songId)
    if (showOpts && showModal) setModal(false)
    setOpts(!showOpts);
  }

  const openAddModal = () => {

    setModal(!showModal);
  }

  const addSongToPlaylist = (station, song) => {
    addSong(station, song, false);
  }

  if (!songs) return <React.Fragment></React.Fragment>
  if (station && station.songs !== songs) setSongsToRender(station.songs)
  return (
    <section className='station-details-container'>
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
                {songs.map((song, index) => {
                  return (
                    <Draggable key={song._id} draggableId={song._id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <section key={song._id} className={`station-song-details flex ${showOpts && currSong === song._id ? 'chosen' : ''}`}>
                            <section className={`song-info flex ${song._id === currSongId ? 'playing' : ''}`}>
                              <div className='icons-container flex justify-contet align-center'>
                                {song._id === currSongId && isPlaying ? <Equalizer className="equalizer" /> : <p className='title'>{index + 1}</p>}
                                <span
                                  className="play-pause-icon" onClick={() => onPlayPauseSong(station, song._id)}>
                                  {song._id === currSongId && isPlaying ? <GiPauseButton className="pause" /> :
                                    <i className="fas fa-play"></i>}
                                </span>
                              </div>
                              <section
                                className={`img-container ${song._id === currSongId ? "playing" : ""
                                  }`}
                              >
                                <img src={song.imgUrl} onError={({ currentTarget }) => {
                                  currentTarget.onerror = null;
                                  currentTarget.src = 'https://res.cloudinary.com/dvxuxsyoe/image/upload/v1643626113/l4almbflgdazzlmyzmq6.jpg'
                                }} />
                              </section>
                              <p className="">{song.title}</p>
                            </section>
                            <section className="wrraper flex space-between">
                              <section className="song-addedAt">
                                <p>{moment(song.addedAt).fromNow()}</p>
                              </section>
                              <section className="song-duration btns flex">
                                <p className='p'>{song.duration}</p>
                                <div className="btn-container flex">
                                  {user?.likedSongs.some(likedSong => likedSong._id === song._id) ?
                                    <button className="like-btn heart liked">
                                      <i className="fas fa-heart liked" onClick={() => onHandleLikeSong(song._id)} ></i>
                                    </button>
                                    :
                                    <button className="like-btn heart ">
                                      <i className="far fa-heart" onClick={() => onHandleLikeSong(song)}></i>
                                    </button>}
                                  <button className="more-btn" onClick={() => toggleMoreOpts(song._id)}><FiMoreHorizontal /></button>
                                  {
                                    showOpts && currSong === song._id && <div className={`opts flex column space-between`}>
                                      <button className="like-btn text">
                                        {user?.likedSongs.some(likedSong => likedSong._id === song._id) ?
                                          <p className="" onClick={() => onHandleLikeSong(song._id)} >Remove from your Liked Songs</p>
                                          :
                                          <p className="empty heart" onClick={() => onHandleLikeSong(song)}>Save to your Liked Songs</p>
                                        }
                                      </button>
                                      <button className="delete-btn" onClick={() => onDeleteSong(station, song._id)}>
                                        Remove from this playlist</button>
                                      <button className={`addTo-btn`} onMouseOver={openAddModal}>Add to playlist</button>
                                    </div>
                                  }
                                  {showModal && currSong === song._id && <div className={`choose-playlist flex column ${showModal ? "" : "hidden"}`}>
                                    <Link to={"/newStation"}>Add to new playlist</Link>
                                    {user && stations.filter(station => user._id === station.createdBy._id).map(station => {
                                      return <button onClick={() => addSongToPlaylist(station, song)}>{station.name}</button>
                                    })}
                                  </div>}
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
  addSong,
  updateUser,
  setSongsAfterDnd
};

export const DragDrop = connect(mapStateToProps, mapDispatchToProps)(_DragDrop);
