import { Link } from "react-router-dom";



export function LikedSongsPreview({ user }) {

    const {fullname} = user
    return (
        <section className="like-card">
            <Link to={`/likedSongs/${user._id}`}>
                <div className="info-container flex column">
                    <q><strong>Sounds</strong> - from <span>{fullname}</span></q>
                    <h1>{user.username} liked songs</h1>
                    <p>{user.likedSongs.length} songs</p>
                </div>
                <button className='play-btn' ><i className="fas fa-play-circle"></i></button>
            </Link>
        </section>
    )
}