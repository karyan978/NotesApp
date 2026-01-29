import React, { createContext, useState } from 'react';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([
    { id: '1', title: 'Meeting with Team', content: 'Discuss project milestones...', date: new Date('2023-04-27') },
    { id: '2', title: 'Grocery List', content: 'Milk, Eggs, Bread...', date: new Date('2023-04-26') },
    { id: '3', title: 'Travel Itinerary', content: 'Flight at 8 AM...', date: new Date('2023-04-25') },
  ]);

  const addNote = (title, content) => {
    const newNote = {
      id: Date.now().toString(),
      title: title,
      content: content,
      date: new Date(), // Current date/time
    };
    setNotes([newNote, ...notes]);
  };

  return (
    <NotesContext.Provider value={{ notes, addNote }}>
      {children}
    </NotesContext.Provider>
  );
};