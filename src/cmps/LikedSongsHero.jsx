import { connect } from "react-redux";


function _LikedSongsHero({ user }) {

    console.log(user)
    if(!user) return <h1>Loading...</h1>
    const {likedSongs, backgroundColor, imgUrl} = user
    const transperent = 'rgb(0 0 0 / 0%)'
    return (
        <section className="station-header hero" style={{backgroundImage: `linear-gradient(181deg, ${backgroundColor}, ${transperent})`}}>
            <div className="hero-container flex align-center">
                <div className="user-info">

                    <h1>{user?.username} liked songs</h1>
                    <h3>{user?.likedSongs.length} Songs </h3>
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