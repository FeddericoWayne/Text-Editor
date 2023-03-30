import { openDB } from 'idb';

// initiates the IndexedDB
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// exported function to add data to IndexedDB
export const putDb = async (content) => {

  try {

    const jateDB = await openDB('jate',1);
    const tx = jateDB.transaction('jate','readwrite');
    const currentContent = tx.objectStore('jate');
    const request = currentContent.add({content});
    const res = await request;

    console.log('putDB implemented/notes updated',res);

  } catch(err) {
    console.error('putDb not implemented',err)
  };

};

// exported function to retrieve all data from IndexedDB
export const getDb = async () => {

  try {

    const jateDB = await openDB('jate',1);
    const tx = jateDB.transaction('jate','readonly');
    const currentNotes = tx.objectStore('jate');
    const request = currentNotes.getAll();
    const result = await request;
    
    console.log('getDB implemented/notes retrieved',result);

  } catch(err) {
    console.error('getDb not implemented',err)
  }

};

// calls the function that initiates the IndexedDB
initdb();
