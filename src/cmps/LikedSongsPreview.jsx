import { Link } from "react-router-dom";



export function LikedSongsPreview({ user }) {

    return (
        <Link to={`/likedSongs/${user._id}`}>
            <section className="card">
                <h1>{user.username} liked songs</h1>
                <h3>{user.likedSongs.length} songs</h3>
            </section>
        </Link>
    )
}