import * as React from 'react'
import { Slider } from '@material-ui/core'

export function TimeBar({ song, player, currDuration }) {

    const [position, setPosition] = React.useState(0);
    let duration = 0;

    function formatDuration(value) {
        const hour = Math.floor(value / 3600);
        const minute = Math.floor(value / 60);
        const secondLeft = Math.floor(value - minute * 60);
        if (hour) return `${hour}:${minute <= 9 ? `0${minute}` : minute}:${secondLeft <= 9 ? `0${secondLeft}` : secondLeft}`
        return `${minute}:${secondLeft <= 9 ? `0${secondLeft}` : secondLeft}`;
    }

    function setDuration(ev, value) {
        setPosition(value);
        player.seekTo(value);

    }

    if (song?.duration) duration = player.getDuration() // seconds

    return (
        <div className="time-bar flex align-center">
            <div className="count">{formatDuration(position)}</div>
            <Slider
                value={position}
                min={0}
                step={1}
                max={duration} //seconds
                onChange={(ev, value) => setDuration(ev, value)}
            />
            <div className="count">-{formatDuration(duration)}</div>
        </div>
    )
}

// player.seekTo(seconds:Number, allowSeekAhead:Boolean):Void


// let sumOfSec = 100; // default

    // if (duration) {
    //     var i = 0;
    //     const durArr = duration.split(':');
    //     const hours = 0;
    //     if (durArr.length === 3) {
    //         hours = parseInt(durArr[i]);
    //         i++;
    //     }
    //     const minutes = parseInt(durArr[i++]);
    //     const seconds = parseInt(durArr[i]);
    //     sumOfSec = hours * 3600 + minutes * 60 + seconds;
    // }