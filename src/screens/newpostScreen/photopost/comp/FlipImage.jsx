import React, {useState, useEffect, useRef} from 'react';
import {View, Animated, Image, StyleSheet} from 'react-native';

const FlipImage = () => {
  const flipAnim = useRef(new Animated.Value(0)).current; // Animated value for flip
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped(!flipped);
      startFlipAnimation();
    }, 1000); // auto-flip every second

    return () => clearInterval(interval); // Clean up on component unmount
  }, [flipped]);

  const startFlipAnimation = () => {
    Animated.timing(flipAnim, {
      toValue: flipped ? 0 : 1,
      duration: 500, // Animation duration
      useNativeDriver: true,
    }).start();
  };

  const flipRotation = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'], // Rotate between 0 and 180 degrees
  });

  return (
    <View style={styles.containerLike}>
      <Animated.Image
        source={require('../../../../assets/likeGif/like.png')}
        style={[
          styles.imageLike,
          {transform: [{rotateY: flipRotation}]}, // Flip animation using rotateY
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerLike: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLike: {
    width: 100,
    height: 100,
    backfaceVisibility: 'hidden', // Hide image during rotation
  },
});

export default FlipImage;
