import React, { useRef } from 'react';
import { View, StyleSheet, Animated, PanResponder } from 'react-native';
import Card from '../atoms/Card';

const SwipeCard = ({ person, onSwipeLeft, onSwipeRight, style }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (evt, gestureState) => {
        pan.flattenOffset();
        
        const swipeThreshold = 120;
        
        if (gestureState.dx > swipeThreshold) {
          // Swipe right - Like
          Animated.spring(pan, {
            toValue: { x: 500, y: gestureState.dy },
            useNativeDriver: false,
          }).start(() => {
            onSwipeRight();
          });
        } else if (gestureState.dx < -swipeThreshold) {
          // Swipe left - Dislike
          Animated.spring(pan, {
            toValue: { x: -500, y: gestureState.dy },
            useNativeDriver: false,
          }).start(() => {
            onSwipeLeft();
          });
        } else {
          // Return to center
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const rotate = pan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        {
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { rotate },
          ],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Card person={person} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default SwipeCard;

