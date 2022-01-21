

export function PlayList({ station }) {


    return (
        <section className="playlist">
            <section className='station-song-info-title flex'>
                <section className='title'>Title</section>
                <section className='date-addedAt'>Date Added</section>
                <section className='duration'>Duration</section>
            </section>
            <hr />
            <section className="songs-container flex column">
                {station.songs.map((song, idx) => {
                    return (
                        <section key={song._id} className='station-song-details flex'>
                            <section className='song-info flex'>
                                <span>{idx + 1}</span>
                                <section className='img-container'>
                                    <img src={song.imgUrl} />
                                </section>
                                <span>{song.title}</span>
                            </section>
                            <section className='song-addedAt'>
                                <span>some date</span>
                            </section>
                            <section className='song-duration'>
                                <span>{song.duration}</span>
                            </section>
                        </section>

                    )
                })}
            </section>
        </section>
    )
}