import { t } from 'i18next';

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
