import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoteCard = ({ item }) => {
  const dateString = new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDate}>{dateString}</Text>
      </View>
      <Text style={styles.cardContent} numberOfLines={2}>{item.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDate: {
    fontSize: 12,
    color: '#999',
  },
  cardContent: {
    fontSize: 14,
    color: '#666',
  },
});

export default NoteCard;