import React, { useState, useMemo, useEffect } from 'react';
import Record from './Record';
import Pagination from '../../components/Pagination/Pagination';
import { RecordDto } from '../../model';
import { NumberOfRecordsOnPage } from '../../сonstants';

import './Records.css';
import Loader from '../../components/Loader/Loader';

type RecordsProps = {
  records: Array<RecordDto>;
  loading: boolean;
};

const Records: React.FC<RecordsProps> = ({ records, loading }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(NumberOfRecordsOnPage[0]);

  const displayedRecords: Array<RecordDto> = useMemo<Array<RecordDto>>(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return records.slice(firstPageIndex, lastPageIndex);
  }, [records, pageSize, currentPage]);

  const onPageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setPageSize(+event.target.value);
  };

  useEffect(() => {
    if (displayedRecords.length === 0 && records.length !== 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [displayedRecords, currentPage, setCurrentPage, records.length]);

  return (
    <>
      <div className="pagination-container">
        <div className="pagination-page-size">
          <h3 className="page-size-select-label">Records on page</h3>
          <select
            className="page-size-select"
            value={pageSize}
            onChange={onPageSizeChange}
          >
            {NumberOfRecordsOnPage.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <Pagination
          siblingCount={1}
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={records.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      {loading ? (
        <Loader height="10vh" />
      ) : records.length > 0 ? (
        <ul className="records-list">
          {displayedRecords.map((record: RecordDto) => (
            <Record key={record.id} record={record} />
          ))}
        </ul>
      ) : (
        <div className="image-container" />
      )}
    </>
  );
};

export default Records;
