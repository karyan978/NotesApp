// src/context/NotesContext.js
import React, { createContext, useState, useEffect } from 'react';
import { initDB, fetchNotes, insertNote, deleteNoteFromDB, updateNoteInDB } from '../database/db';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  // Load notes when app starts
  useEffect(() => {
    initDB()
      .then(() => loadNotes())
      .catch((err) => console.log('DB Init Error:', err));
  }, []);

  const loadNotes = () => {
    fetchNotes()
      .then((data) => setNotes(data))
      .catch((err) => console.log('Fetch Error:', err));
  };

  const addNote = async (title, content) => {
    try {
      await insertNote(title, content);
      loadNotes(); // Refresh list
    } catch (error) {
      console.log('Add Error:', error);
    }
  };

  const updateNote = async (id, title, content) => {
    try {
      await updateNoteInDB(id, title, content);
      loadNotes();
    } catch (error) {
      console.log('Update Error:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await deleteNoteFromDB(id);
      loadNotes();
    } catch (error) {
      console.log('Delete Error:', error);
    }
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
};