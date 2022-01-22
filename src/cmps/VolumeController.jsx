export function VolumeController({ onSetMute, onSetVolume, volume }) {
  return (
    <section className="volume-container flex align-center">
      <button onClick={onSetMute}>
        {" "}
        <i className="fas fa-volume-up"></i>
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(ev) => onSetVolume(ev.target.value)}
      />
    </section>
  );
}
