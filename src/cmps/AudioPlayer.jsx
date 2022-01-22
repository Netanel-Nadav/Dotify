import React from "react";
import YouTube from "react-youtube";

export class AudioPlayer extends React.Component {
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.playVideo();
    console.log(event);
  }

  onSetMute(event) {
    event.target.mute();
  }

  render() {
    const opts = {
      height: "200",
      width: "200",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 1
      }
    };

    return (
      <section>
        <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={this._onReady} onSetMute={this.onSetMute}/>
      </section>
    );
  }
}
