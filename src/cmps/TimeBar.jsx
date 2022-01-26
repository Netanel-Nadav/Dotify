import * as React from 'react'
import { Slider } from '@material-ui/core'

export function TimeBar({ song, player, currTime }) {
    let duration = 0;

    function formatDuration(value) {
        const hour = Math.floor(value / 3600);
        const minute = Math.floor(value / 60);
        const secondLeft = Math.floor(value - minute * 60);
        if (hour) return `${hour}:${minute <= 9 ? `0${minute}` : minute}:${secondLeft <= 9 ? `0${secondLeft}` : secondLeft}`
        return `${minute}:${secondLeft <= 9 ? `0${secondLeft}` : secondLeft}`;
    }

    function setDuration(value) {
        player.seekTo(value);

    }

    if (song?.duration) duration = parseFloat(player.getDuration()); // seconds

    return (
        <div className="time-bar flex align-center">
            <div className="count">{formatDuration(currTime)}</div>
            <Slider
                value={currTime}
                min={0}
                step={1}
                max={duration} //seconds
                onChange={(_, value) => setDuration(value)}
            />
            <div className="count">-{formatDuration(duration)}</div>
        </div>
    )
}

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