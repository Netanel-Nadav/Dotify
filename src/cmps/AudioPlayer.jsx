import React from "react";
import YouTube from "react-youtube";
import { connect } from "react-redux";
import { AudioControllers } from "./AudioControllers";
import { VolumeController } from "./VolumeController";
import { SongData } from "./SongData";

import { setPlayer, changeSong, setRandomSong, resetAlreadyPlayed, toggleIsPlaying, setShuffleState } from '../store/media.action';

class _AudioPlayer extends React.Component {
  state = {
    player: null,
    isShuffleOn: false,
    isRepeatOn: false,
    isMuteOn: false,
    volume: 50,
  };

  onReady = async (event) => {
    // access to player in all event handlers via event.target
    const player = event.target;
    await this.props.setPlayer(player);
  }

  onSetVolume = (volume) => {
    this.setState({ volume }, () => {
      this.props.player.setVolume(volume);
    })
  };

  onSetMute = () => {
    this.setState({ isMuteOn: !this.state.isMuteOn }, () => {
      if (this.state.isMuteOn) this.props.player.mute();
      else this.props.player.unMute();
    });
  };


  onPlayPause = async () => {
    const { player } = this.props;
    if (this.props.currSongId) {
      await this.props.toggleIsPlaying();
      if (this.props.isPlaying) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }
  }

  onNextSong = () => {
    if (this.state.isRepeatOn) {
      console.log('repeat on');
      this.props.player.stopVideo();
      this.props.player.playVideo();
    }
    else if (this.state.isShuffleOn) {
      this.props.setRandomSong();
      console.log('shuffle on');
    }
    else {
      if (this.props.currSongIdx === this.props.currSongList.length - 1) return;
      this.props.changeSong(1);
    }
  }

  onPrevSong = () => {
    if (this.state.isRepeatOn) {
      console.log('repeat on');
      this.props.player.stopVideo();
      this.props.player.playVideo();
    }
    else if (this.state.isShuffleOn) {
      this.props.setRandomSong();
      console.log('shuffle on');
    }
    else {
      if (this.props.currSongIdx === 0) return;
      this.props.changeSong(-1);
    }
  }

  onToggleShuffle = () => {
    if (!this.props.currSongId) return;
    this.setState({ isShuffleOn: !this.state.isShuffleOn }, () => {
      if (this.state.isRepeatOn && this.state.isShuffleOn) this.setState({ isRepeatOn: false }); //turn off repeat if its on
      if (this.state.isShuffleOn) { // if shuffle working
        this.props.setShuffleState(this.props.currSongId);
      }
      else this.props.resetAlreadyPlayed() // if shuffle not working

    })
  }

  onToggleRepeat = () => {
    if (!this.props.currSongId) return;
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
      playerVars: { 'autoplay': 1 }
    };
    const { volume, isShuffleOn, isRepeatOn, isMuteOn } = this.state;
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
          isShuffleOn={isShuffleOn}
          isRepeatOn={isRepeatOn}
          onPlayPause={this.onPlayPause}
          // onPause={this.onPlayPause}
          onNextSong={this.onNextSong}
          onPrevSong={this.onPrevSong}
          onToggleShuffle={this.onToggleShuffle}
          onToggleRepeat={this.onToggleRepeat}
        />
        <VolumeController
          onSetVolume={this.onSetVolume}
          onSetMute={this.onSetMute}
          volume={volume}
          isMuteOn={isMuteOn}
        />
      </section>
    );
  }
}

function mapStateToProps({ mediaModule }) {
  return {
    player: mediaModule.player,
    currStation: mediaModule.currStation,
    currSongList: mediaModule.currSongList,
    currSongIdx: mediaModule.currSongIdx,
    currSongId: mediaModule.currSongId,
    isPlaying: mediaModule.isPlaying
  }
}

const mapDispatchToProps = {
  setPlayer,
  changeSong,
  setRandomSong,
  resetAlreadyPlayed,
  toggleIsPlaying,
  setShuffleState
}

export const AudioPlayer = connect(mapStateToProps, mapDispatchToProps)(_AudioPlayer)
