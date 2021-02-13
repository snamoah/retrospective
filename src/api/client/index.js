import db, { fieldValue } from '../config/firebase';
import utils from '../../utils';

const retros = db.collection('Retros');
const sessions = db.collection('Sessions');

const client = {
  // eslint-disable-next-line consistent-return
  async createNewRetro() {
    try {
      const newDocument = await retros.add({
        notes: [],
        users: [],
        title: '',
      });
      const doc = await newDocument.get();
      return {
        id: doc.id,
        ...doc.data(),
      };
    } catch (error) {
      utils.log(error);
    }
  },
  // eslint-disable-next-line consistent-return
  async getRetro(retroId) {
    try {
      const doc = await retros.doc(retroId).get();

      if (doc.exists) {
        const retro = {
          id: doc.id,
          ...doc.data(),
        };

        return retro;
      }
    } catch (error) {
      utils.log(error);
    }
  },
  // eslint-disable-next-line consistent-return
  async createSession(retroId) {
    try {
      const sessionRef = await sessions.add({
        createdAt: fieldValue.serverTimestamp(),
      });

      const doc = await sessionRef.get();

      console.log('===> doc.id', doc.id, doc.data());

      await retros.doc(retroId).update({
        users: fieldValue.arrayUnion(doc.id),
      });

      return {
        id: doc.id,
        ...doc.data(),
      };
    } catch (error) {
      utils.log(error);
    }
  },
  // eslint-disable-next-line consistent-return
  async closeSession(sessionId, retroId) {
    try {
      await retros.doc(retroId).update({
        users: fieldValue.arrayRemove(sessionId),
      });
      await sessions.doc(sessionId).delete();
    } catch (error) {
      utils.log(error);
    }
  },
};

export default client;
