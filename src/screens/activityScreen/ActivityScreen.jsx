import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';
import React from 'react';
import Activity from './Activity';

const ActivityScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Activity />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
    // paddingHorizontal: 12,
  },
});

export default ActivityScreen;
