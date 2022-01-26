import { GiPauseButton } from 'react-icons/gi'
import { IoRepeat, IoShuffle } from 'react-icons/io5'
import { BsFillPlayFill } from 'react-icons/bs'
import { MdSkipNext } from 'react-icons/md'
import { MdSkipPrevious } from 'react-icons/md'

export function AudioControllers({ isPlaying, isShuffleOn, isRepeatOn, onPlayPause, onNextSong, onPrevSong, onToggleShuffle, onToggleRepeat }) {
    return (
        <section className="audio-controller flex align-center justify-center">
            <button className={`'shuffle-btn' ${isShuffleOn ? 'pushed' : ''}`} onClick={onToggleShuffle}><IoShuffle /></button>
            <button className='prev-btn' onClick={onPrevSong}><MdSkipPrevious /></button>
            <div className='play-container'><button className={`play-btn ${isPlaying ? 'pause' : 'play'}`} onClick={onPlayPause}>{isPlaying ? <GiPauseButton /> : <BsFillPlayFill />}</button></div>
            <button className='next-btn' onClick={onNextSong}><MdSkipNext /></button>
            <button className={`'repeat-btn' ${isRepeatOn ? 'pushed' : ''}`} onClick={onToggleRepeat}>
                <IoRepeat />
                {isRepeatOn && <span>.</span>}
            </button>
        </section>
    )
}