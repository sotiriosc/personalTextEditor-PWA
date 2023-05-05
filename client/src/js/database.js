import { openDB } from 'idb';

const initdb = async () =>
  openDB('sotirios', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('sotirios')) {
        console.log('Sotirios database already exists');
        return;
      }
      db.createObjectStore('sotirios', { keyPath: 'id', autoIncrement: true });
      console.log('sotirios database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction('sotirios', 'readwrite');
  const store = tx.objectStore('sotirios');
  await store.add({ content: content });
  await tx.done;
  console.log('Content added to the database');
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await initdb();
  const tx = db.transaction('sotirios', 'readonly');
  const store = tx.objectStore('sotirios');
  const contents = await store.getAll();
  await tx.done;
  console.log('Retrieved content from the database:', contents);
  return contents;
};

initdb();