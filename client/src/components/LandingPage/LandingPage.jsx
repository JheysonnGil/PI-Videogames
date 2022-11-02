import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="bg">
      <div className="title">
        <h1 className="landingh1">Welcome to 3XTREM GAM3S</h1>
        <br />
        <br />
        <div className="linkpos">
          <Link className="landinglink" to="/home">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            ENTER NOW
          </Link>
        </div>
      </div>
    </div>
  );
}
