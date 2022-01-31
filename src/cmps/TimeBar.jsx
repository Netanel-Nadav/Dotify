import * as React from 'react'
import { Slider } from '@material-ui/core'

export function TimeBar({ song, player, currTime, setDuration }) {
    let duration = 0;

    function formatDuration(value) {
        const hour = Math.floor(value / 3600);
        const minute = Math.floor(value / 60);
        const secondLeft = Math.floor(value - minute * 60);
        if (hour) return `${hour}:${minute <= 9 ? `0${minute}` : minute}:${secondLeft <= 9 ? `0${secondLeft}` : secondLeft}`
        return `${minute}:${secondLeft <= 9 ? `0${secondLeft}` : secondLeft}`;
    }

    duration = parseFloat(player?.getDuration()) || 0; // seconds

    return (
        <div className="time-bar flex align-center">
            <div className="count">{currTime ? formatDuration(currTime) : "0:00"}</div>
            <Slider
                value={currTime || 0}
                min={0}
                step={1}
                max={duration} //seconds
                onChange={(_, value) => setDuration(value)}
            />
            <div className="count">-{duration ? formatDuration(duration) : "0:00"}</div>
        </div>
    )
}

    