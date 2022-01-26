import { Slider } from '@material-ui/core'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'

export function VolumeController({ onSetMute, onSetVolume, volume, isMuteOn }) {

  return (
    <section className="volume-container flex align-center">
      <button onClick={onSetMute}>{isMuteOn ? <FiVolumeX /> : <FiVolume2 />}</button>
      <Slider
        value={isMuteOn ? 0 : volume}
        defaultValue={volume || 50}
        min={0}
        max={100}
        onChange={(ev, val) => { onSetVolume(val) }}
      />
    </section>
  );
}