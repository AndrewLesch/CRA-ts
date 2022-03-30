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
    label: 'currency-select.byn',
    symbol: 'p',
  },
  [CurrencyType.Usd]: {
    value: CurrencyType.Usd,
    label: 'currency-select.usd',
    symbol: '$',
  },
  [CurrencyType.Rub]: {
    value: CurrencyType.Rub,
    label: 'currency-select.rub',
    symbol: '₽',
  },
  [CurrencyType.Zl]: {
    value: CurrencyType.Zl,
    label: 'currency-select.zl',
    symbol: 'zł',
  },
};

export const recordTypes: {
  [T in RecordType]: RecordItem;
} = {
  [RecordType.Income]: {
    icon: incomeIcon,
    value: RecordType.Income,
    label: 'type.income',
  },
  [RecordType.Expense]: {
    icon: expenseIcon,
    value: RecordType.Expense,
    label: 'type.expense',
  },
};

export const incomeCategories: {
  [T in IncomeCategory]: IncomeCategoryItem;
} = {
  [IncomeCategory.Salary]: {
    value: IncomeCategory.Salary,
    label: 'incomeCategory.salary',
  },
  [IncomeCategory.SellingThings]: {
    value: IncomeCategory.SellingThings,
    label: 'incomeCategory.sellingThings',
  },
  [IncomeCategory.ReturnOfDebts]: {
    value: IncomeCategory.ReturnOfDebts,
    label: 'incomeCategory.returnOfDebts',
  },
  [IncomeCategory.Gifts]: {
    value: IncomeCategory.Gifts,
    label: 'incomeCategory.gifts',
  },
};

export const expenseCategories: {
  [T in ExpenseCategory]: ExpenseCategoryItem;
} = {
  [ExpenseCategory.Clothes]: {
    value: ExpenseCategory.Clothes,
    label: 'expenseCategory.clothes',
  },
  [ExpenseCategory.Gifts]: {
    value: ExpenseCategory.Gifts,
    label: 'expenseCategory.gifts',
  },
  [ExpenseCategory.Services]: {
    value: ExpenseCategory.Services,
    label: 'expenseCategory.services',
  },
  [ExpenseCategory.Food]: {
    value: ExpenseCategory.Food,
    label: 'expenseCategory.food',
  },
  [ExpenseCategory.Car]: {
    value: ExpenseCategory.Car,
    label: 'expenseCategory.car',
  },
  [ExpenseCategory.Travel]: {
    value: ExpenseCategory.Travel,
    label: 'expenseCategory.travel',
  },
};

export const NumberOfRecordsOnPage: Array<number> = [5, 10, 15, 20];
