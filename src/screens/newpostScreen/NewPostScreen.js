import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import AddNewPost from './AddNewPost';
import { useSelector } from 'react-redux';
// import AddNewPost from '../components/newPost/AddNewPost';

const NewPostScreen = ({navigation}) => {
  const THEME = useSelector(state => state.theme)
  return (
    <SafeAreaView style={[styles.container,{backgroundColor: THEME.data == 'LIGHT' ? 'white' : 'black'}]}>
      <AddNewPost navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default NewPostScreen;
