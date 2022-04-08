import { t } from 'i18next';
import { AccountDto, RecordDto } from './model';
import { recordTypes } from './сonstants';

export const changeDocumentTitle = (titleKey: string): void => {
  document.title = t(`${titleKey}`);
};

export type Option = {
  label: string;
  value: any;
};

export const translateOptions = <T extends Option>(object: T): T => ({
  ...object,
  label: t(object.label),
});

export const calculateAccountsValueRemove = (
  record: RecordDto,
  accounts: Array<AccountDto>,
  currentAccIndex: number
) => {
  if (record.type === recordTypes.income.value) {
    return (accounts[currentAccIndex].value =
      +accounts[currentAccIndex].value - +record.value);
  } else {
    return (accounts[currentAccIndex].value =
      +accounts[currentAccIndex].value + +record.value);
  }
};
