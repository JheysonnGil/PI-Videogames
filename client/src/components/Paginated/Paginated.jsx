import React from "react";
import "./Paginated.css";

export default function Paginated({
  videogamesPerPage,
  allVideogames,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="paginated">
      <ul>
        {pageNumbers?.map((e) => (
          <li className="number" key={e}>
            <button
              className={currentPage === e ? "pageActive" : "pageNormal"}
              onClick={() => paginate(e)}
            >
              {e}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
