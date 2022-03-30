import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenSquare } from '@fortawesome/free-solid-svg-icons';

import DateTimeService from '../../services/DateService';
import { Context } from '../App/App';
import { t } from 'i18next';
import {
  Currency,
  incomeCategories,
  expenseCategories,
  recordTypes,
} from '../../сonstants';
import {
  ExpenseCategory,
  IncomeCategory,
  RecordDto,
  AppContextType,
} from '../../model.js';

type RecordProps = {
  record: RecordDto;
};

const Record: React.FC<RecordProps> = ({ record }) => {
  const { onRemoveRecord, onEditRecord } = useContext<AppContextType>(Context);

  return (
    <li
      className={`record ${
        record.type === recordTypes.expense.value
          ? 'record--expense'
          : 'record--income'
      }`}
    >
      <div className="record-container">
        <span className="record-value">
          {+record.value}
          {Currency[record.currency].symbol}
        </span>

        <FontAwesomeIcon
          icon={faPenSquare}
          onClick={() => onEditRecord(record)}
          className="record-btn--edit"
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => onRemoveRecord(record)}
          className="record-btn--delete"
        />
      </div>
      <hr className="record-line" />
      <span className="record-text">
        {
          <img
            src={recordTypes[record.type].icon}
            className="record-icon-type"
            alt={
              record.type === 'income' ? t('type.income') : t('type.expense')
            }
          />
        }
        <p className="record-type-text">
          {t(
            record.type === recordTypes.income.value
              ? incomeCategories[record.category as IncomeCategory].label
              : expenseCategories[record.category as ExpenseCategory].label
          )}
        </p>
      </span>

      <span className="record-text">
        {DateTimeService.formatRecordDate(record.date)}
      </span>
    </li>
  );
};

export default Record;
