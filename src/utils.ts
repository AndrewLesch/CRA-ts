import { t } from 'i18next';

export const changeDocumentTitle = (title: string): void => {
  document.title = t(`${title}`);
};
