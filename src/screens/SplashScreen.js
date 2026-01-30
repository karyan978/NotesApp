import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // 3 second baad automatic Home screen par le jayega
    setTimeout(() => {
      navigation.replace('Main'); // 'Main' wahi stack name hai jo humne App.js me rakha tha
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      {/* App Logo Animation */}
      <Animatable.View 
        animation="bounceIn" 
        duration={1500} 
        style={styles.logoContainer}
      >
        <Ionicons name="document-text" size={100} color="#FFD700" />
      </Animatable.View>

      {/* App Name Animation */}
      <Animatable.Text 
        animation="fadeInUpBig" 
        duration={1500} 
        style={styles.title}
      >
        My Notes App
      </Animatable.Text>

      {/* Subtitle Animation */}
      <Animatable.Text 
        animation="fadeIn" 
        delay={1000} 
        duration={1000} 
        style={styles.subtitle}
      >
        Secure & Simple
      </Animatable.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333', // Dark premium background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700', // Golden theme color
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#AAA',
    marginTop: 10,
  },
});

export default SplashScreen;