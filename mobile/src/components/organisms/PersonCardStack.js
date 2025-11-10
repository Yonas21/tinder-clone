import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SwipeCard from '../molecules/SwipeCard';
import ActionButtons from '../molecules/ActionButtons';

const PersonCardStack = ({ people, onSwipeLeft, onSwipeRight }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = () => {
    if (currentIndex < people.length - 1) {
      onSwipeLeft(people[currentIndex]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex < people.length - 1) {
      onSwipeRight(people[currentIndex]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleButtonLike = () => {
    handleSwipeRight();
  };

  const handleButtonDislike = () => {
    handleSwipeLeft();
  };

  if (currentIndex >= people.length) {
    return null;
  }

  const currentPerson = people[currentIndex];
  const nextPerson = people[currentIndex + 1];

  return (
    <View style={styles.container}>
      {nextPerson && (
        <View style={styles.nextCard}>
          <SwipeCard person={nextPerson} />
        </View>
      )}
      <View style={styles.currentCard}>
        <SwipeCard
          person={currentPerson}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        />
      </View>
      <ActionButtons
        onLike={handleButtonLike}
        onDislike={handleButtonDislike}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  currentCard: {
    width: '100%',
    height: '70%',
    position: 'absolute',
    zIndex: 2,
  },
  nextCard: {
    width: '95%',
    height: '68%',
    position: 'absolute',
    zIndex: 1,
    opacity: 0.7,
  },
});

export default PersonCardStack;

