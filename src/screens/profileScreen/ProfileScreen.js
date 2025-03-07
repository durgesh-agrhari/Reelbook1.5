import {View, Text, StyleSheet, Image, ScrollView, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileDetails from './ProfileDetails';


const InstLogo =
  'https://png.pngtree.com/element_our/sm/20180630/sm_5b37de49cbb70.jpg';

const ProfileScreen = ({navigation}) => {

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          position: 'relative',
          marginBottom: 60,
        }}>
        <View>
          <ProfileHeader navigation={navigation} />
          <ProfileDetails navigation={navigation} />
        </View>
      </View>
      <View style={{marginBottom:50}}>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 5,
  },
});

export default ProfileScreen;
