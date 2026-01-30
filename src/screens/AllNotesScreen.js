// src/screens/AllNotesScreen.js
import React, { useContext, useState } from 'react';
import { View, FlatList, TextInput, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NotesContext } from '../context/NotesContext';
import NoteCard from '../components/NoteCard';
import AddNoteModal from '../components/AddNoteModal';

const AllNotesScreen = () => {
  const { notes } = useContext(NotesContext);
  const [searchQuery, setSearchQuery] = useState(''); // 1. Search text ke liye state
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // 2. Search Logic: Title ya Content me text match karega
  const filteredNotes = notes.filter(note => {
    const query = searchQuery.toLowerCase();
    const titleMatch = note.title.toLowerCase().includes(query);
    const contentMatch = note.content.toLowerCase().includes(query);
    return titleMatch || contentMatch;
  });

  const handleEdit = (note) => {
    setSelectedNote(note);
    setEditModalVisible(true);
  };

  return (
    <View style={styles.screenContainer}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={{ marginRight: 10 }} />
        <TextInput 
          placeholder="Search notes..." 
          placeholderTextColor="#999" 
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)} // 3. Type karne par state update
        />
        {/* Clear Button (Optional) */}
        {searchQuery.length > 0 && (
          <Ionicons 
            name="close-circle" 
            size={20} 
            color="#999" 
            onPress={() => setSearchQuery('')} 
          />
        )}
      </View>
      
      {/* List */}
      <FlatList
        data={filteredNotes} // 4. Yahan 'notes' ki jagah 'filteredNotes' pass karein
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NoteCard item={item} onEdit={handleEdit} />}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={{ color: '#999' }}>No notes found</Text>
          </View>
        )}
      />

      {/* Edit Modal */}
      <AddNoteModal 
        visible={editModalVisible} 
        onClose={() => setEditModalVisible(false)} 
        noteToEdit={selectedNote}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: '#FDF8F3', paddingTop: 15 },
  searchContainer: { 
    marginHorizontal: 20, 
    flexDirection: 'row', 
    backgroundColor: '#F3EFE9', 
    borderRadius: 20, 
    padding: 10, 
    paddingHorizontal: 15, 
    alignItems: 'center', 
    marginBottom: 20 
  },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },
});

export default AllNotesScreen;