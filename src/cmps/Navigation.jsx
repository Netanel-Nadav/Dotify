import { NavLink, Link } from "react-router-dom";
import { stationService } from "../services/station.service";
import { connect } from "react-redux";


function _Navigation({user}) {
  return (
    <nav className="nav-container flex column">
      <Link to="/">
        <div className="logo-container">
          Dotify<span>.</span>
        </div>
      </Link>
      <ul className="clean-list flex">
        <NavLink to="/">
          <li className="link-container flex align-center">
            <div className="icon">
              <i className="fas fa-home"></i>
            </div>
            <div className="title">Home</div>
          </li>
        </NavLink>
        <NavLink to="/search">
          <li className="link-container flex align-center">
            <div className="icon">
              <i className="fas fa-search"></i>
            </div>
            <div className="title">Search</div>
          </li>
        </NavLink>
        <NavLink to="/library">
          <li className="link-container flex align-center">
            <div className="icon">||\</div>
            <div className="title">Your Library</div>
          </li>
        </NavLink>
        <NavLink to="/newStation">
          <li className="link-container flex align-center">
            <div className="icon">
              <i className="fas fa-plus-square"></i>
            </div>
            <div className="title">Creat Playlist</div>
          </li>
        </NavLink>
        <NavLink to={`/likedSongs/${user?._id}`}>
          <li className="link-container flex align-center">
            <div className="icon">
              <i className="fas fa-heart"></i>
            </div>
            <div className="title">Liked Songs</div>
          </li>
        </NavLink>
      </ul>
    </nav>
  );
}


function mapStateToProps({ userModule }) {
  return {
    user: userModule.user
  };
}

const mapDispatchToProps = {
  
};

export const Navigation = connect(mapStateToProps, mapDispatchToProps)(_Navigation);
