import React, { useContext } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { NotesContext } from '../context/NotesContext';
import NoteCard from '../components/NoteCard';

const TodayScreen = () => {
  const { notes } = useContext(NotesContext);

  // Filter notes for Today
  const todayNotes = notes.filter(note => {
    const today = new Date();
    const noteDate = new Date(note.date);
    return (
      noteDate.getDate() === today.getDate() &&
      noteDate.getMonth() === today.getMonth() &&
      noteDate.getFullYear() === today.getFullYear()
    );
  });

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.headerSubtitle}>Notes created today</Text>
      {todayNotes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={{ color: '#aaa' }}>No notes added today.</Text>
        </View>
      ) : (
        <FlatList
          data={todayNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NoteCard item={item} />}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: '#FDF8F3', paddingHorizontal: 20, paddingTop: 15 },
  headerSubtitle: { fontSize: 14, color: '#888', marginBottom: 10 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
});

export default TodayScreen;