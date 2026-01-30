// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Import Stack
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import Gesture 
import SplashScreen from './src/screens/SplashScreen';

import { NotesProvider } from './src/context/NotesContext';
import AllNotesScreen from './src/screens/AllNotesScreen';
import TodayScreen from './src/screens/TodayScreen';
import NoteDetailScreen from './src/screens/NoteDetailScreen'; // New Import
import AddNoteModal from './src/components/AddNoteModal';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

// 1. Define the Tab Navigator as a Component
function HomeTabs({ setModalVisible }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.appTitle}>All Notes</Text>
        <TouchableOpacity>
           <Ionicons name="ellipsis-horizontal" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#FDF8F3', elevation: 0, shadowOpacity: 0, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
          tabBarIndicatorStyle: { backgroundColor: '#FFD700', height: 3 },
          tabBarLabelStyle: { fontWeight: 'bold', textTransform: 'none', fontSize: 16 },
          tabBarActiveTintColor: '#333',
          tabBarInactiveTintColor: '#999',
        }}
      >
        <Tab.Screen name="Home" component={AllNotesScreen} />
        <Tab.Screen name="Today" component={TodayScreen} />
      </Tab.Navigator>

      {/* FAB - Passed down via props or handled here */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// 2. Main App Component
export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotesProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="Splash" component={SplashScreen} />
            {/* The Tab Screen */}
            <Stack.Screen name="Main">
              {(props) => <HomeTabs {...props} setModalVisible={setModalVisible} />}
            </Stack.Screen>
            
            {/* The Detail Screen */}
            <Stack.Screen 
              name="NoteDetail" 
              component={NoteDetailScreen} 
              options={{ 
                headerShown: true, 
                title: '', 
                headerStyle: { backgroundColor: '#FDF8F3', elevation: 0, shadowOpacity: 0 },
                headerTintColor: '#333'
              }} 
            />
          </Stack.Navigator>

          {/* Modal is Global */}
          <AddNoteModal visible={modalVisible} onClose={() => setModalVisible(false)} />
          
        </NavigationContainer>
      </NotesProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF8F3',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 40, // Adjusted for SafeArea
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FDF8F3',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    backgroundColor: '#FFD700',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 100,
  },
});