import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from "react-redux";
import { useParams } from 'react-router-dom';
import { stationService } from '../services/station.service';
import { eventBusService } from '../services/event-bus.service';
import { updateStation, setDisplayedSongs, deleteSong } from '../store/station.action'
import { setSongs } from '../store/media.action'
import { Equalizer } from "./Equalizer";
import moment from 'moment';

export function _DragDrop({ station, updateStation, currSongId, deleteSong, displayedSongs, setSongs }) {
  moment().format();

  // const [stationToRender, setStationToRender] = useState(null);
  const [songs, setSongsToRender] = useState(null);


  useEffect(() => {
    // setStationToRender(station)
    setSongsToRender(station.songs)
  }, [displayedSongs])



  const onPlaySong = async (station, songId) => {
    await setSongs(station, songId);
    eventBusService.emit('playVideo');
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(songs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSongsToRender(items);
    station.songs = items
    updateStation(station)
  }

  if (!songs) return <React.Fragment></React.Fragment>
  return (
    <div className="drag-drop-container">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="song-container">
          {(provided) => (
            <ul className="songs-list" {...provided.droppableProps} ref={provided.innerRef}>
              {console.log(songs)}
              {songs && songs.map((song, index) => {
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
  );
}


function mapStateToProps({ stationModule, mediaModule }) {
  return {
    stations: stationModule.displayedSongs,
    displayedSongs: stationModule.displayedSongs,
    currSongId: mediaModule.currSongId,
  };
}

const mapDispatchToProps = {
  updateStation,
  setDisplayedSongs,
  deleteSong,
  setSongs
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








