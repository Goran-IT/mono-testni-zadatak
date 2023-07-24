import React from 'react'

type PaginationProps = {
    onPaginate: (page: number) => void;
    activePage: number;
    numOfPages: number;
  };
  
const Pagination = ({
    onPaginate,
    activePage,
    numOfPages,
  }: PaginationProps) => {
  return (
    <nav aria-label='pagination'>
        <button
            onClick={() => onPaginate(activePage - 1)}
            className={`pagination-item ${activePage <= 1 ? "isDisabled" : ""}`}
            disabled={activePage <=1}
        >
          Previous 
      </button>
         {Array(numOfPages)
        .fill("")
        .map((page, index) => {
          return (
            <span
              key={index + 1}
              onClick={() => onPaginate(index + 1)}
              className={`pagination-item ${
                activePage === index + 1 ? "isActive" : ""
              }`}
            >
              {index + 1}
            </span>
          );
        })}
        <button 
            onClick={() => onPaginate(activePage + 1)}
            className={`pagination-item ${
            activePage >= numOfPages ? "isDisabled" : ""}`}
            disabled={activePage >=numOfPages}
        >
        Next
        </button>
    </nav>
  )
}

export default Pagination