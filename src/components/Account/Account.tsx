import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { Currency } from '../../сonstants';
import { AccountDto } from '../../model';

import './Account.css';

type AccountProps = {
  account: AccountDto;
  onEditAccount(account: AccountDto): void;
  onRemoveAccount(account: AccountDto): void;
};

const Account: React.FC<AccountProps> = ({
  account,
  onEditAccount,
  onRemoveAccount,
}) => (
  <li
    className="account"
    key={account.id}
    style={{ backgroundColor: account.color }}
  >
    <div className="account-container">
      <h3 className="header-account-title">{account.name}</h3>
      <FontAwesomeIcon
        icon={faPenSquare}
        onClick={() => onEditAccount(account)}
        className="account-btn--edit"
      />
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => onRemoveAccount(account)}
        className="account-btn--delete"
      />
    </div>
    <span className="account-currency-symbol">
      {account.value}&nbsp;{Currency[account.currency].symbol}
    </span>
  </li>
);

export default Account;
