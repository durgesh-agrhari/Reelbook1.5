import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from './Header';
import {Divider, Image} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
const img =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSgwGxmWILHda21Yr8GHvvr3GDDKi8FTrojCCBJe2v2A&s';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const EarningDestboard = () => {
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
    <SafeAreaView style={{flex: 1, backgroundColor:  THEME.data == 'LIGHT' ? 'white' : 'black'}}>
      {/* <Header /> */}
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
          <Ionicons size={30} name="arrow-back-outline" style={{color: THEME.data == 'LIGHT' ? 'black' : 'white'}} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={{color: THEME.data == 'LIGHT' ? 'black' : 'white', fontSize: 20}}>Back</Text>
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
            marginTop:10
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={{uri: img}} style={styles.imgav} />
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: THEME.data == 'LIGHT' ? 'black' : 'white'}}>
                Hi, {userData?.name}
              </Text>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: THEME.data == 'LIGHT' ? 'black' : 'white'}}>
                Your Performance
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.btn}>
            <Text style={{color:THEME.data == 'LIGHT' ? 'black' : 'white'}}>My Transactions</Text>
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
              Your Earning
            </Text>
            <Text style={{color: 'white', fontSize: 32, fontWeight: 'bold'}}>
              $1475.
              <Text
                style={{
                  color: 'white',
                  fontSize: 22,
                  fontWeight: 'bold',
                  opacity: 0.7,
                }}>
                00
              </Text>
            </Text>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Wihdraw')}
              style={{
                backgroundColor: 'green',
                borderRadius: 10,
                borderRightWidth: 2,
                borderLeftWidth: 2,
                borderColor: 'gold',
                padding: 5,
                paddingLeft: 5,
                paddingRight: 5,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                {' '}
                <Text style={{color: 'gold', fontWeight: 'bold', fontSize: 18}}>
                  ${' '}
                </Text>
                Withdraw
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <View style={{alignItems: 'center'}}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2OFGTX_S9j3Xgg8EQUj_nHbWeJs6wsdW5VBwKRfn6MHctItE2_zJO5DTtFopGnbm1BzY&usqp=CAU',
                }}
                style={{
                  width: 100,
                  height: 50,
                  borderRadius: 5,
                }}
              />
            </View>
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
                  Payout
                </Text>
                <Text style={{fontWeight: 'bold', fontSize: 14}}>
                  $ {data.rupies}
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
            Rules For Monitazation
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
                Step 1 : Uploade 50 Sort Video and 30 pictures
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
                Step 2 : 1 hours daily activity require
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View
              style={{
                paddingVertical: 10,
                marginHorizontal: 15,
                backgroundColor: '#227023',
                borderRadius: 10,
                borderWidth: 2,
                borderColor: 'white',
                paddingLeft: 10,
                marginTop: 15,
                opacity: 0.8,
              }}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
                Step 3 : Video must be not voilated Policey
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
                Step 4 : Dont't upload sexul content.
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
                Step 5 : Now you are aligibal for earning.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EarningDestboard;

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
