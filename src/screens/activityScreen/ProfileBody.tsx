import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, NavigationProp} from '@react-navigation/native';

const down =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiODO3xs7mq8iBRHM3x9OeaRZ9R-iG5cNM0ZYh1m0ZNU6JRl1w99l0ScXxq3Uc8mMCiBs&usqp=CAU';

interface ProfileBodyProps {
  name: string;
  accountName?: string;
  profileImage: string;
  post: number;
  followers: number;
  following: number;
}

export const ProfileBody: React.FC<ProfileBodyProps> = ({
  name,
  accountName,
  profileImage,
  post,
  followers,
  following,
}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View>
      {!accountName && (
        <View style={styles.profileContainer}>
          <View>
            <View style={styles.profileImageContainer}>
              <Image
                style={styles.profileBanner}
                source={{uri: profileImage}}
              />
            </View>
            <View style={styles.profileHeader}>
              <View>
                <Image
                  style={styles.profilePicture}
                  source={{uri: profileImage}}
                />
              </View>
              <View style={styles.profileNameContainer}>
                <View style={styles.profileName}>
                  <Text style={styles.nameText}>{name}</Text>
                </View>
                <View style={styles.accountName}>
                  <Text style={styles.accountNameText}>@{name}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <TouchableOpacity style={styles.statBox}>
              <Text style={styles.statNumber}>{post}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.statBox}
              onPress={() => navigation.navigate('FollowingandFollowers')}>
              <Text style={styles.statNumber}>{followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.statBox}
              onPress={() => navigation.navigate('FollowingandFollowers')}>
              <Text style={styles.statNumber}>{following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bioContainer}>
            <Text style={styles.bioText}>
              Song lover, Movie Lover, Listening music, Research new things{' '}
            </Text>
            <Text style={styles.bioText}>
              Bike lover, Movie Lover, Listening to music, Researching new
              places, food blog, roasting people{' '}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

interface ProfileButtonProps {
  id: number;
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({id}) => {
  const [follow, setFollow] = useState<boolean>(false);

  return (
    <>
      {id !== 0 && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setFollow(!follow)}
            style={styles.button}>
            <View
              style={[
                styles.followButton,
                {
                  backgroundColor: follow ? undefined : '#3493D9',
                  borderWidth: follow ? 1 : 0,
                },
              ]}>
              <Text style={styles.buttonText}>
                {follow ? 'Following' : 'Follow'}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.messageButton}>
              <Text style={styles.messageButtonText}>
                <Text style={styles.closeIcon}>X</Text> Message
              </Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <View style={styles.iconContainer}>
              <Image source={{ uri: down }} style={styles.icon} />
            </View>
          </TouchableOpacity> */}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    paddingHorizontal: 15,
  },
  profileImageContainer: {
    zIndex: 1,
    borderBottomColor: 'green',
    borderWidth: 4,
    borderRadius: 15,
  },
  profileBanner: {
    height: 100,
    width: '100%',
    borderRadius: 10,
    marginTop: 12,
    borderColor: 'gray',
    borderWidth: 4,
    zIndex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    marginTop: -60,
    zIndex: 1,
    marginLeft: 30,
  },
  profilePicture: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 20,
    borderColor: 'green',
    borderWidth: 4,
    marginBottom: 20,
  },
  profileNameContainer: {
    // flexDirection: 'row',
    marginTop: 65,
    marginLeft: 10,
    marginBottom:10,
  },
  profileName: {
    padding: 5,
  },
  nameText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  accountName: {
    padding: 5,
    opacity: 0.5,
    borderRadius: 10,
  },
  accountNameText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statBox: {
    width: 110,
    alignItems: 'center',
    backgroundColor: '#1d2620',
    borderRadius: 10,
    padding: 10,
  },
  statNumber: {
    color: 'white',
    fontSize: 18,
  },
  statLabel: {
    color: 'white',
    fontSize: 16,
  },
  bioContainer: {
    marginTop: 10,
  },
  bioText: {
    color: 'white',
    fontWeight: '300',
    marginTop: 10,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    width: '48%',
  },
  followButton: {
    width: '100%',
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#DEDEDE',
  },
  messageButton: {
    width: '100%',
    height: 35,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  messageButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  closeIcon: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
});