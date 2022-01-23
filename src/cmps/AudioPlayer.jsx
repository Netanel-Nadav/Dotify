import React from "react";
import YouTube from "react-youtube";
import { connect } from "react-redux";
import { AudioControllers } from "./AudioControllers";
import { VolumeController } from "./VolumeController";
import { SongData } from "./SongData";

import { changeSong, setRandomSong, resetAlreadyPlayed, toggleIsPlaying, setShuffleState } from '../store/media.action'
import { GiTigerHead } from "react-icons/gi";

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


  onPlayPause = () => {
    const { player } = this.state;
    if (this.props.currSongId) {
      this.props.toggleIsPlaying()
      if (this.props.isPlaying) {
        player.playVideo()
      } else player.pauseVideo()
    }
  }

  // onPause = () => {
  //   if (this.props.currSongId) {
  //     this.state.player.pauseVideo()
  //     this.props.toggleIsPlaying()
  //   }

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
    else if (this.state.isShuffleOn) {
      this.props.setRandomSong()
    }
    else {
      if (this.props.currSongIdx === 0) return
      this.props.changeSong(-1)
    }
  }

  onToggleShuffle = () => {
    this.setState({ isShuffleOn: !this.state.isShuffleOn }, () => {
      if (this.state.isRepeatOn && this.state.isShuffleOn) this.setState({ isRepeatOn: false }); //turn off repeat if its on
      if (this.state.isShuffleOn) { // if shuffle working
        this.props.setShuffleState();
      }
      else this.props.resetAlreadyPlayed() // if shuffle not working

    })
  }

  onToggleRepeat = () => {
    this.setState({ isRepeatOn: !this.state.isRepeatOn }, () => {
      if (this.state.isShuffleOn && this.state.isRepeatOn) this.setState({ isShuffleOn: false }); //turn off shuffle if its on
    })
  }

  onStateChange = () => {

  }

  render() {
    const opts = {
      height: "0",
      width: "0",
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
            onStateChange={this.onStateChange}
          />
        </div>
        <AudioControllers
          isPlaying={isPlaying}
          onPlay={this.onPlayPause}
          onPause={this.onPlayPause}
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
  toggleIsPlaying,
  setShuffleState
}

export const AudioPlayer = connect(mapStateToProps, mapDispatchToProps)(_AudioPlayer)
