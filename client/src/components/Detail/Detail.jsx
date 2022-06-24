import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { detailPerVg, clearDetail } from "../../actions";
import "./Detail.css";

export default function Detail() {
  const dispatch = useDispatch();
  const vgId = useParams();

  useEffect(() => {
    dispatch(detailPerVg(vgId.id));
    return dispatch(clearDetail());
  }, [dispatch, vgId.id]);

  let videoGame = useSelector((state) => state.detail);
  function matchReg(r) {
    let reg = /<\/?.+?\/?>/g;
    return r.replace(reg, "");
  }

  return (
    <div className="totaldetail">
      <div className="nav">
        {videoGame.length > 0 ? (
          <div className="detailtittle">
            <h1 className="detailh1">{videoGame[0].name}</h1>
            <div className="containerDetail">
              <ul>
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
                  <ul key={index}>
                    <p>{g}</p>
                  </ul>
                ))}
                <br></br>
                <br></br>
                <br></br> <strong className="strtitle">Platforms:</strong>
                <br></br>
                <br></br>
                <br></br>
                {videoGame[0].platforms.map((p, index) => (
                  <ul key={index}>
                    <p>{p}</p>
                  </ul>
                ))}
              </ul>
            </div>
            <br></br>
            <div className="btn_goback">
              <Link className="backlink" to="/home">
                Go back
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="loaddetail">
            <div>
              <h3 className="loadingdetail">Loading...</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
