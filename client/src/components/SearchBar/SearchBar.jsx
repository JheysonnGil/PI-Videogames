import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../../actions/index";
import "./SearchBar.css";

function SearchBar({ setPage }) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleInputChange(e) {
    e.preventDefault(e);
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    document.getElementById("putSearch").value = "";
    handleInputChange(e);
    if (name.length !== 0) {
      dispatch(getNameVideogames(name));
    }
    if (name.length === 0) alert("Can not be empty...");
  }

  return (
    <form className="formSearch">
      <input
        id="putSearch"
        className="inputSearch"
        value={name}
        type="text"
        placeholder="Search videogame..."
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className="searchButton"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        {" "}
        Search <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </form>
  );
}

export default SearchBar;
