import { openDB } from 'idb';

// Initialize the IndexedDB database
const initdb = async () =>
  openDB('sotirios', 1, {
    // Function to be executed during database upgrade
    upgrade(db) {
      // Check if the object store already exists
      if (db.objectStoreNames.contains('sotirios')) {
        console.log('Sotirios database already exists');
        return;
      }
      // Create a new object store with a keyPath and auto-incrementing id
      db.createObjectStore('sotirios', { keyPath: 'id', autoIncrement: true });
      console.log('sotirios database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Add logic to a method that accepts some content and adds it to the database only if it doesn't exist
export const putDb = async (content) => {
  // Initialize the database
  const db = await initdb();

  // Check if the content is already in the database
  const existingContents = await getDb();
  if (existingContents.some((item) => item.content === content)) {
    console.log('Content already in the database. Skipping.');
    return;
  }

  // Create a transaction with readwrite access
  const tx = db.transaction('sotirios', 'readwrite');
  // Get the object store
  const store = tx.objectStore('sotirios');
  // Add the content to the object store
  await store.add({ content: content });
  // Wait for the transaction to complete
  await tx.done;
  console.log('Content added to the database');
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Initialize the database
  const db = await initdb();
  // Create a transaction with readonly access
  const tx = db.transaction('sotirios', 'readonly');
  // Get the object store
  const store = tx.objectStore('sotirios');
  // Retrieve all content from the object store
  const contents = await store.getAll();
  // Wait for the transaction to complete
  await tx.done;
  console.log('Retrieved content from the database:', contents);
  return contents;
};

// Initialize the database
initdb();
