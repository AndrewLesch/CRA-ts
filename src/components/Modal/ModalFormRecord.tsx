import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';
import {
  Currency,
  recordTypes,
  incomeCategories,
  expenseCategories,
} from '../../сonstants';
import { changeDocumentTitle } from '../../utils';
import DateTimeService from '../../services/DateService';
import { modalSelectsStyle } from './ModalSelectStyle';
import NumberInput from '../NumberInput/NumberInput';
import { translateOptions } from '../../helpers/translateHelper';
import { t } from 'i18next';
import {
  AccountDto,
  CurrencyItem,
  CurrencyType,
  ExpenseCategoryItem,
  IncomeCategoryItem,
  RecordDto,
  RecordItem,
  RecordType,
} from '../../model';

import './Modal.css';
import './ModalFormRecord.css';

type ModalRecordProps = {
  accounts: Array<AccountDto>;
  modalIsOpen: boolean;
  editedRecord: RecordDto;
  setModalIsOpen(modalIsOpen: boolean): void;
  setEditedRecord(record: RecordDto): void;
  onSubmit(record: RecordDto): void;
};

type CurrenciesType = {
  value: CurrencyType;
  label: CurrencyType;
};

export type CurrencyOptionsType = {
  value: CurrencyType;
  label: string;
};

const ModalFormRecord: React.FC<ModalRecordProps> = ({
  onSubmit,
  accounts,
  modalIsOpen,
  setModalIsOpen,
  editedRecord,
  setEditedRecord,
}) => {
  const existingAccountsCurrencies: Array<CurrenciesType> = Array.from(
    new Set(accounts.map((acc) => acc.currency))
  ).map((currency) => ({ value: currency, label: currency }));

  const [categories, setCategories] = useState<
    Array<ExpenseCategoryItem> | Array<IncomeCategoryItem>
  >(Object.values(incomeCategories));
  const [record, setRecord] = useState<RecordDto>({
    id: uuidv4(),
    accountId: accounts[0].id,
    currency: existingAccountsCurrencies[0].value,
    type: recordTypes.income.value,
    category: incomeCategories.salary.value,
    value: 0,
    date: DateTimeService.getFormattedTodayDate(),
    creatingTime: 0,
  });
  const modalBodyref = useRef(null);

  const accountsFilteredByCurrency: Array<{
    value: string;
    label: string;
  }> = accounts
    .filter(({ currency }) => currency === record.currency)
    .map(({ name, id }) => ({ value: id, label: name }));

  useEffect(() => {
    const checkOutsideClick = (event: MouseEvent) => {
      if (modalIsOpen && !modalBodyref.current?.contains(event.target)) {
        closeModal();
        setEditedRecord(null);
      }
    };

    document.addEventListener('mousedown', checkOutsideClick);

    return () => {
      document.removeEventListener('mousedown', checkOutsideClick);
    };
  });

  useEffect(() => {
    if (editedRecord) {
      setRecord(editedRecord);

      if (editedRecord.type === recordTypes.income.value) {
        setCategories(Object.values(incomeCategories));
      } else {
        setCategories(Object.values(expenseCategories));
      }
    }
  }, [editedRecord]);

  const clearForm = (): void => {
    setRecord({
      id: uuidv4(),
      accountId: accountsFilteredByCurrency[0].value,
      currency: existingAccountsCurrencies[0].value,
      type: recordTypes.income.value,
      category: incomeCategories.salary.value,
      value: 0,
      date: DateTimeService.getFormattedTodayDate(),
      creatingTime: 0,
    });
  };

  const setRecordSelectValue =
    (name: string) =>
    (option: ExpenseCategoryItem | IncomeCategoryItem): void => {
      setRecord({ ...record, [name]: option.value });
    };

  const setRecordInputValue =
    (name: string) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setRecord({ ...record, [name]: event.target.value });
    };

  const selectRecordType = (option: RecordItem): void => {
    if (option.value === recordTypes.income.value) {
      setCategories(Object.values(incomeCategories));
      setRecord({
        ...record,
        type: option.value,
        category: incomeCategories.salary.value,
      });
    } else {
      setCategories(Object.values(expenseCategories));
      setRecord({
        ...record,
        type: option.value as RecordType,
        category: expenseCategories.clothes.value,
      });
    }
  };

  const selectRecordCurrency = (option: Omit<CurrencyItem, symbol>): void => {
    const nextAcc = accounts.find(
      (account) => account.currency === option.value
    );

    setRecord({
      ...record,
      currency: option.value,
      accountId: nextAcc.id,
    });
  };

  const onSubmitForm = (event: React.SyntheticEvent): void => {
    event.preventDefault();

    record.creatingTime = Date.now();
    onSubmit(record);
    setEditedRecord(null);
    closeModal();
    clearForm();
  };

  const closeModal = (): void => {
    setModalIsOpen(false);
    changeDocumentTitle('app.default.title');
  };

  const currencyOptions: Array<CurrencyOptionsType> =
    existingAccountsCurrencies.map((curr: CurrenciesType) => ({
      value: curr.value,
      label: Currency[curr.value].label,
    }));

  const categoryValue: IncomeCategoryItem | ExpenseCategoryItem = Object.values(
    record.type === recordTypes.income.value
      ? incomeCategories
      : expenseCategories
  ).find((category) => category.value === record.category);

  return (
    <Modal isOpen={modalIsOpen} ariaHideApp={false} className="modal">
      <div className="modal-records-body" ref={modalBodyref}>
        <form onSubmit={onSubmitForm}>
          <h2 className="modal-header-title">
            {t('modal.record-header-title')}
          </h2>

          <div className="records-selects-container">
            <NumberInput
              onChange={(val: number) => setRecord({ ...record, value: val })}
              value={record.value}
              placeholder={t('money-placeholder')}
              disabled={false}
              required
              min={0.01}
              max={100000}
              step={0.01}
            />
            <Select
              isSearchable={false}
              styles={modalSelectsStyle}
              value={translateOptions({
                value: record.currency,
                label: Currency[record.currency].label,
              })}
              onChange={selectRecordCurrency}
              options={currencyOptions.map(translateOptions)}
            />
            <Select
              isSearchable={false}
              styles={modalSelectsStyle}
              value={translateOptions(
                Object.values(recordTypes).find(
                  (recordType) => recordType.value === record.type
                )
              )}
              onChange={selectRecordType}
              options={Object.values(recordTypes).map(translateOptions)}
            />
            <Select
              isSearchable={false}
              styles={modalSelectsStyle}
              value={translateOptions(categoryValue)}
              onChange={setRecordSelectValue('category')}
              options={categories.map(translateOptions)}
            />
            <Select
              isSearchable={false}
              styles={modalSelectsStyle}
              defaultValue={accountsFilteredByCurrency[0]}
              value={Object.values(accountsFilteredByCurrency).find(
                (account) => account.value === record.accountId
              )}
              onChange={setRecordSelectValue('accountId')}
              options={Object.values(accountsFilteredByCurrency)}
            />
            <input
              type="datetime-local"
              className="records-input--date"
              value={record.date}
              max={DateTimeService.getFormattedTodayDate()}
              required
              onChange={setRecordInputValue('date')}
            />
          </div>

          <button className="modal-button--submit" type="submit">
            {t('modal.record-save-button')}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalFormRecord;
