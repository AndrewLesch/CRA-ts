import { RecordDto } from '../model';
import { database, auth } from '../firebase';
import { ref, remove, set, update } from 'firebase/database';

export const RecordsApi = {
  updateRecords(formData: Array<RecordDto>, dataPath: string) {
    set(ref(database, `users/${auth.currentUser.uid}/${dataPath}`), {
      ...formData,
    });
  },

  setRecord(formData: RecordDto) {
    update(
      ref(database, `users/${auth.currentUser.uid}/records/${formData.id}`),
      {
        ...formData,
      }
    );
  },

  deleteRecord(formData: RecordDto) {
    remove(
      ref(database, `users/${auth.currentUser.uid}/records/${formData.id}`)
    );
  },
};
