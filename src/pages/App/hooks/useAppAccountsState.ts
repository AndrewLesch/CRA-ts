import { useEffect, useState } from 'react';
import { changeDocumentTitle } from '../../../utils';
import { AccountDto } from '../../../model';
import { database } from '../../../firebase';
import { User } from 'firebase/auth';
import { AccountsApi } from '../../../api/AccountsApi';
import {
  ref,
  onValue,
  DataSnapshot,
  DatabaseReference,
} from 'firebase/database';

type UseAccountsAppStateHookType = {
  loading: boolean;
  accounts: Array<AccountDto>;
  editedAccount: AccountDto;
  accountModalIsOpen: boolean;
  isEditingAccount: boolean;
  openAccountModal(): void;
  onEditAccount(account: AccountDto): void;
  updateAccounts(accounts: Array<AccountDto>): void;
  removeAccount(account: AccountDto): void;
  onSubmitAccount(accountFormData: AccountDto): boolean;
  setAccounts(accounts: Array<AccountDto>): void;
  setIsEditingAccount(isEditingAccount: boolean): void;
  setAccountModalIsOpen(accountModalIsOpen: boolean): void;
  setEditedAccount(editedAccount: AccountDto): void;
};

export const useAccountsAppState = (
  user: User
): UseAccountsAppStateHookType => {
  const [loading, setLoading] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<Array<AccountDto>>([]);
  const [editedAccount, setEditedAccount] = useState<AccountDto>(null);
  const [accountModalIsOpen, setAccountModalIsOpen] = useState<boolean>(false);
  const [isEditingAccount, setIsEditingAccount] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const path: DatabaseReference = ref(
        database,
        `users/${user.uid}/accounts`
      );
      onValue(path, (snapshot: DataSnapshot): void => {
        if (snapshot.val()) {
          const accountsFromFirebase: Array<AccountDto> = Object.values(
            snapshot.val()
          ).map((acc: AccountDto) => acc);

          if (accountsFromFirebase) {
            setAccounts(accountsFromFirebase);
          } else {
            openAccountModal();
          }
        }

        setLoading(false);
      });
    } else {
      setAccounts([]);
    }
  }, [user]);

  const openAccountModal = (): void => {
    setAccountModalIsOpen(true);
    changeDocumentTitle('Money tracker - Работа с аккаунтом');
  };

  const updateAccounts = (accounts: Array<AccountDto>): void => {
    setAccounts(accounts);
  };

  const onEditAccount = (account: AccountDto): void => {
    setAccountModalIsOpen(true);
    setIsEditingAccount(true);
    setEditedAccount(account);
    changeDocumentTitle('Money tracker - Работа с аккаунтом');
  };

  const removeAccount = (account: AccountDto): void => {
    const currentAccIndex: number = accounts.findIndex(
      ({ id }) => id === account.id
    );
    const currentAccounts: Array<AccountDto> = [...accounts];
    currentAccounts.splice(currentAccIndex, 1);
    AccountsApi.deleteAccount(account);
    updateAccounts(currentAccounts);
    if (currentAccounts.length === 0) {
      setAccountModalIsOpen(true);
    }
  };

  const onSubmitAccount = (accountFormData: AccountDto): boolean => {
    if (isEditingAccount) {
      if (
        accounts.some(
          (acc) =>
            acc.name === accountFormData.name &&
            accountFormData.name !== editedAccount.name
        )
      ) {
        return false;
      } else {
        const nextAccounts: Array<AccountDto> = [...accounts];
        const accountIndex: number = accounts.findIndex(
          ({ id }) => id === accountFormData.id
        );
        nextAccounts[accountIndex] = accountFormData;
        AccountsApi.setAccount(accountFormData);
        updateAccounts(nextAccounts);
        setAccountModalIsOpen(false);
        setEditedAccount(null);
        setIsEditingAccount(false);
      }
    } else if (accounts.some((acc) => acc.name === accountFormData.name)) {
      return false;
    } else {
      setIsEditingAccount(false);
      setEditedAccount(null);
      setAccountModalIsOpen(false);
      AccountsApi.setAccount(accountFormData);
      const nextAccounts: Array<AccountDto> = [...accounts, accountFormData];
      updateAccounts(nextAccounts);
    }
    return true;
  };

  return {
    loading,
    accounts,
    editedAccount,
    accountModalIsOpen,
    isEditingAccount,
    setAccounts,
    setEditedAccount,
    setAccountModalIsOpen,
    setIsEditingAccount,
    openAccountModal,
    onEditAccount,
    updateAccounts,
    removeAccount,
    onSubmitAccount,
  };
};
