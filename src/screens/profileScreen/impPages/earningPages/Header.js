import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const img =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSgwGxmWILHda21Yr8GHvvr3GDDKi8FTrojCCBJe2v2A&s';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
     <View style={{flexDirection:'row', padding:10, justifyContent:'space-between'}}>
        <TouchableOpacity onPress={()=> {navigation.goBack()}}>
          <Ionicons size={30} name='chevron-back' color='white'  />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> {navigation.goBack()}} >
          <Text style={{color:'white', fontSize:20}}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({

});
