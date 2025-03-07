import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const StoryUsers = ({item}) => {
  const {userData} = useSelector(s => s.auth);
  const THEME = useSelector(state => state.theme);
  const navigation = useNavigation();
  return (
    <View>
      {item?._id == userData?._id ? (
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            right: 30,
            zIndex: 1,
          }}>
          <TouchableOpacity onPress={() => navigation.push('StoryPost')}>
            <Entypo
              name="circle-with-plus"
              style={{
                fontSize: 25,
                color: '#2596be',
                backgroundColor: 'white',
                borderRadius: 100,
              }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            right: 22.5,
            zIndex: 1,
          }}>
          <TouchableOpacity>
            <Image
              // source={{uri: story.profileimg}}
              source={{
                uri: 'https://i.pinimg.com/736x/9a/cd/f7/9acdf7fd80d31288cb35513e78388bc8.jpg',
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                borderColor: '#5536ba',
                borderWidth: 3,
                padding: 2,
                backgroundColor:'gray',
              }}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* {item._id != userData._id ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.storyinner}>
            <Image
              style={styles.story}
              //  source={{uri: story.image}}
              source={{
                uri: 'https://finetechhub.com/wp-content/uploads/2024/07/Cute-Girl-Pic-for-DP-and-Beautiful-Girl-Pictures-1024x1024.jpg.webp',
              }}
            />
          </View>
          <View style={{marginBottom: 0, marginTop: 5, padding: 0}}>
            <Text
              style={{
                color: THEME.data == 'LIGHT' ? 'black' : 'white',
                marginTop: 4,
                textAlign: 'center',
                fontSize: 11,
                // opacity: story.id == 0 ? 1 : 0.9,
              }}>
              {item.name.length > 10
                ? item.name.slice(0, 10).toLowerCase() + '...'
                : item.name.toUpperCase()}
            </Text>
          </View>
        </View>
      ) : (
        <View></View>
      )} */}
      {/* 
      {item._id == userData._id ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.storyinner}>
            <Image
              style={styles.story}
              //  source={{uri: story.image}}
              source={{
                uri: 'https://finetechhub.com/wp-content/uploads/2024/07/Cute-Girl-Pic-for-DP-and-Beautiful-Girl-Pictures-1024x1024.jpg.webp',
              }}
            />
          </View>
          <View style={{marginBottom: 0, marginTop: 5, padding: 0}}>
            <Text
              style={{
                color: THEME.data == 'LIGHT' ? 'black' : 'white',
                marginTop: 4,
                textAlign: 'center',
                fontSize: 11,
                // opacity: story.id == 0 ? 1 : 0.9,
              }}>
              {item.name.length > 10
                ? item.name.slice(0, 10).toLowerCase() + '...'
                : item.name.toUpperCase()}
            </Text>
          </View>
        </View>
      ) : (
        <View></View>
      )} */}

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AnimationStory', {
            name: item.name,
            image: item.image,
          });
        }} 
        
        style={{margin:4}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.storyinner}>
            <Image
              style={styles.story}
              //  source={{uri: story.image}}
              source={{
                uri: 'https://finetechhub.com/wp-content/uploads/2024/07/Cute-Girl-Pic-for-DP-and-Beautiful-Girl-Pictures-1024x1024.jpg.webp',
              }}
            />
          </View>
          <View style={{marginBottom: 0, marginTop: 5, padding: 0}}>
            <Text
              style={{
                color: THEME.data == 'LIGHT' ? 'black' : 'white',
                marginTop: 4,
                textAlign: 'center',
                fontSize: 11,
                // opacity: story.id == 0 ? 1 : 0.9,
              }}>
              {item.name.length > 10
                ? item.name.slice(0, 10).toLowerCase() + '...'
                : item.name.toUpperCase()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default StoryUsers;

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 69,
    borderRadius: 50,
    marginLeft: 3,
    marginBottom: 5,
    borderWidth: 2.5,
    borderColor: '#5536ba',
    resizeMode: 'cover',
    marginTop: 4,
    padding: 10,
    backgroundColor:'gray',
  },
  storyinner: {
    width: 81.5,
    height: 81.5,
    borderRadius: 50,
    borderWidth: 2.5,
    borderColor: '#5536ba',
    resizeMode: 'cover',
    marginTop: 10,
    paddingBottom: 5,
  },
});
