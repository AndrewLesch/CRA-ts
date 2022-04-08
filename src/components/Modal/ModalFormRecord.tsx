import React, { useEffect } from 'react';
import Modal from 'react-modal';
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
import { translateOptions } from '../../utils';
import { t } from 'i18next';
import { AccountDto, RecordDto } from '../../model';
import { useModalRecordState } from './hooks/useModalRecordState';

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

const ModalFormRecord: React.FC<ModalRecordProps> = ({
  accounts,
  modalIsOpen,
  editedRecord,
  onSubmit,
  setModalIsOpen,
  setEditedRecord,
}) => {
  const {
    record,
    categories,
    currencyOptions,
    accountsFilteredByCurrency,
    categoryValue,
    modalBodyRef,
    setCategories,
    setRecord,
    selectRecordCurrency,
    selectRecordType,
    setRecordSelectValue,
    setRecordInputValue,
    clearForm,
  } = useModalRecordState(accounts);

  useEffect(() => {
    const checkOutsideClick = (event: MouseEvent) => {
      if (modalIsOpen && !modalBodyRef.current?.contains(event.target)) {
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
  }, [editedRecord, setRecord, setCategories]);

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
    changeDocumentTitle('app.title.default');
  };

  return (
    <Modal isOpen={modalIsOpen} ariaHideApp={false} className="modal">
      <div className="modal-records-body" ref={modalBodyRef}>
        <form onSubmit={onSubmitForm}>
          <h2 className="modal-header-title">
            {t('modal.record_title_header')}
          </h2>

          <div className="records-selects-container">
            <NumberInput
              onChange={(val: number) => setRecord({ ...record, value: val })}
              value={record.value}
              placeholder={t('modal.money_placeholder')}
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
            {t('modal.record_button_save')}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalFormRecord;
