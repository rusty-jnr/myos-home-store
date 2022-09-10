import React, { useState, useEffect } from "react";

const Pagination = ({ current_page, page_size, total, changePage }) => {
  const [pageSize, setPagesize] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);

  useEffect(() => {
    const totalPages = Math.ceil(total / page_size);
    setPagesize(Array.apply(null, { length: Number(totalPages) }));
    setCurrentPage(Number(current_page));
  }, [current_page, page_size, total]);

  function previous() {
    if (currentPage !== 1) {
      changePage(currentPage - 1);
    }
  }

  function next() {
    if (currentPage !== pageSize.length) {
      changePage(currentPage + 1);
    }
  }

  function handlePage(e) {
    if (e !== currentPage) {
      changePage(e);
    }
  }

  return (
    <div className="pagination_container">
      <ul>
        <li onClick={() => previous()}>{`<`}</li>
        {pageSize.map((page, i) => (
          <li
            onClick={() => handlePage(i + 1)}
            className={`${currentPage === i + 1 ? "active" : ""}`}
            key={i}
          >
            {i + 1}
          </li>
        ))}
        <li onClick={() => next()}>{`>`}</li>
      </ul>
    </div>
  );
};

export default Pagination;
