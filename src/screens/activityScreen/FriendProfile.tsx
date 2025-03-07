import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {ProfileBody, ProfileButton} from './ProfileBody';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
//avinash

interface FriendProfileProps {
  route: {
    params: {
      name: string;
      accountName: string;
      profileImage: string;
      post: number;
      followers: number;
      following: number;
    };
  };
  navigation: {
    goBack: () => void;
  };
}

const FriendProfile: React.FC<FriendProfileProps> = ({route, navigation}) => {
  const {name, accountName, profileImage, post, followers, following} =
    route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={30}
            color="white"
            style={{marginLeft: 0, marginTop: 0}}
          />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>{name}</Text>
          <Entypo
            name="dots-three-vertical"
            size={22}
            color="white"
            style={{marginLeft: 0, marginTop: 0}}
          />
        </View>
      </View>
      <ProfileBody
        name={name}
        accountName={accountName}
        profileImage={profileImage}
        post={post}
        followers={followers}
        following={following}
      />
      <ProfileButton id={1} />
      <View style={styles.spacer}></View>

      {/* <FriendProfilePost /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 12,
    width: '100%',
    height: '100%',
    padding: 10,
  },
  header: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '92%',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  dotIcon: {
    width: 25,
    height: 25,
  },
  spacer: {
    margin: 6,
  },
});

export default FriendProfile;
