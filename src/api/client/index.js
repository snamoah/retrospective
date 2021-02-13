import db from '../config/firebase';

const retros = db.collection('Rooms');

const client = {
  // eslint-disable-next-line consistent-return
  async createNewRetro() {
    try {
      const newDocument = await retros.add({
        notes: [],
        title: '',
      });
      const doc = await newDocument.get();
      return {
        id: newDocument.id,
        ...doc.data(),
      };
    } catch (error) {
      console.log('===> error happened here', error);
    }
  },
};

export default client;
