import { openDB } from "idb";

const initdb = async () => {
  const db = await openDB("jate", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("jate")) {
        db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
        console.log("jate database created");
      }
    },
  });
  return db;
};

export const putDb = async (content) => {
  console.log("PUT to the database");

  const db = await initdb();
  const tx = db.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  await store.put({ value: content, id: 1 });
  await tx.done;
  console.log("Content added to the database:", content);
};


export const getDb = async () => {
  console.log("GET from the database");

  const db = await initdb();
  const tx = db.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const content = await store.getAll();
  await tx.done;
  console.log("All content from the database:", content);
  return content;
};

initdb();
