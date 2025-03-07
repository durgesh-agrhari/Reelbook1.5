import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const ShadowButton = ({ title }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.button, isPressed && styles.pressedButton]} // Apply shadow when pressed
      activeOpacity={0.9}
      onPressIn={() => setIsPressed(true)}  // Show shadow on press
      onPressOut={() => setIsPressed(false)} // Hide shadow when released
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1c1c1e', // Button default color
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    // Default shadow (hidden initially)
    shadowColor: '#000', // Default shadow (initially hidden)
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0, // For Android, no shadow initially
  },
  pressedButton: {
    // Shadow properties during press (iOS)
    shadowColor: 'red', // Red shadow color
    shadowOffset: { width: 15, height: 15 }, // Wider and higher shadow spread
    shadowOpacity: 0.8, // High opacity for visible shadow
    shadowRadius: 30, // Large shadow spread
    // Shadow properties during press (Android)
    elevation: 30, // Higher elevation for larger shadow on Android
  },
  text: {
    color: '#ffffff', // Text color
    fontSize: 16,
  },
});

export default ShadowButton;
