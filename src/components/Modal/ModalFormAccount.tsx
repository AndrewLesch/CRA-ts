import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { Currency, accountColors } from '../../сonstants';
import Select, { components, OptionProps } from 'react-select';
import { changeDocumentTitle } from '../../utils';
import { modalSelectsStyle } from './ModalSelectStyle';
import ColorPicker from '../ColorPicker/ColorPicker';
import NumberInput from '../NumberInput/NumberInput';
import { AccountDto, CurrencyItem } from '../../model';
import { translateOptions } from '../../utils';
import { t } from 'i18next';

import './ModalFormAccount.css';
import { useModalAccountState } from './hooks/useModalAccountState';

const { Option } = components;

const IconOption = (props: OptionProps<CurrencyItem>) => (
  <Option {...props}>
    <div className="symbol-container">
      {props.data.symbol}
      <p className="symbol-label">{props.data.label}</p>
    </div>
  </Option>
);

type ModalAccountsProps = {
  modalIsOpen: boolean;
  accounts: Array<AccountDto>;
  editedAccount: AccountDto;
  isEditing: boolean;
  setIsEditing(isEditing: boolean): void;
  onSubmit(account: AccountDto): void;
  setEditedAccount(account: AccountDto): void;
  setModalIsOpen(modalIsOpen: boolean): void;
};

const ModalAccounts: React.FC<ModalAccountsProps> = ({
  accounts,
  editedAccount,
  modalIsOpen,
  isEditing,
  onSubmit,
  setModalIsOpen,
  setEditedAccount,
  setIsEditing,
}) => {
  const {
    account,
    modalBodyRef,
    setAccount,
    setAccountInputValue,
    setAccountCurrency,
    setAccountColor,
  } = useModalAccountState();

  useEffect(() => {
    const closeModal = () => setModalIsOpen(false);
    const checkOutsideClick = (event: MouseEvent) => {
      if (
        modalIsOpen &&
        !modalBodyRef.current?.contains(event.target) &&
        accounts.length > 0
      ) {
        closeModal();
        setIsEditing(false);
        setEditedAccount(null);
      }
    };

    document.addEventListener('mousedown', checkOutsideClick);

    return () => {
      changeDocumentTitle('app.title.default');
      document.removeEventListener('mousedown', checkOutsideClick);
    };
  }, [
    accounts,
    modalIsOpen,
    setEditedAccount,
    setIsEditing,
    setModalIsOpen,
    modalBodyRef,
  ]);

  useEffect(() => {
    if (editedAccount) {
      setAccount(editedAccount);
      setIsEditing(true);
    }
  }, [editedAccount, modalIsOpen, setEditedAccount, setIsEditing, setAccount]);

  const onSubmitForm = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    onSubmit(account);
  };

  return (
    <Modal isOpen={modalIsOpen} ariaHideApp={false} className="modal">
      <div className="modal-account-body" ref={modalBodyRef}>
        <form onSubmit={onSubmitForm}>
          <h2 className="modal-header-title">
            {t('modal.account_title_header')}
          </h2>

          <input
            value={account.name}
            className="account-name-input"
            placeholder={t('modal.account_name_placeholder')}
            required
            maxLength={15}
            onChange={setAccountInputValue('name')}
          />

          <div className="accounts-inputs-container">
            <NumberInput
              onChange={(val: number) => setAccount({ ...account, value: val })}
              value={account.value}
              disabled={isEditing}
              placeholder={t('modal.money_placeholder')}
              required={true}
              min={0}
              max={100000}
              step={0.01}
            />

            <Select
              isSearchable={false}
              styles={modalSelectsStyle}
              isDisabled={isEditing}
              value={translateOptions(Currency[account.currency])}
              onChange={setAccountCurrency}
              options={Object.values(Currency).map(translateOptions)}
              components={{ Option: IconOption }}
            />
          </div>

          <ColorPicker
            colors={accountColors}
            currentColor={account.color}
            onChange={setAccountColor}
          />

          <button
            type="submit"
            style={{ backgroundColor: `${account.color}` }}
            className="modal-button--submit"
          >
            {t('modal.account_button_save')}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalAccounts;
