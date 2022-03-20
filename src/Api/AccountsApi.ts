import { AccountDto } from '../model';
import { database, auth } from '../firebase';
import { ref, update } from 'firebase/database';

export const AccountsApi = {
  setAccount(formData: AccountDto) {
    update(
      ref(database, `users/${auth.currentUser.uid}/accounts/${formData.id}`),
      {
        id: formData.id,
        currency: formData.currency,
        color: formData.color,
        name: formData.name,
        value: formData.value,
      }
    );
  },

  deleteAccount(formData: AccountDto) {
    update(
      ref(database, `users/${auth.currentUser.uid}/accounts/${formData.id}`),
      {
        id: null,
        currency: null,
        color: null,
        name: null,
        value: null,
      }
    );
  },
};
