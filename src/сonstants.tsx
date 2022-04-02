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
    label: 'currency.byn',
    symbol: 'p',
  },
  [CurrencyType.Usd]: {
    value: CurrencyType.Usd,
    label: 'currency.usd',
    symbol: '$',
  },
  [CurrencyType.Rub]: {
    value: CurrencyType.Rub,
    label: 'currency.rub',
    symbol: '₽',
  },
  [CurrencyType.Zl]: {
    value: CurrencyType.Zl,
    label: 'currency.zl',
    symbol: 'zł',
  },
};

export const recordTypes: {
  [T in RecordType]: RecordItem;
} = {
  [RecordType.Income]: {
    iconSource: incomeIcon,
    value: RecordType.Income,
    label: 'type.income',
  },
  [RecordType.Expense]: {
    iconSource: expenseIcon,
    value: RecordType.Expense,
    label: 'type.expense',
  },
};

export const incomeCategories: {
  [T in IncomeCategory]: IncomeCategoryItem;
} = {
  [IncomeCategory.Salary]: {
    value: IncomeCategory.Salary,
    label: 'category.income.salary',
  },
  [IncomeCategory.SellingThings]: {
    value: IncomeCategory.SellingThings,
    label: 'category.income.selling_things',
  },
  [IncomeCategory.ReturnOfDebts]: {
    value: IncomeCategory.ReturnOfDebts,
    label: 'category.income.return_of_debts',
  },
  [IncomeCategory.Gifts]: {
    value: IncomeCategory.Gifts,
    label: 'category.income.gifts',
  },
};

export const expenseCategories: {
  [T in ExpenseCategory]: ExpenseCategoryItem;
} = {
  [ExpenseCategory.Clothes]: {
    value: ExpenseCategory.Clothes,
    label: 'category.expense.clothes',
  },
  [ExpenseCategory.Gifts]: {
    value: ExpenseCategory.Gifts,
    label: 'category.expense.gifts',
  },
  [ExpenseCategory.Services]: {
    value: ExpenseCategory.Services,
    label: 'category.expense.services',
  },
  [ExpenseCategory.Food]: {
    value: ExpenseCategory.Food,
    label: 'category.expense.food',
  },
  [ExpenseCategory.Car]: {
    value: ExpenseCategory.Car,
    label: 'category.expense.car',
  },
  [ExpenseCategory.Travel]: {
    value: ExpenseCategory.Travel,
    label: 'category.expense.travel',
  },
};

export const NumberOfRecordsOnPage: Array<number> = [5, 10, 15, 20];
export const LS_LANGUAGE_KEY = 'language';
