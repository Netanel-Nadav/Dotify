

export function AudioControllers ({isPlaying, onPlay, onPause, onNextSong, onPrevSong, onToggleShuffle}) {

    return (
        <section className="audio-controller flex align-center justify-center">
            <button className='shuffle-btn' onClick={onToggleShuffle}><i className="fas fa-random"></i></button>
            <button className='prev-btn' onClick={onPrevSong}><i className="fas fa-backward"></i></button>
            <button className={`play-btn ${isPlaying ? 'playing' : ''}`} onClick={isPlaying ? onPause : onPlay}><i className="fas fa-play"></i></button>
            <button className='next-btn' onClick={onNextSong}><i className="fas fa-forward"></i></button>
            <button className='repeat-btn'><i className="fas fa-redo"></i></button>
        </section>
    )
}