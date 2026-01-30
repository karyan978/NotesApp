// src/components/NoteCard.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NotesContext } from '../context/NotesContext';

const NoteCard = ({ item, onEdit }) => {
  const navigation = useNavigation();
  const { deleteNote } = useContext(NotesContext);
  const dateString = new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  // Right Swipe Actions (Update & Delete)
  const renderRightActions = (progress, dragX) => {
    return (
      <View style={styles.actionContainer}>
        <TouchableOpacity style={[styles.actionBtn, styles.editBtn]} onPress={() => onEdit(item)}>
          <Ionicons name="create-outline" size={24} color="#FFF" />
          <Text style={styles.actionText}>Update</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={() => handleDelete()}>
          <Ionicons name="trash-outline" size={24} color="#FFF" />
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleDelete = () => {
    Alert.alert("Delete Note", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteNote(item.id) }
    ]);
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={() => navigation.navigate('NoteDetail', { note: item })}
      >
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.cardDate}>{dateString}</Text>
          </View>
          <Text style={styles.cardContent} numberOfLines={2}>{item.content}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 20, // Move margin inside specifically for Swipeable
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', flex: 1, marginRight: 10 },
  cardDate: { fontSize: 12, color: '#999' },
  cardContent: { fontSize: 14, color: '#666' },
  
  // Swipe Action Styles
  actionContainer: { flexDirection: 'row', marginBottom: 15, marginRight: 20 },
  actionBtn: { justifyContent: 'center', alignItems: 'center', width: 70, borderRadius: 0 },
  editBtn: { backgroundColor: '#4CAF50' },
  deleteBtn: { backgroundColor: '#F44336', borderTopRightRadius: 15, borderBottomRightRadius: 15 },
  actionText: { color: '#FFF', fontSize: 10, marginTop: 4, fontWeight: 'bold' }
});

export default NoteCard;