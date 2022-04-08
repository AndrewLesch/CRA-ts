import React, { useState, useRef } from 'react';
import {
  Currency,
  incomeCategories,
  expenseCategories,
  recordTypes,
} from '../../../сonstants';
import { v4 as uuidv4 } from 'uuid';
import {
  AccountDto,
  IncomeCategoryItem,
  ExpenseCategoryItem,
  RecordDto,
  CurrencyType,
  CurrencyItem,
  RecordItem,
  RecordType,
} from '../../../model';
import DateTimeService from '../../../services/DateService';

export type CurrencyOptionsType = {
  value: CurrencyType;
  label: string;
};

type CurrenciesType = {
  value: CurrencyType;
  label: CurrencyType;
};

type UseModalRecordtHookType = {
  record: RecordDto;
  categories: Array<ExpenseCategoryItem> | Array<IncomeCategoryItem>;
  currencyOptions: Array<CurrencyOptionsType>;
  accountsFilteredByCurrency: Array<{
    value: string;
    label: string;
  }>;
  modalBodyRef: React.MutableRefObject<any>;
  categoryValue: IncomeCategoryItem | ExpenseCategoryItem;
  setRecord(record: RecordDto): void;
  setCategories(
    categories: Array<ExpenseCategoryItem> | Array<IncomeCategoryItem>
  ): void;
  selectRecordCurrency(option: Omit<CurrencyItem, symbol>): void;
  selectRecordType(option: RecordItem): void;
  setRecordInputValue(
    name: string
  ): (event: React.ChangeEvent<HTMLInputElement>) => void;
  setRecordSelectValue(
    name: string
  ): (option: ExpenseCategoryItem | IncomeCategoryItem) => void;
  clearForm(): void;
};

export const useModalRecordState = (
  accounts: Array<AccountDto>
): UseModalRecordtHookType => {
  const [categories, setCategories] = useState<
    Array<ExpenseCategoryItem> | Array<IncomeCategoryItem>
  >(Object.values(incomeCategories));

  const existingAccountsCurrencies: Array<CurrenciesType> = Array.from(
    new Set(accounts.map((acc) => acc.currency))
  ).map((currency) => ({ value: currency, label: currency }));

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

  const modalBodyRef = useRef(null);

  const currencyOptions: Array<CurrencyOptionsType> =
    existingAccountsCurrencies.map((curr: CurrenciesType) => ({
      value: curr.value,
      label: Currency[curr.value].label,
    }));

  const accountsFilteredByCurrency: Array<{
    value: string;
    label: string;
  }> = accounts
    .filter(({ currency }) => currency === record.currency)
    .map(({ name, id }) => ({ value: id, label: name }));
  const categoryValue: IncomeCategoryItem | ExpenseCategoryItem = Object.values(
    record.type === recordTypes.income.value
      ? incomeCategories
      : expenseCategories
  ).find((category) => category.value === record.category);

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

  return {
    record,
    categories,
    currencyOptions,
    accountsFilteredByCurrency,
    categoryValue,
    modalBodyRef,
    clearForm,
    selectRecordCurrency,
    setCategories,
    setRecord,
    selectRecordType,
    setRecordInputValue,
    setRecordSelectValue,
  };
};
