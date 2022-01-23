import React from "react";
import { connect } from "react-redux";

import { stationService } from "../services/station.service";
import { utilService } from "../services/util.service";
import { StationHero } from "../cmps/StationHero";
import { PlayList } from "../cmps/PlayList";
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

  // onSearch(ev) {
  //     ev.preventDefault()
  //     const search = utilService.debounce(this.search, 2000)
  //     search(ev)
  // }

  // search = async (ev) => {
  //     ev.preventDefault()
  //     this.setState({ query: ev.target.value }, async () => {
  //         const list = await stationService.searchYouTube(this.state.query)
  //         this.setState({ list })
  //     })
  // }

  setQuery = (ev) => {
    this.setState({ query: ev.target.value });
  };

  search = async (ev) => {
    ev.preventDefault();
    const searchRes = await stationService.searchYouTube(this.state.query);
    this.setState({ list: searchRes });
  };

  onAddSong = async (song) => {
    if (!this.state.newStation._id) await this.onMakeNewStation();
    const { newStation } = this.state;
    const savedStation = await this.props.addSong(newStation._id, song);
    this.setState({ newStation: savedStation });
  };

  onMakeNewStation = async () => {
    const newStation = await this.props.makeNewStation();
    this.setState({ newStation });
    return Promise.resolve();
  };

  render() {
    const { newStation, list, query } = this.state;
    return (
      <section className="new-station">
        <StationHero station={newStation} />

        {newStation.songs && <PlayList station={newStation} />}

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
              {/* <button className="search-btn">Search</button> */}
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
                          <img src={item.bestThumbnail.url} />
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
            <Recommendations list={list.recommendations} />
          </section>
        )}
      </section>
    );
  }
}

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  makeNewStation,
  addSong
};

export const CreateStation = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CreateStation);
