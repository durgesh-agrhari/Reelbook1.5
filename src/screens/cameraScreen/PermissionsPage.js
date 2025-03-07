import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PermissionsPage = () => {
  return (
    <View style={{ justifyContent:'center', alignContent:'center'}}>
      <Text style={{fontSize: 30, color: 'green',textAlign:'center'}}>Permissions Not Allow</Text>
    </View>
  );
};

export default PermissionsPage;

const styles = StyleSheet.create({});
