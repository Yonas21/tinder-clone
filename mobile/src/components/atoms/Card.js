import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const Card = ({ person, style }) => {
  const primaryPicture = person.pictures?.find(p => p.is_primary) || person.pictures?.[0];

  return (
    <View style={[styles.card, style]}>
      <Image
        source={{ uri: primaryPicture?.url || 'https://via.placeholder.com/400' }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.name}>{person.name}</Text>
        <Text style={styles.age}>{person.age} years old</Text>
        {person.location && (
          <Text style={styles.location}>{person.location}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  name: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  age: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 5,
  },
  location: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Card;

