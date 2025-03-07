import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = ({title, link}) => {
  const [isPressed, setIsPressed] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <LinearGradient
        // colors={['#11b5cf', '#b608c2', '#f0dd32']} // gradient colors
        colors={['#11b5cf', '#340d78']} // gradient colors
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradientBorder}>
        <TouchableOpacity
          style={[
            styles.button,
            // {backgroundColor: isPressed ? '#f0f0f0' : '#1c1c1e'}, // Change background color on press
            {backgroundColor: isPressed ? '#063561' : '#1c1c1e'}, // Change background color on press
          ]}
          activeOpacity={0.9}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={() => {
            navigation.navigate(link);
          }}>
          <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default GradientButton;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  gradientBorder: {
    borderRadius: 10,
    padding: 2, // Padding for the border effect
  },
  button: {
    backgroundColor: '#1c1c1e', // Default background color
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white', // Text color
    fontSize: 14,
  },
});

// const App = () => {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <GradientButton title="New to you" />
//     </View>
//   );
// };

// export default App;
