import { t } from 'i18next';
import { translateOptions, changeDocumentTitle, Option } from './utils';

jest.mock('i18next');

const tMock = (key: string): string => `${key}`;

beforeAll(() => {
  (t as jest.Mock).mockImplementation(tMock);
});

test('test TranslateOptions function', () => {
  const obj: Option = {
    label: 'currency.byn',
    value: 'byn',
  };

  expect(translateOptions(obj)).toEqual({ ...obj, label: tMock(obj.label) });
});

test('test changeDocumentTitle function', () => {
  changeDocumentTitle('string');
  expect(document.title).toEqual(tMock('string'));
});
