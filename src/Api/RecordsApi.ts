import { database, auth } from '../firebase';
import { ref, set } from 'firebase/database';
import { RecordDto } from '../model';

export const RecordsApi = {
  createRecords(formData: Array<RecordDto>, dataPath: string) {
    set(ref(database, `users/${auth.currentUser.uid}/${dataPath}`), {
      ...formData,
    });
  },
};
