import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import backendURL, { GET_All_Users } from '../../../utils/Strings';
import Users from './Users';

const ProfileScreenc = () => {
  const THEME = useSelector(state => state.theme);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${backendURL}${GET_All_Users}`);
      const data = await response.json();
      const usersList = data?.data || [];
      setUsers(usersList);
      setFilteredUsers(usersList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.name?.toLowerCase().includes(query.toLowerCase()) ||
        user.username?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.userItem, { backgroundColor: THEME.data === 'LIGHT' ? '#b4b4b8' : '#1c1c1e' }]}> 
      <Image source={{ uri: item.profilePicture }} style={styles.profileImage} />
      <View style={styles.userInfo}>
        <Text style={[styles.userName, { color: THEME.data === 'LIGHT' ? 'black' : 'white' }]}>{item.name || 'Unknown Name'}</Text>
        <Text style={[styles.userHandle, { color: THEME.data === 'LIGHT' ? 'black' : 'white' }]}>{item.username || 'Unknown Username'}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.data === 'LIGHT' ? 'white' : 'black' }]}> 
      <View style={styles.searchContainer}>
        <Feather name="search" color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search user for chat"
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#909090"
        />
      </View>
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id}
        // renderItem={renderItem}
        renderItem={({item, index}) => (
          <Users item={item} key={item?._id} />
       )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
});

export default ProfileScreenc;



// import React, { useContext, useEffect, useState } from 'react';
// import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
// import { users } from '../../../data/users';
// import Users from './Users';
// import { useIsFocused } from '@react-navigation/native';
// import backendURL, { GET_All_Users } from '../../../utils/Strings';

// const ProfileScreenc = () => {
//     const isFocused = useIsFocused();
//     useEffect(() => {
//         if (isFocused) {
//           fetchUsers();
//         }
//       }, [isFocused]);
    
//       // Fetch users from the backend
//       const fetchUsers = async () => {
//         try {
//           const response = await fetch(`${backendURL}${GET_All_Users}`);
//           const data = await response.json();
//           const usersList = data?.data || [];
//           setUsers(usersList);
//           setFilteredUsers(usersList); // Initially, show all users
//         } catch (error) {
//           console.error('Error fetching users:', error);
//         }
//       };
    
//     return(
//         <SafeAreaView>
//             <View>
//                 <Text style={{alignSelf:'center', fontSize:20, padding:5}}>Puple using signal</Text>
//             </View>
//             <FlatList data={users} 
//                 renderItem={({item, index}) => (
//                 <Users item={item} key={item?._id} />
//             )}
//              />
//         </SafeAreaView>
//     )
// }

// export default ProfileScreenc