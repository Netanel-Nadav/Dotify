

export function PlayList({ station }) {


    return (
        <section className="playlist">
            <section className='station-song-info-title flex'>
                <p className='title'>Title</p>
                <section className="wrraper flex space-around">
                    <p className='date-addedAt'>Date Added</p>
                    <p className='duration'><i className="fas fa-clock"></i></p>
                </section>
            </section>
            <hr />
            <section className="songs-container flex column">
                {station.songs.map((song, idx) => {
                    return (
                        <section key={song._id} className='station-song-details flex'>
                            <section className='song-info flex'>
                                <p className="absolute">{idx + 1}</p>
                                <span className="play-icon absolute"><i className="fas fa-play"></i></span>
                                <section className='img-container'>
                                    <img src={song.imgUrl} />
                                </section>
                                <p>{song.title}</p>
                            </section>
                            <section className="wrraper flex space-around">
                                <section className='song-addedAt'>
                                    <p>some date</p>
                                </section>
                                <section className='song-duration btns flex'>
                                    <p>{song.duration}</p>
                                    <button className="like-btn">Like</button>
                                    <button className="delete-btn">Delete</button>
                                </section>
                            </section>
                        </section>


                    )
                })}
            </section>
            <hr />
        </section>
    )
}