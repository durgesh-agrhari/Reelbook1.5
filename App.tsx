import {StyleSheet, Text} from 'react-native';
import React from 'react';
import InstaState from './src/context/InstaContext';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import MyStore from './src/redux/MyStore';

const App = () => {
  return (
    <Provider store={MyStore} >
      <InstaState>
        <AppNavigator />
      </InstaState>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});



// // In App.js in a new project

// import * as React from 'react';
// import { View, Text } from 'react-native';
// import { createStaticNavigation } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

// const RootStack = createNativeStackNavigator({
//   screens: {
//     Home: HomeScreen,
//   },
// });

// const Navigation = createStaticNavigation(RootStack);

// export default function App() {
//   return <Navigation />;
// }