

export function AudioControllers ({isPlaying, onPlay, onPause, onNextSong, onPrevSong, onToggleShuffle}) {

    return (
        <section>
            <button onClick={onToggleShuffle}>Shuffle</button>
            <button onClick={onPrevSong}>Prev</button>
            <button onClick={isPlaying ? onPause : onPlay}>Play</button>
            <button onClick={onNextSong}>Next</button>
            <button>Repeat</button>
        </section>
    )
}