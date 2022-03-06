import React from 'react';
import { usePagination, DOTS } from './usePagination';

import './Pagination.css';

type PaginationProps = {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  className: string;
  siblingCount: number;
  onPageChange(pageSize: number): void;
};

const Pagination = (props: PaginationProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange: Array<string | number> = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = (): void => onPageChange(currentPage + 1);

  const onPrevious = (): void => onPageChange(currentPage - 1);

  const lastPage: string | number = paginationRange[paginationRange.length - 1];
  return (
    <ul className="pagination-item-container">
      <li
        key={1}
        className={`pagination-item ${
          currentPage === 1 ? 'pagination-button--disabled' : ''
        }`}
        onClick={onPrevious}
      >
        <div className="pagination-arrow">&#60;</div>
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item pagination-dots">&#8230;</li>;
        }

        return (
          <li
            key={pageNumber}
            className={`pagination-item ${
              pageNumber === currentPage ? 'pagination-button--selected' : ''
            }`}
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        key={3}
        className={`pagination-item ${
          currentPage === lastPage ? 'pagination-button--disabled' : ''
        }`}
        onClick={onNext}
      >
        <div className="pagination-arrow">&#62;</div>
      </li>
    </ul>
  );
};

export default Pagination;
