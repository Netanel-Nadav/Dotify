import { connect } from "react-redux";


function _LikedSongsHero({ user }) {

    console.log(user)
    if (!user) return <h1>Loading...</h1>
    const { likedSongs } = user
    const backgroundColor = 'rgb(80, 56, 160)'
    const transperent = 'rgb(0 0 0 / 0%)'
    return (
        <section className="like-hero" style={{ backgroundImage: `linear-gradient(181deg, ${backgroundColor}, ${transperent})` }}>
            <div className="details flex align-center">
                <div className="img-container">
                    <img src='https://res.cloudinary.com/dvxuxsyoe/image/upload/v1643297851/fosgdv7tdjci8x5bfjaz.png' />
                </div>
                <div className="user-details flex column">
                    <small>Playlist</small>
                    <h1>{user?.username}liked songs</h1>
                    <h3>{user?.likedSongs.length}Songs</h3>
                </div>
            </div>
        </section>
    )
}

function mapStateToProps({ userModule }) {
    return {
        user: userModule.user
    };
}

const mapDispatchToProps = {
};

export const LikedSongsHero = connect(mapStateToProps, mapDispatchToProps)(_LikedSongsHero);