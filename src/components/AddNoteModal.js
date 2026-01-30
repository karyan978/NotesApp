// src/components/AddNoteModal.js
import React, { useState, useContext, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NotesContext } from '../context/NotesContext';

const AddNoteModal = ({ visible, onClose, noteToEdit, onSaved }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addNote, updateNote } = useContext(NotesContext);

  // Populate fields if editing
  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [noteToEdit, visible]);

  const handleSave = () => {
    if (title.trim()) {
      if (noteToEdit) {
        // Update Logic
        updateNote(noteToEdit.id, title, content);
        if(onSaved) onSaved(title, content); // Callback to update details screen
      } else {
        // Add Logic
        addNote(title, content);
      }
      
      // Reset and Close
      if (!noteToEdit) {
          setTitle('');
          setContent('');
      }
      onClose();
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{noteToEdit ? 'Edit Note' : 'New Note'}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.inputTitle}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.inputContent}
            placeholder="Write something..."
            multiline
            value={content}
            onChangeText={setContent}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{noteToEdit ? 'Update Note' : 'Save Note'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// Styles remain the same as your original file
const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, height: '70%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  inputTitle: { fontSize: 18, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#eee', marginBottom: 15, paddingBottom: 5 },
  inputContent: { fontSize: 16, color: '#333', height: 200, textAlignVertical: 'top' },
  saveButton: { backgroundColor: '#FFD700', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  saveButtonText: { fontWeight: 'bold', color: '#fff', fontSize: 16 },
});

export default AddNoteModal;