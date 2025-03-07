import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {friendsProfileData} from '../../data/friendsProfileData';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {Divider} from 'react-native-elements';
import HomeBannerAds from '../adsManager/HomeBannerAds';
const Activity = () => {
  // const navigation = useNavigation<NavigationProp<any>>();
  const THEME = useSelector(state => state.theme);
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: THEME.data == 'LIGHT' ? 'white' : 'black'},
      ]}>
      <View
        style={[
          styles.header,
          {backgroundColor: THEME.data == 'LIGHT' ? 'white' : 'black'},
        ]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('BottomTab');
          }}>
          <Ionicons
            name="arrow-back-outline"
            size={30}
            style={{
              marginLeft: 5,
              marginTop: 8,
              color: THEME.data == 'LIGHT' ? 'black' : 'white',
            }}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerText,
            {color: THEME.data == 'LIGHT' ? 'black' : 'white'},
          ]}>
          Activity
        </Text>
      </View>
      <Divider style={{backgroundColor: 'gray', height: 2, opacity:0.2}} />
      <HomeBannerAds/>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* <Text style={[styles.sectionTitle,{color: THEME.data == 'LIGHT' ? 'black':'white'}]}>This week</Text> */}

        {/* <View style={styles.activityContainer}>
          {friendsProfileData.slice(0, 3).map((data, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate('FriendProfile', {
                  name: data.name,
                  profileImage: data.profileImage,
                  follow: data.follow,
                  post: data.posts,
                  followers: data.followers,
                  following: data.following,
                });
              }}>
              <Text style={styles.friendName}>{data.name}, </Text>
            </TouchableOpacity>
          ))}
          <Text style={[styles.activityText,{color: THEME.data == 'LIGHT' ? 'black':'white'}]}>Start following you</Text>
        </View> */}

        <Text
          style={[
            styles.sectionTitle,
            {color: THEME.data == 'LIGHT' ? 'black' : 'white'},
          ]}>
          Earlier
        </Text>
        {friendsProfileData.slice(3, 6).map((data, index) => {
          const [follow, setFollow] = useState(data.follow);
          return (
            <View
              key={index}
              style={[
                styles.earlierActivityContainer,
                {
                  backgroundColor:
                    THEME.data == 'LIGHT' ? '#b4b4b8' : '#1e2126',
                },
              ]}>
              <View style={styles.earlierActivityContent}>
                <TouchableOpacity
                  style={styles.profileButton}
                  onPress={() => {
                    navigation.navigate('FriendProfile', {
                      name: data.name,
                      profileImage: data.profileImage,
                      follow: follow,
                      post: data.posts,
                      followers: data.followers,
                      following: data.following,
                    });
                  }}>
                  <Image
                    source={{uri: data.profileImage}}
                    style={styles.profileImage}
                  />
                  <Text
                    style={[
                      styles.activityText,
                      {color: THEME.data == 'LIGHT' ? 'black' : 'white'},
                    ]}>
                    <Text
                      style={[
                        styles.boldText,
                        {color: THEME.data == 'LIGHT' ? 'black' : 'white'},
                      ]}>
                      {data.name}
                    </Text>
                    , Who you might know, is on Instagram
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.followButton, {width: follow ? 82 : 72}]}
                  onPress={() => setFollow(!follow)}>
                  <View
                    style={[
                      styles.followContainer,
                      follow && styles.followingContainer,
                    ]}>
                    <Text style={styles.followText}>
                      {follow ? 'Following' : 'Follow'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        <Text
          style={[
            styles.sectionTitle,
            {color: THEME.data == 'LIGHT' ? 'black' : 'white'},
          ]}>
          Suggested for you
        </Text>
        {friendsProfileData.slice(6, 12).map((data, index) => {
          const [follow, setFollow] = useState(data.follow);
          const [close, setClose] = useState(false);
          return (
            <View
              key={index}
              style={[
                styles.suggestionContainer,
                {
                  backgroundColor:
                    THEME.data == 'LIGHT' ? '#b4b4b8' : '#1e2126',
                },
              ]}>
              {!close && (
                <View style={styles.suggestionContent}>
                  <View>
                    <TouchableOpacity
                      style={styles.suggestionProfile}
                      onPress={() => {
                        navigation.navigate('FriendProfile', {
                          name: data.name,
                          profileImage: data.profileImage,
                          follow: follow,
                          post: data.posts,
                          followers: data.followers,
                          following: data.following,
                        });
                      }}>
                      <Image
                        source={{uri: data.profileImage}}
                        style={styles.suggestionImage}
                      />
                      <View>
                        <Text
                          style={[
                            styles.suggestionName,
                            {color: THEME.data == 'LIGHT' ? 'black' : 'white'},
                          ]}>
                          {data.name}
                        </Text>
                        <Text
                          style={[
                            styles.suggestionAccount,
                            {color: THEME.data == 'LIGHT' ? 'black' : 'white'},
                          ]}>
                          {data.accountName}
                        </Text>
                        <Text
                          style={[
                            styles.suggestionText,
                            {color: THEME.data == 'LIGHT' ? 'black' : 'white'},
                          ]}>
                          Suggested for you
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.suggestionActions}>
                    <TouchableOpacity
                      style={styles.followButton}
                      onPress={() => setFollow(!follow)}>
                      <View
                        style={[
                          styles.followContainer,
                          follow && styles.followingContainer,
                        ]}>
                        <Text style={styles.followText}>
                          {follow ? 'Following' : 'Follow'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setClose(true)}>
                      <AntDesign name="close" style={styles.closeIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          );
        })}

        <View style={styles.suggestionFooter}>
          <Text style={styles.seeAllText}>See all suggestions</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    margin: 0,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1a1f21',
    marginLeft: -10,
    marginRight: -10,
    paddingHorizontal: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    color: 'white',
  },
  goBackText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    color: '#3493D9',
  },
  scrollView: {
    margin: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    marginTop: 15,
  },
  activityContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#1e2126',
    borderRadius: 15,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  friendName: {
    color: 'white',
  },
  activityText: {
    color: 'white',
  },
  earlierActivityContainer: {
    backgroundColor: '#1e2126',
    borderRadius: 15,
    marginBottom: 6,
    paddingHorizontal: 10,
  },
  earlierActivityContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '64%',
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 10,
    borderColor: 'gray',
    borderWidth: 2,
  },
  boldText: {
    fontWeight: '500',
    color: 'white',
  },
  followButton: {
    width: 72,
  },
  followContainer: {
    width: '100%',
    height: 30,
    borderRadius: 5,
    backgroundColor: '#3493D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  followingContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DEDEDE',
  },
  followText: {
    fontWeight: 'bold',
    color: 'black',
  },
  suggestionContainer: {
    backgroundColor: '#1e2126',
    borderRadius: 15,
    marginBottom: 6,
    paddingHorizontal: 10,
  },
  suggestionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  suggestionProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '64%',
  },
  suggestionImage: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 10,
    borderColor: 'green',
    borderWidth: 2,
  },
  suggestionName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  suggestionAccount: {
    fontSize: 12,
    color: 'white',
    opacity: 0.5,
  },
  suggestionText: {
    fontSize: 12,
    color: 'white',
    opacity: 0.5,
  },
  suggestionActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: 'gray',
    padding: 6,
    borderRadius: 5,
    marginLeft: 8,
  },
  closeIcon: {
    fontSize: 14,
    color: 'white',
  },
  suggestionFooter: {
    padding: 20,
  },
  seeAllText: {
    color: '#3493D9',
    fontWeight: 'bold',
  },
});

export default Activity;
