import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Records from '../Records/Records';
import Account from '../../components/Account/Account';
import Statistics from '../Statistics/Statistics';
import ModalFormRecord from '../../components/Modal/ModalFormRecord';
import ModalFormAccount from '../../components/Modal/ModalFormAccount';
import NotificationService from '../../services/NotificationService';
import { useAccountsAppState } from './hooks/useAppAccountsState';
import { useRecordsAppState } from './hooks/useAppRecordsState';
import { LS_ACCOUNTS_KEY } from '../../сonstants';
import { AccountDto, RecordDto } from '../../model';
import { AppContextType } from '../../model';
import { auth, SignInWithGoogle, SignOut, database } from '../../firebase';
import { ref, onValue } from 'firebase/database';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export const Context = React.createContext<AppContextType>(null);

const App = () => {
  const {
    accounts,
    editedAccount,
    setEditedAccount,
    accountModalIsOpen,
    setAccountModalIsOpen,
    isEditingAccount,
    setIsEditingAccount,
    openAccountModal,
    onEditAccount,
    removeAccount,
    onSubmitAccount,
    updateAccounts,
  } = useAccountsAppState();

  const {
    records,
    editedRecord,
    onEditRecord,
    setEditedRecord,
    recordModalIsOpen,
    setRecordModalIsOpen,
    isEditingRecord,
    updateRecords,
    openRecordModal,
    removeRecord,
    onSubmitRecord,
  } = useRecordsAppState();

  const [user, setUser] = useState<any>({});
  const [accountsFromFirebase, setAccountsFromFirebase] = useState([]);

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
      setUser(user);
    } else {
      setUser('');
    }
    т;
  });

  if (user) {
    const path = ref(database, `${user.uid}`);
    onValue(path, (accounts) => {
      const data = accounts.val();
      setAccountsFromFirebase(data);
    });
  }

  const removeAccountById = (accountId: string): void => {
    removeAccount(accountId);

    const remainingRecords: Array<RecordDto> = records.filter(
      (record) => record.accountId !== accountId
    );

    if (records.length !== remainingRecords.length) {
      updateRecords(remainingRecords);
    }
  };

  const removeRecordWrapper = (record: RecordDto): void => {
    const nextAccounts: Array<AccountDto> = removeRecord(record, accounts);

    if (nextAccounts) {
      localStorage.setItem(LS_ACCOUNTS_KEY, JSON.stringify(accounts));
    }
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

  return (
    <Context.Provider
      value={{
        onRemoveRecord: removeRecordWrapper,
        onEditRecord,
      }}
    >
      <div className="container">
        <div className="header-accounts-container">
          <div className="header-autorization-container">
            <h2 className="header-app-logo">Wallet App Calc</h2>
            <div className="autourization-container__buttons">
              <h4 className="header-user-name">
                {user ? user.displayName : ''}
              </h4>
              {!user ? (
                <button
                  onClick={SignInWithGoogle}
                  className="autourization-button"
                >
                  Вход
                </button>
              ) : (
                <button className="autourization-button" onClick={SignOut}>
                  Выход
                </button>
              )}
            </div>
          </div>
          <ul className="header-accounts-list">
            {accounts.map((account) => (
              <Account
                key={account.id}
                account={account}
                onEditAccount={onEditAccount}
                onRemoveAccount={removeAccountById}
              />
            ))}
          </ul>
        </div>

        <div className="nav-container">
          <div className="nav-container__buttons">
            <button className="primary-button" onClick={openAccountModal}>
              Добавить аккаунт
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
              Добавить запись
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
              Записи
            </Link>
            <Link className="nav-link" to="/statistics">
              Статистика
            </Link>
          </div>
        </div>
        <hr className="content-line" />

        <Routes>
          <Route path="/" element={<Records records={records} />} />
          <Route path="/statistics" element={<Statistics />} />
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
  );
};

export default App;
