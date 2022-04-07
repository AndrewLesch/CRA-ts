import React, { useState, useRef } from 'react';
import { Currency, accountColors } from '../../../сonstants';
import { v4 as uuidv4 } from 'uuid';
import { AccountDto, CurrencyItem } from '../../../model';

type UseModalAccountHookType = {
  account: AccountDto;
  modalBodyRef: React.MutableRefObject<any>;
  setAccount(account: AccountDto): void;
  setAccountInputValue(
    name: string
  ): (event: React.ChangeEvent<HTMLInputElement>) => void;
  setAccountCurrency(option: CurrencyItem): void;
  setAccountColor(color: string): void;
};

export const useModalAccountState = (): UseModalAccountHookType => {
  const [account, setAccount] = useState<AccountDto>({
    id: uuidv4(),
    name: '',
    value: 0,
    currency: Currency.byn.value,
    color: accountColors[0],
  });
  const modalBodyRef = useRef(null);

  const setAccountInputValue =
    (name: string) =>
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setAccount({ ...account, [name]: event.target.value });
    };

  const setAccountCurrency = (option: CurrencyItem): void => {
    setAccount({ ...account, currency: option.value });
  };

  const setAccountColor = (color: string): void => {
    setAccount({ ...account, color: color });
  };

  return {
    account,
    modalBodyRef,
    setAccount,
    setAccountInputValue,
    setAccountCurrency,
    setAccountColor,
  };
};
