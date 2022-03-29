import React from 'react';
import {
  CurrencyItem,
  CurrencyType,
  ExpenseCategory,
  ExpenseCategoryItem,
  IncomeCategory,
  IncomeCategoryItem,
  RecordItem,
  RecordType,
} from './model';

import incomeIcon from '../src/assets/income.png';
import expenseIcon from '../src/assets/expense.png';

export const Currency: {
  [T in CurrencyType]: CurrencyItem;
} = {
  [CurrencyType.Byn]: {
    value: CurrencyType.Byn,
    label: 'Белорусский рубль',
    symbol: 'p',
  },
  [CurrencyType.Usd]: {
    value: CurrencyType.Usd,
    label: 'Доллар США',
    symbol: '$',
  },
  [CurrencyType.Rub]: {
    value: CurrencyType.Rub,
    label: 'Русский рубль',
    symbol: '₽',
  },
  [CurrencyType.Zl]: {
    value: CurrencyType.Zl,
    label: 'Злотый',
    symbol: 'zł',
  },
};

export const recordTypes: {
  [T in RecordType]: RecordItem;
} = {
  [RecordType.Income]: {
    icon: (
      <img src={incomeIcon} className="record-icon-type" alt="Income icon" />
    ),
    value: RecordType.Income,
    label: 'asd',
  },
  [RecordType.Expense]: {
    icon: (
      <img src={expenseIcon} className="record-icon-type" alt="Expense icon" />
    ),
    value: RecordType.Expense,
    label: 'Расходы',
  },
};


export const incomeCategories: {
  [T in IncomeCategory]: IncomeCategoryItem;
} = {
  [IncomeCategory.Salary]: {
    value: IncomeCategory.Salary,
    label: 'Зарплата',
  },
  [IncomeCategory.SellingThings]: {
    value: IncomeCategory.SellingThings,
    label: 'Продажа вещей',
  },
  [IncomeCategory.ReturnOfDebts]: {
    value: IncomeCategory.ReturnOfDebts,
    label: 'Возвращение долгов',
  },
  [IncomeCategory.Gifts]: {
    value: IncomeCategory.Gifts,
    label: 'Подарки',
  },
};

export const expenseCategories: {
  [T in ExpenseCategory]: ExpenseCategoryItem;
} = {
  [ExpenseCategory.Clothes]: {
    value: ExpenseCategory.Clothes,
    label: 'Одежда',
  },
  [ExpenseCategory.Gifts]: {
    value: ExpenseCategory.Gifts,
    label: 'Подарки',
  },
  [ExpenseCategory.Services]: {
    value: ExpenseCategory.Services,
    label: 'Услуги',
  },
  [ExpenseCategory.Food]: {
    value: ExpenseCategory.Food,
    label: 'Еда',
  },
  [ExpenseCategory.Car]: {
    value: ExpenseCategory.Car,
    label: 'На машину',
  },
  [ExpenseCategory.Travel]: {
    value: ExpenseCategory.Travel,
    label: 'Путешевствия',
  },
};

export const NumberOfRecordsOnPage: Array<number> = [5, 10, 15, 20];
