import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
const img =
  'https://emojiisland.com/cdn/shop/products/Sad_Face_Emoji_large.png?v=1571606037';

const img1 =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSgwGxmWILHda21Yr8GHvvr3GDDKi8FTrojCCBJe2v2A&s';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import { Divider } from 'react-native-elements';
const YourActivity = () => {
  const navigation = useNavigation();
  const {userData} = useSelector(s => s.auth);
  const THEME  = useSelector(state=>state.theme)
  const data = [
    {
      rupies: 234,
    },
    {
      rupies: 234,
    },
    {
      rupies: 234,
    },
    {
      rupies: 234,
    },
    {
      rupies: 234,
    },
    {
      rupies: 234,
    },
    {
      rupies: 234,
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: THEME.data == 'LIGHT' ? 'white' : 'black'}}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons size={30} name= "arrow-back-outline" style={{color: THEME.data == 'LIGHT' ? 'black' : 'white'}} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={{color:THEME.data == 'LIGHT' ? 'black' : 'white', fontSize: 20}}>Back</Text>
        </TouchableOpacity>
      </View>
       <Divider width={1} />
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 80,
            alignItems: 'center',
            paddingHorizontal: 20,
            marginTop: 10,
            // marginBottom: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={{uri: img1}} style={styles.imgav} />
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: THEME.data == 'LIGHT' ? 'black' : 'white'}}>
                Hi, {userData.name}
              </Text>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: THEME.data == 'LIGHT' ? 'black' : 'white'}}>
                Your Activity
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text style={{color: THEME.data == 'LIGHT' ? 'black' : 'white'}}>Total Time</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.earnigbox}>
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
                opacity: 0.6,
              }}>
              Your Activity on App
            </Text>
            <Text style={{color: 'white', fontSize: 32, fontWeight: 'bold'}}>
              2 hours : {''}
              <Text
                style={{
                  color: 'white',
                  fontSize: 22,
                  fontWeight: 'bold',
                  opacity: 0.7,
                }}>
                33 minits
              </Text>
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.map((data, index) => (
              <View style={styles.subbox} key={index}>
                <Text
                  style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>
                  Last Month
                </Text>
                <Text
                  style={{
                    color: 'blue',
                    fontWeight: 'bold',
                    fontSize: 14,
                    opacity: 0.7,
                  }}>
                  Activity
                </Text>
                <Text style={{fontWeight: 'bold', fontSize: 14}}>
                  {data.rupies} hours
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: 15,
              marginTop: 15,
              color: THEME.data == 'LIGHT' ? 'black' : 'white',
            }}>
            Increase your activity and earn more money
          </Text>
          <TouchableOpacity>
            <View
              style={{
                paddingVertical: 10,
                marginHorizontal: 15,
                backgroundColor: '#2b303b',
                borderRadius: 10,
                borderWidth: 2,
                borderColor: 'white',
                paddingLeft: 10,
                marginTop: 30,
                opacity: 0.8,
              }}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
                Good Job
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View
              style={{
                paddingVertical: 10,
                marginHorizontal: 15,
                backgroundColor: '#2b303b',
                borderRadius: 10,
                borderWidth: 2,
                borderColor: 'white',
                paddingLeft: 10,
                marginTop: 15,
                opacity: 0.8,
              }}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
                You are lucky on who is using this app
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default YourActivity;

const styles = StyleSheet.create({
  earnigbox: {
    margin: 10,
    backgroundColor: '#242120',
    padding: 5,
    paddingLeft: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subbox: {
    margin: 10,
    backgroundColor: 'gray',
    width: 100,
    height: 80,
    padding: 10,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 2,
  },

  imgav: {
    width: 60,
    height: 60,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 100,
    borderColor: 'gray',
  },
  btn: {
    borderColor: 'gray',
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
});
