import { NavLink, Link } from "react-router-dom";
import { stationService } from "../services/station.service";
import { connect } from "react-redux";
import { useEffect, useState } from "react";


function _Navigation({ user }) {
    
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
            <p className="title">Creat Playlist</p>
          </NavLink>
        </li>
        <li className="link-container flex align-center">
          {user && <NavLink to={`/likedSongs/${user?._id}`} className="flex align-center">
              <i className="fas fa-heart icon"></i>
            <p className="title">Liked Songs</p>
          </NavLink>}
        </li>
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
