import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <header>
      <nav className="navbar">
        <div className="bgtitle">
          <div className="htitle">
            <Link className="sublink" to="/">
              <h1 className="homeh1">3XTREME GAM3S</h1>
            </Link>
          </div>
        </div>
        <div className="searchNav">
          <h1 className="find">Find Your Game</h1>
          <SearchBar />
        </div>
        <div className="link_add">
          <Link className="addlink" to="/videogame">
            Add Videogame
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
