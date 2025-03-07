import { Image, StyleSheet, Text, Touchable, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const Users = ({item}) => {
    const navigation = useNavigation();
    const THEME = useSelector(state=> state.theme)
  return (
     <View style={[styles.userItem, { backgroundColor: THEME.data === 'LIGHT' ? '#b4b4b8' : '#1c1c1e', marginHorizontal:10 }]}> 
          <Image source={{ uri: item.profilePicture }} style={styles.profileImage} />
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: THEME.data === 'LIGHT' ? 'black' : 'white' }]}>{item.name || 'Unknown Name'}</Text>
            <Text style={[styles.userHandle, { color: THEME.data === 'LIGHT' ? 'black' : 'white' }]}>{item.username || 'Unknown Username'}</Text>
          </View>
          <TouchableOpacity
          onPress={()=> {navigation.navigate('RequestChatRoom', {
              name: item.username,
              reciverId: item._id,
          })}}
          style={{padding:10, backgroundColor:'gray', borderRadius:10, paddingLeft:30, paddingRight:30}}>
              <Text style={{alignSelf:'center', color:'white'}}>Chat</Text>
          </TouchableOpacity>
        </View>
  )
}

export default Users

const styles = StyleSheet.create({

      searchContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        paddingVertical: 10,
        marginHorizontal: 10,
      },
      searchIcon: {
        fontSize: 30,
        opacity: 0.7,
        position: 'absolute',
        left: 20,
        zIndex: 1,
      },
      searchBar: {
        width: '100%',
        backgroundColor: '#EBEBEB',
        borderRadius: 10,
        fontSize: 15,
        padding: 10,
        paddingLeft: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        color: 'gray',
        fontWeight: '500',
      },
      userItem: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
      },
      profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
        borderWidth: 1,
        borderColor: 'gray',
      },
      userInfo: {
        flex: 1,
      },
      userName: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      userHandle: {
        fontSize: 14,
      },
})