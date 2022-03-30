import { t } from 'i18next';
import {
  CurrencyItem,
  ExpenseCategoryItem,
  IncomeCategoryItem,
} from '../model';

export const translateOptions = ({
  ...object
}:
  | CurrencyItem
  | { value: string; label: string }
  | ExpenseCategoryItem
  | IncomeCategoryItem) => ({
  ...object,
  label: t(object.label),
  value: object.value,
});
