import { Slider } from '@material-ui/core'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'

export function VolumeController({ onSetMute, onSetVolume, volume, isMuteON }) {
  return (
    <section className="volume-container flex align-center">
      <button onClick={onSetMute}>{isMuteON ? <FiVolumeX /> : <FiVolume2 />}</button>
    </section>
  );
}







{/* <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(ev) => onSetVolume(ev.target.value)}
      /> */}