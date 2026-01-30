import * as SQLite from 'expo-sqlite';

// Naya API use karne ka tareeka
export const initDB = async () => {
  const db = await SQLite.openDatabaseAsync('notes.db');
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      title TEXT, 
      content TEXT, 
      date TEXT
    );
  `);
};

export const fetchNotes = async () => {
  const db = await SQLite.openDatabaseAsync('notes.db');
  const allRows = await db.getAllAsync('SELECT * FROM notes ORDER BY id DESC');
  return allRows;
};

export const insertNote = async (title, content) => {
  const db = await SQLite.openDatabaseAsync('notes.db');
  const date = new Date().toISOString();
  const result = await db.runAsync(
    'INSERT INTO notes (title, content, date) VALUES (?, ?, ?)',
    [title, content, date]
  );
  return result;
};

export const updateNoteInDB = async (id, title, content) => {
  const db = await SQLite.openDatabaseAsync('notes.db');
  await db.runAsync(
    'UPDATE notes SET title = ?, content = ? WHERE id = ?',
    [title, content, id]
  );
};

export const deleteNoteFromDB = async (id) => {
  const db = await SQLite.openDatabaseAsync('notes.db');
  await db.runAsync('DELETE FROM notes WHERE id = ?', [id]);
};