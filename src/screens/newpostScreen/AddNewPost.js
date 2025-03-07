import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Divider} from 'react-native-elements';
import ReelPost from './reelpost/ReelPost';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PhotoPost from './photopost/PhotoPost';

const AddNewPost = ({navigation}) => (
  <View style={styles.container}>
    <Header navigation={navigation} />
    <Divider style={{backgroundColor: 'gray', height: 2, opacity: 0.2}} />
    <ScrollView showsHorizontalScrollIndicator={false}>
      <PhotoPost />
      <ReelPost />
      {/* <BlueSideScreenEffect /> */}
      {/* <FormDataUploadExample/> */}
      <View style={{alignSelf: 'center', marginTop: 20}}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('PullToRefersh');
            // navigation.navigate('EquipmentList');
            // navigation.navigate('ProfileVP');
            // navigation.navigate('Musicbook');
            // navigation.navigate('VideoSelector');
            // navigation.navigate('ReelsScreen');
            // navigation.navigate('MusicHome');
            // navigation.navigate('VideoThumbnill');
            // navigation.navigate('AnimationStory');
            // navigation.navigate('Videissue');
            // navigation.navigate('VideoFeed');
            navigation.navigate('HomeMix');
          }}
          style={{
            backgroundColor: 'green',
            padding: 10,
            width: '60%',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 20}}> HomeMix </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 200,
        }}>
        <Text style={{color: 'white'}}>
          {' '}
          By continuing you agree withe Reelbook{' '}
        </Text>
        <Text
          style={{
            fontWeight: '700',
            borderBottomWidth: 1,
            borderBottomColor: 'white',
            color: 'white',
          }}>
          terma of uses and Privacy Policy
        </Text>
      </View>
    </ScrollView>
  </View>
);
const Header = ({navigation}) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons
        name="arrow-back-outline"
        size={30}
        color="black"
        style={{marginLeft: 10}}
      />
    </TouchableOpacity>
    <Text style={styles.hederText}>Add New Post</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    // backgroundColor: 'black',
  },
  hederText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 18,
    marginRight: 30,
  },
});

export default AddNewPost;
