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
    <div className='pagination' aria-label='pagination'>
        <button
            onClick={() => onPaginate(activePage - 1)}
            className={`pagination__item ${activePage <= 1 ? "isDisabled" : ""}`}
            disabled={activePage <=1}
        >
          &#60;
      </button>
      <div className='pagination'>
         {Array(numOfPages)
        .fill("")
        .map((page, index) => {
          return (
            <div
              key={index + 1}
              onClick={() => onPaginate(index + 1)}
              className={`pagination__item ${
                activePage === index + 1 ? "isActive" : ""
              }`}
            >
              {index + 1}
            </div>
          );
        })}
        </div>
        <button 
            onClick={() => onPaginate(activePage + 1)}
            className={`pagination__item ${
            activePage >= numOfPages ? "isDisabled" : ""}`}
            disabled={activePage >=numOfPages}
        >
        &#62;
        </button>
    </div>
  )
}

export default Pagination