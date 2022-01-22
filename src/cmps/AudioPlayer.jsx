import React from "react";
import YouTube from "react-youtube";
import { connect } from "react-redux";
import { AudioControllers } from "./AudioControllers";
import { VolumeController } from "./VolumeController";
import { SongData } from "./SongData";

import {
  changeSong,
  setRandomSong,
  resetAlreadyPlayed
} from "../store/media.action";

class _AudioPlayer extends React.Component {
  state = {
    isPlaying: false,
    player: null,
    isShuffleOn: false,
    isMuteOn: false,
    volume: 50,
  };

  onReady = (event) => {
    // access to player in all event handlers via event.target
    console.log(event.target);
    this.setState({ player: event.target }, () => {
      this.state.player.getPlaylist();
    });
  };

  onPlay = () => {
    this.state.player.playVideo();
    this.setState({ isPlaying: !this.state.isPlaying });
  };

  onPause = () => {
    this.state.player.pauseVideo();
    this.setState({ isPlaying: !this.state.isPlaying });
  };

  onNextSong = () => {
    if (this.state.isShuffleOn) this.props.setRandomSong();
    else {
      if (this.props.currSongIdx === this.props.currSongList.length - 1) return;
      this.props.changeSong(1);
    }
  };

  onPrevSong = () => {
    if (this.state.isShuffleOn) this.props.setRandomSong();
    else {
      if (this.props.currSongIdx === 0) return;
      this.props.changeSong(-1);
    }
  };

  onSetVolume = (volume) => {
    this.setState({volume}, () => {
      this.state.player.setVolume(volume)
    })
  };

  // onSetMute = () => {
  //   const {isMuteOn, player} = this.state
  //   this.setState({isMuteOn: !isMuteOn}, () => {
  //     if(isMuteOn) player.mute()
  //     else player.unMute()
  //   })
  // }

  onSetMute = () => {
    this.setState({ isMuteOn: !this.state.isMuteOn }, () => {
      if (this.state.isMuteOn) this.state.player.mute();
      else this.state.player.unMute();
    });
  };

  onToggleShuffle = () => {
    this.setState({ isShuffleOn: !this.state.isShuffleOn }, () => {
      if (!this.state.isShuffleOn) this.props.resetAlreadyPlayed();
    });
  };

  render() {
    const opts = {
      height: "0",
      width: "0",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 1
      }
    };
    const { isPlaying, volume } = this.state;
    const { currSongList, currSongIdx } = this.props;

    return (
      <section className="player flex align-center">
        <SongData song={currSongList[currSongIdx]} />
        <div className="xxx">
          <YouTube
            videoId={currSongList[currSongIdx]?._id}
            opts={opts}
            onReady={this.onReady}
            onEnd={this.onNextSong}
          />
        </div>
        <AudioControllers
          isPlaying={isPlaying}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onNextSong={this.onNextSong}
          onPrevSong={this.onPrevSong}
          onToggleShuffle={this.onToggleShuffle}
        />
        <VolumeController
          onSetVolume={this.onSetVolume}
          onSetMute={this.onSetMute}
          volume={volume}
        />
      </section>
    );
  }
}

function mapStateToProps({ mediaModule }) {
  return {
    currStation: mediaModule.currStation,
    currSongList: mediaModule.currSongList,
    currSongIdx: mediaModule.currSongIdx
  };
}

const mapDispatchToProps = {
  changeSong,
  setRandomSong,
  resetAlreadyPlayed
};

export const AudioPlayer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AudioPlayer);
