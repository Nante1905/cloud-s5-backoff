import React, { useState } from "react";
import "../assets/css/template.css";
import "../assets/fontawesome-5/css/all.css";

const TableCrud = (props) => {
  const pageSize = 5; // Nombre d'éléments par page
  const [currentPage, setCurrentPage] = useState(1);

  const data = props.data;
  const columns = props.columns;

  const totalPages = Math.ceil(data.length / pageSize);

  const calculateVisiblePages = () => {
    const visiblePages = [];
    const totalPagesToShow = 5; // Nombre total de pages à montrer

    if (totalPages <= totalPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          visiblePages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          visiblePages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          visiblePages.push(i);
        }
      }
    }

    return visiblePages;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 className="crud-title">{props.title}</h1>
      <a href={props.addRoute}>
        <span className="addButton">Ajouter</span>
      </a>
      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>{props.title}</h3>
            <i className='bx bx-search'></i>
            <i className='bx bx-filter'></i>
          </div>
          <table>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((item, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex}>{item[column]}</td>
                  ))}
                  <td>
                    <a href={`${props.updateRoute}/${item.id}`}>
                      <i className="fas fa-pencil-alt table-update"></i>
                    </a>
                  </td>
                  <td>
                    <a href={`${props.deleteRoute}/${item.id}`}>
                      <i className="fas fa-trash-alt table-delete"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pagination">
        {calculateVisiblePages().map((page, index) => (
          <button
            key={index}
            className={currentPage === page ? "active active-pagination pagination-table" : "pagination-table"}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TableCrud;
