import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BottomTabBarHeightContext} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/homeScreen/HomeScreen';
import Motivation from '../screens/reelsScreen/reelsCategorys/BoysCategory/Motivation';
import {useInstaContext} from '../context/InstaContext';
import ProfileScreen from '../screens/profileScreen/ProfileScreen';
import Loginform from '../screens/authScreen/login/Loginform';
import ReelsScreen from '../screens/reelsScreen/ReelsScreen';
import CategoryVv from '../screens/reelsScreen/CategoryVv';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const THEME = useSelector(state => state.theme)
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const {userToken} = useInstaContext();

  const getData = () => {
    setIsLoggedIn(userToken != null);
  };

  useEffect(() => {
    getData();
  }, [userToken]);

  const renderTabIcon = (icon, label, focused, IconComponent) => (
    <View style={styles.iconContainer}>
      {
        THEME.data == 'LIGHT'? (<IconComponent
          name={icon}
          size={20}
          color={focused ? 'black' : '#5536ba'}
        />):(<IconComponent
          name={icon}
          size={20}
          color={focused ? 'white' : '#5536ba'}
        />)
      }
      {
        THEME.data == 'LIGHT'? (<Text style={[styles.iconText, {color: focused ? 'black' : '#5536ba'}]}>
          {label}
        </Text>):(<Text style={[styles.iconText, {color: focused ? 'white' : '#5536ba'}]}>
        {label}
      </Text>)
      }
      
    </View>
  );

  return (
    <BottomTabBarHeightContext.Consumer>
      {tabBarHeight => (
        <Tab.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: [styles.tabBarStyle,{backgroundColor:THEME.data == 'LIGHT'? 'white':'black'}],
          }}>
          <Tab.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              tabBarIcon: ({focused}) =>
                renderTabIcon(
                  focused ? 'home' : 'home-outline',
                  'Home',
                  focused,
                  Ionicons,
                ),
            }}
          />
          <Tab.Screen
            name="ReelsScreen"
            component={ReelsScreen}
            options={{
              tabBarIcon: ({focused}) =>
                renderTabIcon(
                  focused ? 'play' : 'playcircleo',
                  'Feeds',
                  focused,
                  AntDesign,
                ),
            }}
          />
          <Tab.Screen
            name="CategoryVv"
            component={CategoryVv}
            options={{
              tabBarIcon: ({focused}) =>
                renderTabIcon(
                  focused ? 'explore' : 'find',
                  'Explore',
                  focused,
                  focused ? MaterialIcons : AntDesign,
                ),
            }}
          />
          <Tab.Screen
            name="Motivation"
            component={Motivation}
            options={{
              tabBarIcon: ({focused}) =>
                renderTabIcon(
                  focused ? 'fire' : 'fire',
                  'Motivation',
                  focused,
                  focused ? Fontisto : SimpleLineIcons,
                ),
            }}
          />
          <Tab.Screen
            name="ProfileScreen"
            component={isLoggedIn ? ProfileScreen : Loginform}
            options={{
              tabBarIcon: ({focused}) =>
                renderTabIcon(
                  focused ? 'account-circle' : 'account-circle-outline',
                  'Profile',
                  focused,
                  MaterialCommunityIcons,
                ),
            }}
          />
        </Tab.Navigator>
      )}
    </BottomTabBarHeightContext.Consumer>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    height: 60,
    backgroundColor: 'white',
    paddingBottom: 2,
    paddingTop: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingTop: 8,
    width: 100,
  },
  iconText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default BottomTab;
