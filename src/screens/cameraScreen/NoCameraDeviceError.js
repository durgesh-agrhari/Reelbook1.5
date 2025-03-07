import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const NoCameraDeviceError = () => {
  return (
    <View style={{justifyContent: 'center', alignContent: 'center'}}>
      <Text style={{fontSize: 30, color: 'green', textAlign: 'center'}}>
        NoCameraDeviceError
      </Text>
    </View>
  );
};

export default NoCameraDeviceError;

const styles = StyleSheet.create({});
