import React, {useRef} from 'react';
import {View, Button, StyleSheet, Animated, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const BlueSideEffect = () => {
  const animationLeft = useRef(new Animated.Value(0)).current;
  const animationRight = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    // Animate both sides to appear
    Animated.parallel([
      Animated.timing(animationLeft, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(animationRight, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // After 2 seconds, hide both sides
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(animationLeft, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(animationRight, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }),
        ]).start();
      }, 1000);
    });
  };

  const animatedLeftStyle = {
    opacity: animationLeft,
    width: animationLeft.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width * 0.02], // 10% width of the screen for left side effect
    }),
  };

  const animatedRightStyle = {
    opacity: animationRight,
    width: animationRight.interpolate({
      inputRange: [0, 1],
      // outputRange: [height * 0.03, width * 0.02], // 10% width of the screen for right side effect
      outputRange: [0, width * 0.02], // 10% width of the screen for right side effect
    }),
  };

  return (
    <View style={styles.container}>
      {/* Left side effect */}
      <Animated.View style={[styles.sideEffectLeft, animatedLeftStyle]}>
        <LinearGradient
          colors={['cyan', 'purple', 'transparent' ,'transparent','transparent']}
          style={styles.gradientLine}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
        />
      </Animated.View>

      {/* Right side effect */}
      <Animated.View style={[styles.sideEffectRight, animatedRightStyle]}>
        <LinearGradient
          colors={['transparent','transparent','transparent', 'purple', 'cyan']}
          // colors={['transparent', 'cyan', 'blue']}
          style={styles.gradientLine}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
        />
      </Animated.View>

      <Button title="Click Me" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideEffectLeft: {
    position: 'absolute',
    left: 0,
    // height: height,
    height: 500,
  },
  sideEffectRight: {
    position: 'absolute',
    right: 0,
    // height: height,
    height: 500,
  },
  gradientLine: {
    flex: 1,
    height: '100%',
  },
});

export default BlueSideEffect;
