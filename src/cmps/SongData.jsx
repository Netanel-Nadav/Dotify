import React from "react";

export function SongData({ song }) {
  if (!song) return <div className="space"></div>
  const { imgUrl, title } = song;
  return (
    <section className="song-data-container flex align-center justify-center">
      <div className="img-container">
        <img src={imgUrl || song.bestThumbnail.url} />
      </div>
      <h1>{title}</h1>
    </section>
  );
}
