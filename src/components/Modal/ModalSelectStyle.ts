import { StylesConfig } from 'react-select';
import {
  ExpenseCategoryItem,
  IncomeCategoryItem,
  RecordItem,
} from '../../model';
import { CurrencyOptionsType } from './hooks/useModalRecordState';

export const modalSelectsStyle: StylesConfig<
  CurrencyOptionsType | RecordItem | ExpenseCategoryItem | IncomeCategoryItem
> = {
  menu: (provided) => ({
    ...provided,
    margin: '10px',
    minWidth: '300px',
    backgroundColor: 'var(--background-color-secondary)',
    border: '2px solid var(--border-color-input-active)',
    cursor: 'pointer',
  }),
  option: (provided, state) => ({
    ...provided,
    color: 'var(--text-color-primary)',
    backgroundColor: state.isFocused
      ? 'var(--background-color-primary)'
      : 'var(--background-color-secondary)',
    fontSize: 'var(--font-size-default)',
    fontWeight: 'var(--font-weight-default)',
    fontFamily: 'var(--font-family-primary)',
    cursor: 'pointer',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--text-color-primary)',
    fontSize: 'var(--font-size-default)',
    fontWeight: 'var(--font-weight-default)',
    fontFamily: 'var(--font-family-primary)',
    height: '30px',
    marginTop: '7px',
    marginBottom: '7px',
    width: '100%',
    cursor: 'pointer',
  }),
  control: (provided, state) => ({
    ...provided,
    borderRadius: 'var(--border-radius-default)',
    marginTop: '10px',
    cursor: 'pointer',
    border: state.isFocused
      ? '1px solid var(--border-color-input-active)'
      : '1px solid var(--border-color-input)',
    width: '100%',
    '&:hover': {
      borderColor: 'var(--border-color-input-active)',
    },
  }),
};
