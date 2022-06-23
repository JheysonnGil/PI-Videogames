import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { detailPerVg } from "../../actions";
import "./Detail.css";

export default function Detail() {
  const dispatch = useDispatch();
  const vgId = useParams();

  useEffect(() => {
    dispatch(detailPerVg(vgId.id));
  }, [dispatch, vgId.id]);

  const videoGame = useSelector((state) => state.detail);
  function matchReg(r) {
    let reg = /<\/?.+?\/?>/g;
    return r.replace(reg, "");
  }

  // function goBack(e) {
  //   e.preventDefault();
  //   console.log("laskdjflkajsdklfj");
  //   videoGame = [];
  // }

  return (
    <div className="nav">
      <div>
        {videoGame.length > 0 ? (
          <div>
            <h1>{videoGame[0].name}</h1>
            <div className="containerDetail">
              <ul className="tmnimg">
                <img
                  className="imgDetail"
                  src={videoGame[0].background_image}
                  alt="Videogame"
                />
              </ul>
              <ul>
                <span>
                  <strong className="strtitle">Description:</strong>{" "}
                </span>
                <br></br>
                <br></br>
                <p> {matchReg(videoGame[0].description)}</p>
                <br></br>
              </ul>
              <ul>
                <span>
                  {" "}
                  <strong className="strtitle">Released: </strong>{" "}
                </span>
                <br></br>
                <br></br>
                <p> {videoGame[0].released}</p>
                <br></br>
              </ul>
              <ul>
                <span>
                  {" "}
                  <strong className="strtitle">Rating:</strong>{" "}
                </span>
                <br></br>
                <br></br>
                <p> {videoGame[0].rating}</p>
                <br></br>
              </ul>
              <br />
              <ul>
                {" "}
                <strong className="strtitle">Genres:</strong>
                <br></br>
                <br></br>
                <br></br>
                {videoGame[0].genres.map((g, index) => (
                  <ul key={index}>{g}</ul>
                ))}
                <br></br>
                <br></br>
                <br></br> <strong className="strtitle">Platforms:</strong>
                <br></br>
                <br></br>
                <br></br>
                {videoGame[0].platforms.map((p, index) => (
                  <ul key={index}>{p}</ul>
                ))}
              </ul>
            </div>
            <br></br>
            <div className="btn_goback">
              <Link
                to="/home"
                // onClick={(e) => {
                //   goBack(e);
                // }}
              >
                <button>Go back</button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="ldng">
            <h3>Loading...</h3>
          </div>
        )}
      </div>
    </div>
  );
}
