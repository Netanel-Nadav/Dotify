import React from "react"
import YouTube from "react-youtube"
import { connect } from "react-redux"
import { AudioControllers } from "./AudioControllers"
import { VolumeController } from "./VolumeController"
import { TimeBar } from "./TimeBar.jsx"
import { SongData } from "./SongData"

import { changeSong, setRandomSong, resetAlreadyPlayed, toggleIsPlaying, setShuffleState, setSongs } from '../store/media.action';
import { eventBusService } from "../services/event-bus.service"
import { socketService } from "../services/socket.service"

class _AudioPlayer extends React.Component {
  state = {
    player: null,
    currDuration: 0,
    isShuffleOn: false,
    isRepeatOn: false,
    isMuteOn: false,
    volume: 50,
    currTime: 0
  };

  unsubscribe;
  timerInterval;

  componentDidMount() {
    this.unsubscribe = eventBusService.on('playPauseVideo', async () => {
      if (this.props.isPlaying && this.props.prevSongId !== this.props.currSongId) {
        await this.props.toggleIsPlaying();
      }
      this.onPlayPause();
    })
    // this.unsubscribe = eventBusService.on('toggle shared play',  async () => {
    //   this.onSharedPlayPause();
    // })
  }

  componentWillUnmount() {
    this.unsubscribe();
    clearInterval(this.timerInterval)
  }

  onReady = (event) => {
    const player = event.target;
    this.setState({ player });
  }

  onSetVolume = (volume) => {
    this.setState((prevState) => ({ ...prevState, volume }), () => {
      if (this.state.player) this.state.player.setVolume(volume);
    })
  };

  onSetMute = () => {
    this.setState({ isMuteOn: !this.state.isMuteOn }, () => {
      // console.log('isMute', this.state.isMuteOn)
      if (this.state.isMuteOn && this.state.player) { //muted
        this.state.player.mute();
      } else if (this.state.player) this.state.player.unMute();
    });
  };

  

  onPlayPause = async () => {
    const { player } = this.state;
    if (player && this.props.currSongId) {
      console.log('on play',this.props.currSongId)
      // socketService.emit('toggle play', this.props.currStation._id, this.props.currSongId)
      await this.props.toggleIsPlaying();
      if (this.props.isPlaying) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }
  }

  // onSharedPlayPause = async () => {
  //   const { player } = this.state;
  //   console.log('on share play',this.props.currSongId)
  //   await this.props.setSongs(this.props.currStation, this.props.currSongId)
  //   await this.props.toggleIsPlaying();
  //   if (this.props.isPlaying) {
  //     player.playVideo();
  //   } else {
  //     player.pauseVideo();
  //   }
  // }

  onNextSong = () => {
    if (this.state.isRepeatOn) {
      // console.log('repeat on');
      this.state.player.stopVideo();
      this.state.player.playVideo();
    }
    else if (this.state.isShuffleOn) {
      this.props.setRandomSong();
      // console.log('shuffle on');
    }
    else {
      if (this.props.currSongIdx === this.props.currSongList.length - 1) return;
      this.props.changeSong(1);
    }
  }

  onPrevSong = () => {
    if (this.state.isRepeatOn) {
      // console.log('repeat on');
      this.state.player.stopVideo();
      this.state.player.playVideo();
    }
    else if (this.state.isShuffleOn) {
      this.props.setRandomSong();
      // console.log('shuffle on');
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

  // onSetDuration = (ev) => {
  //   const currDuration = ev.target.value;
  //   this.setState({ currDuration });
  //   // console.log('currDuration', currDuration);
  //   this.state.player.seekTo(currDuration);

  onSetDuration = (value) => {
    this.setState({ currDuration: value });
    console.log('value', value);
    this.state.player.seekTo(value);
  }

  onStateChange = (ev) => {
    const { player } = this.state;

    if (ev.data === 3 || ev.data === -1) return;

    if (ev.data === 5) player.playVideo();

    if (ev.data === 2) {
      clearInterval(this.timerInterval)
    }

    if (ev.data === 1) {
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.timerInterval = setInterval(() => {
        const currTime = player.getCurrentTime();
        this.setState({ currTime });
      }, 1000)
    }
  }

  render() {
    const opts = {
      height: "0",
      width: "0",
      playerVars: { 'autoplay': 1 }
    };
    const { player, volume, isShuffleOn, isRepeatOn, isMuteOn, currTime } = this.state;
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
        <div className="player-center flex column ">
          <AudioControllers
            isPlaying={isPlaying}
            isShuffleOn={isShuffleOn}
            isRepeatOn={isRepeatOn}
            onPlayPause={this.onPlayPause}
            onNextSong={this.onNextSong}
            onPrevSong={this.onPrevSong}
            onToggleShuffle={this.onToggleShuffle}
            onToggleRepeat={this.onToggleRepeat}
          />
          <TimeBar song={currSongList[currSongIdx]} player={player} currTime={currTime} setDuration={this.onSetDuration} />
        </div>
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
    isPlaying: mediaModule.isPlaying,
    prevSongId: mediaModule.prevSongId
  }
}

const mapDispatchToProps = {
  changeSong,
  setRandomSong,
  resetAlreadyPlayed,
  toggleIsPlaying,
  setShuffleState,
  setSongs
}

export const AudioPlayer = connect(mapStateToProps, mapDispatchToProps)(_AudioPlayer)
