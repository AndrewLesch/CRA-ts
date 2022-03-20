import { RecordDto } from '../model';
import { database, auth } from '../firebase';
import { ref, set, update } from 'firebase/database';

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
        accountId: formData.accountId,
        category: formData.category,
        creatingTime: formData.creatingTime,
        currency: formData.currency,
        date: formData.date,
        id: formData.id,
        type: formData.type,
        value: formData.value,
      }
    );
  },

  deleteRecord(formData: RecordDto) {
    update(
      ref(database, `users/${auth.currentUser.uid}/records/${formData.id}`),
      {
        accountId: null,
        category: null,
        creatingTime: null,
        currency: null,
        date: null,
        id: null,
        type: null,
        value: null,
      }
    );
  },
};
