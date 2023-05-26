import { openDB } from 'idb';

const initdb = async () => {
  const db = await openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  return db;
};

export const putDb = async (content) => {
  const db = await initdb();
  const transaction = db.transaction('jate', 'readwrite');
  const store = transaction.objectStore('jate');
  const id = await store.put({ content });
  await transaction.complete;
  console.log(`Content added to database with ID: ${id}`);
};

export const getDb = async () => {
  const db = await initdb();
  const transaction = db.transaction('jate', 'readonly');
  const store = transaction.objectStore('jate');
  const content = await store.getAll();
  await transaction.complete;
  console.log('Retrieved content from database:', content);
  return content;
};

initdb();