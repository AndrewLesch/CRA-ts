import { AccountDto } from '../model';
import { database, auth } from '../firebase';
import { ref, remove, update } from 'firebase/database';

export const AccountsApi = {
  setAccount(formData: AccountDto) {
    update(
      ref(database, `users/${auth.currentUser.uid}/accounts/${formData.id}`),
      {
        ...formData,
      }
    );
  },

  deleteAccount(formData: AccountDto) {
    remove(
      ref(database, `users/${auth.currentUser.uid}/accounts/${formData.id}`)
    );
  },
};
