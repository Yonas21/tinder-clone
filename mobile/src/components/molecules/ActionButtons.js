import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const ActionButtons = ({ onLike, onDislike }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.dislikeButton]}
        onPress={onDislike}
      >
        <Text style={styles.dislikeIcon}>✕</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, styles.likeButton]}
        onPress={onLike}
      >
        <Text style={styles.likeIcon}>♥</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 40,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dislikeButton: {
    borderWidth: 3,
    borderColor: '#FF6B6B',
  },
  likeButton: {
    borderWidth: 3,
    borderColor: '#4ECDC4',
  },
  dislikeIcon: {
    fontSize: 40,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  likeIcon: {
    fontSize: 40,
    color: '#4ECDC4',
    fontWeight: 'bold',
  },
});

export default ActionButtons;

