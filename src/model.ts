export type AccountDto = {
  id: string;
  name: string;
  value: number;
  currency: CurrencyType;
  color: string;
};

export type RecordDto = {
  id: string;
  accountId: string;
  currency: CurrencyType;
  type: RecordType;
  category: ExpenseCategory | IncomeCategory;
  value: number;
  date: string;
  creatingTime: number;
};

export type CurrencyItem = {
  value: CurrencyType;
  label: string;
  symbol: string;
};

export enum CurrencyType {
  Usd = 'usd',
  Byn = 'byn',
  Rub = 'rub',
  Zl = 'zl',
}

export enum RecordType {
  Income = 'income',
  Expense = 'expense',
}

export enum IncomeCategory {
  Salary = 'salary',
  SellingThings = 'sellingThings',
  ReturnOfDebts = 'returnOfDebts',
  Gifts = 'gifts',
}

export enum ExpenseCategory {
  Clothes = 'clothes',
  Gifts = 'gifts',
  Services = 'services',
  Food = 'food',
  Car = 'car',
  Travel = 'travel',
}

export type IncomeCategoryItem = {
  value: IncomeCategory;
  label: string;
};

export type ExpenseCategoryItem = {
  value: ExpenseCategory;
  label: string;
};

export type RecordItem = {
  icon: string;
  value: RecordType;
  label: string;
};

export type AppContextType = {
  onRemoveRecord(record: RecordDto): void;
  onEditRecord(record: RecordDto): void;
};
