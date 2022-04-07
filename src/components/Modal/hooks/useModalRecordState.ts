import React, { useState, useRef } from 'react';
import { Currency, accountColors, incomeCategories } from '../../../сonstants';
import { v4 as uuidv4 } from 'uuid';
import {
  AccountDto,
  CurrencyItem,
  IncomeCategoryItem,
  ExpenseCategoryItem,
} from '../../../model';

type UseModalRecordtHookType = {
  categories: Array<ExpenseCategoryItem> | Array<IncomeCategoryItem>;
  setCategories(
    categories: Array<ExpenseCategoryItem> | Array<IncomeCategoryItem>
  ): void;
};

export const useModalRecordState = (): UseModalRecordtHookType => {
  const [categories, setCategories] = useState<
    Array<ExpenseCategoryItem> | Array<IncomeCategoryItem>
  >(Object.values(incomeCategories));

  return {
    categories,
    setCategories,
  };
};
