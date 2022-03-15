import { useEffect, useState } from 'react';
import { SaveDataToFireBase } from '../../../firebase';
import { AccountDto, RecordDto } from '../../../model.js';
import { changeDocumentTitle } from '../../../utils';
import { recordTypes } from '../../../сonstants';
import { database } from '../../../firebase';
import {
  ref,
  onValue,
  DataSnapshot,
  DatabaseReference,
} from 'firebase/database';
import { User } from 'firebase/auth';

type UseRecordsAppStateHookType = {
  records: Array<RecordDto>;
  editedRecord: RecordDto;
  recordModalIsOpen: boolean;
  isEditingRecord: boolean;
  setEditedRecord(editedRecord: RecordDto): void;
  setRecordModalIsOpen(recordModalIsOpen: boolean): void;
  setIsEditingRecord(isEditingAccount: boolean): void;
  updateRecords(records: Array<RecordDto>): void;
  openRecordModal(): void;
  onEditRecord(record: RecordDto): void;
  removeRecord(record: RecordDto, accounts: Array<AccountDto>): void;
  onSubmitRecord(
    recordFormData: RecordDto,
    accounts: Array<AccountDto>,
    records: Array<RecordDto>
  ): Array<AccountDto>;
};

export const useRecordsAppState = (user: User): UseRecordsAppStateHookType => {
  const [records, setRecords] = useState<Array<RecordDto>>([]);
  const [editedRecord, setEditedRecord] = useState<RecordDto>(null);
  const [recordModalIsOpen, setRecordModalIsOpen] = useState<boolean>(false);
  const [isEditingRecord, setIsEditingRecord] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const path: DatabaseReference = ref(
        database,
        `users/${user.uid}/records`
      );
      onValue(path, (snapshot: DataSnapshot): void => {
        const recordsFromFirebase: Array<RecordDto> = snapshot.val();
        if (recordsFromFirebase) {
          setRecords(recordsFromFirebase);
        }
      });
    } else {
      setRecords([]);
    }
  }, [user]);

  const updateRecords = (records: Array<RecordDto>): void => {
    setRecords(records);
    SaveDataToFireBase(records, 'records');
  };

  const onEditRecord = (record: RecordDto): void => {
    setEditedRecord(record);
    setIsEditingRecord(true);
    setRecordModalIsOpen(true);
    changeDocumentTitle('Money tracker - Работа с записью');
  };

  const openRecordModal = (): void => {
    setRecordModalIsOpen(!recordModalIsOpen);
    changeDocumentTitle('Money tracker - Работа с записью');
  };

  const removeRecord = (
    record: RecordDto,
    accounts: Array<AccountDto>
  ): void => {
    const currentAccIndex: number = accounts.findIndex(
      ({ id }) => id === record.accountId
    );
    const deleteRecordIndex: number = records.findIndex(
      ({ id }) => id === record.id
    );

    if (record.type === recordTypes.income.value) {
      accounts[currentAccIndex].value =
        +accounts[currentAccIndex].value - +record.value;
    } else {
      accounts[currentAccIndex].value =
        +accounts[currentAccIndex].value + +record.value;
    }

    const currentRecords: Array<RecordDto> = [...records];
    currentRecords.splice(deleteRecordIndex, 1);
    updateRecords(currentRecords);
    setIsEditingRecord(false);
  };

  const onSubmitRecord = (
    recordFormData: RecordDto,
    accounts: Array<AccountDto>,
    records: Array<RecordDto>
  ): Array<AccountDto> => {
    if (isEditingRecord) {
      const nextRecords: Array<RecordDto> = [...records];
      const recordIndex: number = records.findIndex(
        ({ id }) => id === recordFormData.id
      );

      if (recordIndex >= 0) {
        const currentRecord: RecordDto = records[recordIndex];
        const currentRecordAccIndex: number = accounts.findIndex(
          ({ id }) => id === currentRecord.accountId
        );
        const nextRecordAccIndex: number = accounts.findIndex(
          ({ id }) => id === recordFormData.accountId
        );
        const nextAccounts: Array<AccountDto> = [...accounts];

        if (currentRecordAccIndex === nextRecordAccIndex) {
          if (currentRecord.type === recordFormData.type) {
            if (currentRecord.type === recordTypes.income.value) {
              nextAccounts[currentRecordAccIndex].value =
                +nextAccounts[currentRecordAccIndex].value +
                +(recordFormData.value - currentRecord.value);
            } else {
              nextAccounts[currentRecordAccIndex].value =
                +nextAccounts[currentRecordAccIndex].value -
                +(recordFormData.value - currentRecord.value);
            }
          } else {
            if (currentRecord.type === recordTypes.income.value) {
              nextAccounts[currentRecordAccIndex].value =
                +nextAccounts[currentRecordAccIndex].value -
                +recordFormData.value;
            } else {
              nextAccounts[currentRecordAccIndex].value =
                +nextAccounts[currentRecordAccIndex].value +
                +recordFormData.value;
            }
          }

          nextRecords[recordIndex] = recordFormData;
          updateRecords(nextRecords);
          setIsEditingRecord(false);
          return nextAccounts;
        } else {
          if (currentRecordAccIndex >= 0) {
            if (currentRecord.type === recordTypes.income.value) {
              nextAccounts[currentRecordAccIndex].value =
                +nextAccounts[currentRecordAccIndex].value -
                +currentRecord.value;
            } else {
              nextAccounts[currentRecordAccIndex].value =
                +nextAccounts[currentRecordAccIndex].value +
                +currentRecord.value;
            }
          }

          if (nextRecordAccIndex >= 0) {
            if (recordFormData.type === recordTypes.income.value) {
              nextAccounts[nextRecordAccIndex].value =
                +nextAccounts[nextRecordAccIndex].value + +recordFormData.value;
            } else {
              nextAccounts[nextRecordAccIndex].value =
                +nextAccounts[nextRecordAccIndex].value - +recordFormData.value;
            }
          }

          return nextAccounts;
        }
      }

      nextRecords[recordIndex] = recordFormData;
      updateRecords(nextRecords);
      setIsEditingRecord(false);
    } else {
      const accountIndex: number = accounts.findIndex(
        (acc) => acc.id === recordFormData.accountId
      );
      const nextAccounts: Array<AccountDto> = [...accounts];

      if (recordFormData.type === recordTypes.expense.value) {
        nextAccounts[accountIndex].value =
          +nextAccounts[accountIndex].value - +recordFormData.value;
      } else {
        nextAccounts[accountIndex].value =
          +nextAccounts[accountIndex].value + +recordFormData.value;
      }
      const nextRecords: Array<RecordDto> = [...records, recordFormData];
      updateRecords(nextRecords);
      setIsEditingRecord(false);
      return nextAccounts;
    }

    return null;
  };

  records.sort((firstRecord, secondRecord) => {
    if (new Date(secondRecord.date) > new Date(firstRecord.date)) return 1;
    if (new Date(secondRecord.date) < new Date(firstRecord.date)) return -1;

    if (secondRecord.creatingTime > firstRecord.creatingTime) return 1;
    if (secondRecord.creatingTime < firstRecord.creatingTime) return -1;
    return 1 | -1;
  });

  return {
    records,
    editedRecord,
    onEditRecord,
    setEditedRecord,
    recordModalIsOpen,
    setRecordModalIsOpen,
    isEditingRecord,
    setIsEditingRecord,
    updateRecords,
    openRecordModal,
    removeRecord,
    onSubmitRecord,
  };
};
