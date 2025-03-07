import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { users } from '../../data/users';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { trendingReelsData } from '../../data/trendingReelsData';
import { motivationalReelsData } from '../../data/motivationalReelsData';

const Tab = createMaterialTopTabNavigator();

const FriendProfilePost: React.FC = () => {
  const Posts: React.FC = () => (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
      <View style={styles.gridContainer}>
        {users.map((item, index) => (
          <View key={index}>
            <TouchableOpacity>
              <Image style={styles.image} source={{ uri: item.image }} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const Video: React.FC = () => (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
      <View style={styles.gridContainer}>
        {trendingReelsData.map((item, index) => (
          <View key={index}>
            <TouchableOpacity>
              <Image style={styles.videoImage} source={{ uri: item.image }} />
              <View style={styles.overlay}>
                <Image style={styles.dp} source={{ uri: item.image }} />
                <Text style={styles.overlayText}>Zone</Text>
                <View style={styles.viewCountContainer}>
                  <Text style={styles.viewCountText}>35k</Text>
                  <Feather name="eye" style={styles.eyeIcon} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const Saved: React.FC = () => (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
      <View style={styles.gridContainer}>
        {motivationalReelsData.map((item, index) => (
          <View key={index}>
            <TouchableOpacity>
              <Image style={styles.image} source={{ uri: item.image }} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: true,
          tabBarIndicatorStyle: styles.tabBarIndicator,
          tabBarIcon: ({ focused }) => {
            let iconName: string;
            let color = focused ? 'black' : 'grey';
            if (route.name === 'Posts') {
              iconName = focused ? 'grid' : 'grid-outline';
            } else if (route.name === 'Video') {
              iconName = focused ? 'play-circle' : 'play-circle-outline';
            } else {
              iconName = focused ? 'save' : 'save-outline';
            }
            return <Ionicons name={iconName} color={color} size={20} />;
          },
        })}
      >
        <Tab.Screen name="Posts" component={Posts} />
        <Tab.Screen name="Video" component={Video} />
        {/* <Tab.Screen name="Saved Video" component={Saved} /> */}
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  scrollContainer: {
    height: '100%',
    width: '100%',
  },
  gridContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-between',
    backgroundColor: 'black',
    marginBottom: 50,
  },
  image: {
    width: 142,
    height: 135,
    margin: 5,
    borderRadius: 8,
  },
  videoImage: {
    width: 142,
    height: 200,
    margin: 5,
    borderRadius: 8,
  },
  overlay: {
    position: 'absolute',
    zIndex: 10,
    flexDirection: 'row',
    padding: 6,
    bottom: 0,
  },
  dp: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  overlayText: {
    color: 'white',
    marginLeft: 2,
  },
  viewCountContainer: {
    flexDirection: 'row',
    backgroundColor: 'black',
    opacity: 0.6,
    borderRadius: 20,
    paddingRight: 5,
    alignItems: 'center',
    marginLeft: 'auto',
  },
  viewCountText: {
    color: 'white',
    marginLeft: 18,
  },
  eyeIcon: {
    fontSize: 15,
    color: 'white',
    marginLeft: 5,
  },
  tabBarIndicator: {
    backgroundColor: 'green',
    height: 5,
    borderRadius: 10,
  },
});

export default FriendProfilePost;
