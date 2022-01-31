import React from "react";
import { connect } from "react-redux";

import { stationService } from "../services/station.service";
import { socketService } from "../services/socket.service";

import { StationHero } from "../cmps/StationHero";
import { DragDrop } from "../cmps/DragDrop";
import { Recommendations } from "../cmps/Recommendations";

import { makeNewStation, addSong } from "../store/station.action";

class _CreateStation extends React.Component {
  state = {
    newStation: {
      songs: []
    },
    query: "",
    list: null
  };

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.stations !== this.props.stations && this.state.newStation._id) {
      const station = this.props.stations.find(station => this.state.newStation._id === station._id)
      this.setState({newStation: station})
    }
  }

  setQuery = (ev) => {
    this.setState({ query: ev.target.value });
  };

  onSetQuery = (query) => {
    this.setState({query})
    window.scrollTo(0,0)
  }

  search = async (ev) => {
    ev.preventDefault();
    const searchRes = await stationService.searchYouTube(this.state.query);
    this.setState({ list: searchRes });
  };

  onAddSong = async (song) => {
    if (!this.state.newStation._id) await this.onMakeNewStation();
    const { newStation } = this.state;
    const updatedStation = await this.props.addSong(newStation, song);
    socketService.emit('update station', updatedStation)
  };


  onMakeNewStation = async () => {
    const newStation = await this.props.makeNewStation();
    this.setState({ newStation }, () => {
      socketService.emit('station added',this.state.newStation)
    });
    return Promise.resolve();
  };

  render() {
    const { newStation, list, query } = this.state;
    return (
      <section className="new-station">
        <StationHero station={newStation} />

        {newStation.songs && <DragDrop station={newStation} />}

        <section className="new-station-search">
          <div className="form-container flex column align-center">
            <p>Let's find something for your playlist</p>
            <form onSubmit={this.search}>
              <input
                autoFocus
                value={query}
                onChange={this.setQuery}
                placeholder="Enter song or artist name"
              />
            </form>
          </div>

          {list && (
            <section className="search-results flex column">
              {list.songs.map((item, idx) => {
                if (
                  newStation.songs.every((currSong) => currSong._id !== item.id)
                ) {
                  return (
                    <section key={idx} className="song-container flex">
                      <section className="song-info flex">
                        <section className="img-container">
                          <img src={item.bestThumbnail.url} onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; 
                                        currentTarget.src = 'https://res.cloudinary.com/dvxuxsyoe/image/upload/v1643626113/l4almbflgdazzlmyzmq6.jpg'
                                    }}  />
                        </section>
                        <p className="title">{item.title}</p>
                      </section>

                      <section className="wrraper flex space-around">
                        <section className="song-duration">
                          <p className="duration">{item.duration}</p>
                        </section>
                        <section className="add-song-btn">
                          <button onClick={() => this.onAddSong(item)}>
                            Add
                          </button>
                        </section>
                      </section>
                    </section>
                  );
                }
              })}
            </section>
          )}
        </section>
        {list?.recommendations && (
          <section>
            <hr />
            <Recommendations list={list.recommendations} onSetQuery={this.onSetQuery} />
          </section>
        )}
      </section>
    );
  }
}

function mapStateToProps({stationModule}) {
  return {
    stations: stationModule.stations
  };
}

const mapDispatchToProps = {
  makeNewStation,
  addSong,
};

export const CreateStation = connect(mapStateToProps,mapDispatchToProps)(_CreateStation);
