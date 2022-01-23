import React from "react";
import YouTube from "react-youtube";
import { connect } from "react-redux";
import { AudioControllers } from "./AudioControllers";
import { VolumeController } from "./VolumeController";
import { SongData } from "./SongData";

import { changeSong, setRandomSong, resetAlreadyPlayed, toggleIsPlaying } from '../store/media.action'

class _AudioPlayer extends React.Component {
  state = {
    player: null,
    isShuffleOn: false,
    isRepeatOn: false,
    isMuteOn: false,
    volume: 50,
  };

  onReady = (event) => {
    // access to player in all event handlers via event.target
    console.log(event.target);
    this.setState({ player: event.target })
  }


  onSetVolume = (volume) => {
    this.setState({ volume }, () => {
      this.state.player.setVolume(volume)
    })
  };

  onSetMute = () => {
    this.setState({ isMuteOn: !this.state.isMuteOn }, () => {
      if (this.state.isMuteOn) this.state.player.mute();
      else this.state.player.unMute();
    });
  };


  onPlay = () => {
    this.state.player.playVideo()
    this.props.toggleIsPlaying()
  }

  onPause = () => {
    this.state.player.pauseVideo()
    this.props.toggleIsPlaying()
  }

  onNextSong = () => {
    if (this.state.isRepeatOn) {
      this.state.player.stopVideo()
      this.state.player.playVideo()
    }
    else if (this.state.isShuffleOn) this.props.setRandomSong()
    else {
      if (this.props.currSongIdx === this.props.currSongList.length - 1) return
      this.props.changeSong(1)
    }

  }

  onPrevSong = () => {
    if (this.state.isRepeatOn) {
      this.state.player.stopVideo()
      this.state.player.playVideo()
    }
    else if (this.state.isShuffleOn) this.props.setRandomSong()
    else {
      if (this.props.currSongIdx === 0) return
      this.props.changeSong(-1)
    }
  }

  onToggleShuffle = () => {
    this.setState({ isShuffleOn: !this.state.isShuffleOn }, () => {
      if (!this.state.isShuffleOn) this.props.resetAlreadyPlayed()
  
    })
  }

  onToggleRepeat = () => {
    this.setState({ isRepeatOn: !this.state.isRepeatOn })
  }

  render() {
    const opts = {
      height: "0",
      width: "0",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      }
    };
    const { volume } = this.state;
    const { currSongList, currSongIdx, currSongId, isPlaying } = this.props;

    return (
      <section className="player flex align-center">
        <SongData song={currSongList[currSongIdx]} />
        <div className="xxx">
          <YouTube
            videoId={currSongId}
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
          onToggleRepeat={this.onToggleRepeat}
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
    currSongIdx: mediaModule.currSongIdx,
    currSongId: mediaModule.currSongId,
    isPlaying: mediaModule.isPlaying
  }
}

const mapDispatchToProps = {
  changeSong,
  setRandomSong,
  resetAlreadyPlayed,
  toggleIsPlaying
}

export const AudioPlayer = connect(mapStateToProps, mapDispatchToProps)(_AudioPlayer)
