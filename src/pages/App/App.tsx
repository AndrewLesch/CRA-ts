import React, { useEffect, useState } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Records from '../Records/Records';
import Account from '../../components/Account/Account';
import Statistics from '../Statistics/Statistics';
import Authorization from '../Authorization/Authorization';
import ModalFormRecord from '../../components/Modal/ModalFormRecord';
import ModalFormAccount from '../../components/Modal/ModalFormAccount';
import NotificationService from '../../services/NotificationService';
import Loader from '../../components/Loader/Loader';
import { useAccountsAppState } from './hooks/useAppAccountsState';
import { useRecordsAppState } from './hooks/useAppRecordsState';
import { AccountDto, RecordDto } from '../../model';
import { AppContextType } from '../../model';
import { auth, SignOut } from '../../firebase';
import { User } from 'firebase/auth';
import { RecordsApi } from '../../Api/RecordsApi';
import { changeDocumentTitle } from '../../utils';
import { LS_LANGUAGE_KEY } from '../../сonstants';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export const Context = React.createContext<AppContextType>(null);

const App = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const userLanguage = localStorage.getItem(LS_LANGUAGE_KEY);
    if (userLanguage) {
      i18next.changeLanguage(userLanguage);
    }

    const unsubscribe = auth.onAuthStateChanged((user: User) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const {
    accountsLoading,
    accounts,
    editedAccount,
    isEditingAccount,
    accountModalIsOpen,
    setEditedAccount,
    setAccountModalIsOpen,
    setIsEditingAccount,
    openAccountModal,
    onEditAccount,
    removeAccount,
    onSubmitAccount,
    updateAccounts,
  } = useAccountsAppState(user);

  const {
    recordsLoading,
    records,
    editedRecord,
    isEditingRecord,
    recordModalIsOpen,
    onEditRecord,
    setEditedRecord,
    setRecordModalIsOpen,
    updateRecords,
    openRecordModal,
    removeRecord,
    onSubmitRecord,
  } = useRecordsAppState(user);

  const removeAccountWrapper = (account: AccountDto): void => {
    removeAccount(account);

    const remainingRecords: Array<RecordDto> = records.filter(
      (record) => record.accountId !== account.id
    );

    if (records.length !== remainingRecords.length) {
      updateRecords(remainingRecords);
    }
    RecordsApi.updateRecords(remainingRecords, 'records');
  };

  const removeRecordWrapper = (record: RecordDto): void => {
    removeRecord(record, accounts);
  };

  const onSubmitRecordWrapper = (recordFormData: RecordDto): void => {
    const nextAccounts: Array<AccountDto> = onSubmitRecord(
      recordFormData,
      accounts,
      records
    );

    if (nextAccounts) {
      updateAccounts(nextAccounts);
    }
  };

  const onSubmitAccountWrapper = (accountFormData: AccountDto): void => {
    const isSubmitSuccessful: boolean = onSubmitAccount(accountFormData);

    if (!isSubmitSuccessful) {
      NotificationService.error('Введите уникальный аккаунт');
    }
  };

  const changeAppLanguage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    i18next.changeLanguage(event.target.value);
    changeDocumentTitle('app.title.default');
    localStorage.setItem(LS_LANGUAGE_KEY, event.target.value);
  };

  return loading ? (
    <div className="app-loader-container">
      <Loader />
    </div>
  ) : user ? (
    <Context.Provider
      value={{
        onRemoveRecord: removeRecordWrapper,
        onEditRecord,
      }}
    >
      <div className="container">
        <div className="header-accounts-container">
          <div className="header-autorization-container">
            <h2 className="header-app-logo">Wallet Calculate App</h2>
            <div className="autourization-container__buttons">
              <select
                className="language-select"
                onChange={changeAppLanguage}
                value={i18next.language}
              >
                <option value={'eng'}>{t('app.select.language_eng')}</option>
                <option value={'ru'}>{t('app.select.language_ru')}</option>
              </select>
              <h4 className="header-user-name">
                {user ? user.displayName : ''}
              </h4>
              <button className="quit-button" onClick={SignOut}>
                {t('app.button_quit')}
              </button>
            </div>
          </div>
          <ul className="header-accounts-list">
            {accountsLoading ? (
              <Loader />
            ) : (
              accounts.map((account) => (
                <Account
                  key={account.id}
                  account={account}
                  onEditAccount={onEditAccount}
                  onRemoveAccount={removeAccountWrapper}
                />
              ))
            )}
          </ul>
        </div>

        <div className="nav-container">
          <div className="nav-container__buttons">
            <button className="primary-button" onClick={openAccountModal}>
              {t('app.button_add_account')}
            </button>

            {accountModalIsOpen && (
              <ModalFormAccount
                onSubmit={onSubmitAccountWrapper}
                modalIsOpen={accountModalIsOpen}
                setModalIsOpen={setAccountModalIsOpen}
                accounts={accounts}
                editedAccount={editedAccount}
                setEditedAccount={setEditedAccount}
                setIsEditing={setIsEditingAccount}
                isEditing={isEditingAccount}
              />
            )}

            <button className="primary-button" onClick={openRecordModal}>
              {t('app.button_add_record')}
            </button>
            {recordModalIsOpen &&
              (editedRecord === null || isEditingRecord === true) && (
                <ModalFormRecord
                  onSubmit={onSubmitRecordWrapper}
                  accounts={accounts}
                  modalIsOpen={recordModalIsOpen}
                  setModalIsOpen={setRecordModalIsOpen}
                  editedRecord={editedRecord}
                  setEditedRecord={setEditedRecord}
                />
              )}
          </div>

          <div className="nav-container__links">
            <Link className="nav-link" to="/">
              {t('app.records')}
            </Link>
            <Link className="nav-link" to="/statistics">
              {t('app.statistics')}
            </Link>
          </div>
        </div>
        <hr className="content-line" />

        <Routes>
          <Route
            path="/"
            element={<Records records={records} loading={recordsLoading} />}
          />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Context.Provider>
  ) : (
    <Routes>
      <Route path="/authorization" element={<Authorization />} />
      <Route path="*" element={<Navigate to="/authorization" />} />
    </Routes>
  );
};

export default App;
