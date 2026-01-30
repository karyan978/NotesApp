// src/screens/NoteDetailScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NotesContext } from '../context/NotesContext';
import AddNoteModal from '../components/AddNoteModal';

const NoteDetailScreen = ({ route, navigation }) => {
  const { note } = route.params;
  const { deleteNote } = useContext(NotesContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState(note); // Local state to update view instantly after edit

  const handleDelete = () => {
    Alert.alert("Delete Note", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => {
          deleteNote(currentNote.id);
          navigation.goBack();
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{currentNote.title}</Text>
        <Text style={styles.date}>
          Created on {new Date(currentNote.date).toLocaleString()}
        </Text>
        <View style={styles.divider} />
        <Text style={styles.content}>{currentNote.content}</Text>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => setModalVisible(true)}>
          <Ionicons name="create-outline" size={24} color="#333" />
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
        <View style={styles.verticalLine} />
        <TouchableOpacity style={styles.actionBtn} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={24} color="#F44336" />
          <Text style={[styles.btnText, { color: '#F44336' }]}>Delete</Text>
        </TouchableOpacity>
      </View>

      {/* Reuse Modal for Editing */}
      <AddNoteModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        noteToEdit={currentNote} // Pass the note to edit
        onSaved={(updatedTitle, updatedContent) => {
             // Update local view
             setCurrentNote({...currentNote, title: updatedTitle, content: updatedContent});
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF8F3' },
  scrollContent: { padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  date: { fontSize: 14, color: '#999', marginBottom: 15 },
  divider: { height: 1, backgroundColor: '#E0E0E0', marginBottom: 20 },
  content: { fontSize: 18, lineHeight: 28, color: '#444' },
  
  actionBar: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute', bottom: 0, left: 0, right: 0
  },
  actionBtn: { flexDirection: 'row', alignItems: 'center' },
  btnText: { marginLeft: 8, fontSize: 16, fontWeight: '600' },
  verticalLine: { width: 1, height: 20, backgroundColor: '#DDD' }
});

export default NoteDetailScreen;