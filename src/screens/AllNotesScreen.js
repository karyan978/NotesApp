import React, { useContext } from 'react';
import { View, FlatList, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NotesContext } from '../context/NotesContext';
import NoteCard from '../components/NoteCard';

const AllNotesScreen = () => {
  const { notes } = useContext(NotesContext);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={{ marginRight: 10 }} />
        <TextInput placeholder="Search notes..." placeholderTextColor="#999" style={styles.searchInput} />
      </View>
      
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NoteCard item={item} />}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: '#FDF8F3', paddingHorizontal: 20, paddingTop: 15 },
  searchContainer: { flexDirection: 'row', backgroundColor: '#F3EFE9', borderRadius: 20, padding: 10, paddingHorizontal: 15, alignItems: 'center', marginBottom: 20 },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },
});

export default AllNotesScreen;