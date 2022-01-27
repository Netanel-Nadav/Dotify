import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from "react-redux";
import { eventBusService } from '../services/event-bus.service'
import { socketService } from '../services/socket.service';
import { updateStation, setDisplayedSongs, deleteSong } from '../store/station.action'
import { setSongs } from "../store/media.action"
import { likeSong, unlikeSong, updateUser } from "../store/user.action";
import { Equalizer } from "./Equalizer";
import moment from 'moment';
import { GiPauseButton } from 'react-icons/gi';

export function _DragDrop({ station, updateStation, currSongId, deleteSong, displayedSongs, likeSong, unlikeSong, user, setSongs, isPlaying, updateUser}) {
  moment().format();

  const [songs, setSongsToRender] = useState(null);


  useEffect(() => {
    if (station) setSongsToRender(station.songs)
    else setSongsToRender(user.likedSongs)
  },[displayedSongs])


  // useEffect(() => {
  //   setSongsToRender(station?.songs)
  // },[station?.songs])

  const onDeleteSong = async (station, songId) => {
    const updatedStation = await deleteSong(station, songId)
    socketService.emit('update station', updatedStation)
  }  

  const onPlaySong = async (station, songId) => {
    await setSongs(station, songId);
    eventBusService.emit('playVideo')
  }


  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(songs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSongsToRender(items);

    if(station) {
      station.songs = items
      updateStation(station)
    }else {
      user.likedSongs = items
      updateUser(user)
    }
    
    socketService.emit('update station', station)

  }

  if (!songs) return <React.Fragment></React.Fragment>
  if (station && station.songs !== songs) setSongsToRender(station.songs)
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
                {songs.map((song, index) => {
                  return (
                    <Draggable key={song._id} draggableId={song._id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <section key={song._id} className={`station-song-details flex`}>
                            <section className={`song-info flex ${song._id === currSongId ? 'playing' : ''}`}>
                              {song._id !== currSongId ? <p className='title'>{index + 1}</p> : <Equalizer />}
                              <span
                                className={`play-icon ${song._id === currSongId ? 'dont-show' : ''}`}
                                onClick={() => onPlaySong(station, song._id)}
                              >{isPlaying ? <GiPauseButton className="pausing" /> :
                                <i className={`fas fa-play ${song._id === currSongId ? "equalizer" : ""
                                  }`}
                                ></i>}
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
                                    </button>
                                  }
                                  <button
                                    className="delete-btn"
                                    onClick={() => onDeleteSong(station, song._id)}
                                  >
                                    <i className="fas fa-trash-alt"></i>
                                  </button>
                                </div>
                              </section>
                            </section>
                          </section>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </section>
  );
}


function mapStateToProps({ stationModule, mediaModule, userModule }) {
  return {
    stations: stationModule.displayedSongs,
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
  updateUser
};

export const DragDrop = connect(mapStateToProps, mapDispatchToProps)(_DragDrop);














