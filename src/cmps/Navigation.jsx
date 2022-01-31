import { NavLink, Link } from "react-router-dom";
import { stationService } from "../services/station.service";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

import {setLoginMsg} from "../store/user.action"


function _Navigation({ user, stations, setLoginMsg}) {

  const [userStations, setUserStations] = useState(null)

  useEffect(() => {
    if (user) {
      const reqStations = stations.filter(station => station.createdBy._id === user._id).sort((a, b) => b.createdAt - a.createdAt)
      setUserStations(reqStations)
    }
  }, [stations])

  return (
    <nav className="nav-container flex column">

      <Link to="/">
        <div className="logo-container">
          Dotify<span>.</span>
        </div>
      </Link>


      <ul className="clean-list flex">
        <li className="link-container flex align-center">
          <NavLink exact to="/" className="flex align-center">
            <i className="fas fa-home icon"></i>
            <p className="title">Home</p>
          </NavLink>

        </li>
        <li className="link-container flex align-center">
          <NavLink to="/search" className="flex align-center">
            <i className="fas fa-search icon"></i>
            <p className="title">Search</p>
          </NavLink>
        </li>
        <li className="link-container flex align-center">
          <NavLink to="/library" className="flex align-center">
            <div className="icon">||\</div>
            <p className="title">Your Library</p>
          </NavLink>
        </li>
        <li className="link-container flex align-center">
          <NavLink to="/newStation" className="flex align-center">
            <i className="fas fa-plus-square icon"></i>
            <p className="title">Create Playlist</p>
          </NavLink>
        </li>
        <li className="link-container flex align-center">
          {user ? <NavLink to={`/likedSongs/${user?._id}`} className="flex align-center">
            <i className="fas fa-heart icon"></i>
            <p className="title">Liked Songs</p>
          </NavLink> :
            <div onClick={setLoginMsg} className="link-container flex align-center">
              <i className="fas fa-heart icon"></i>
              <p className="title">Liked Songs</p>
            </div>}
        </li>
      </ul>
      {user && userStations &&
        <section className="user-created-stations flex column">
          <hr className="nav-hr" />
          {userStations.map(station => {
            return (
              <NavLink exact to={`/station/${station._id}`}><div>
                {station.name}
              </div></NavLink>
            )
          })}
        </section>}
    </nav>

  );
}


function mapStateToProps({ userModule, stationModule }) {
  return {
    user: userModule.user,
    stations: stationModule.stations
  };
}

const mapDispatchToProps = {
  setLoginMsg
};

export const Navigation = connect(mapStateToProps, mapDispatchToProps)(_Navigation);
