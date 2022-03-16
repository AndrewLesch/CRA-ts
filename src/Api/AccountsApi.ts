import { database, auth } from '../firebase';
import { ref, set } from 'firebase/database';
import { AccountDto } from '../model';

export const AccountsApi = {
  createAccounts(formData: Array<AccountDto>, dataPath: string) {
    set(ref(database, `users/${auth.currentUser.uid}/${dataPath}`), {
      ...formData,
    });
  },
};
