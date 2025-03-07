import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import backendURL, { GET_All_Users } from '../../utils/Strings';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

type User = {
  id: string;
  name: string | null; // Handle cases where name might be null
  username: string | null; // Handle cases where username might be null
  profilePicture: string;
};

const SearchUsers = () => {
  const THEME = useSelector(state => state.theme)
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search query state
  const [users, setUsers] = useState<User[]>([]); // Users state
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // Filtered users for search
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchUsers();
    }
  }, [isFocused]);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${backendURL}${GET_All_Users}`);
      const data = await response.json();
      const usersList = data?.data || [];
      setUsers(usersList);
      setFilteredUsers(usersList); // Initially, show all users
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handle search query and filter users
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredUsers(users); // Reset to all users when search is empty
    } else {
      const filtered = users.filter(user => {
        const name = user.name?.toLowerCase() || ''; // Ensure name is not null
        const username = user.username?.toLowerCase() || ''; // Ensure username is not null
        return name.includes(query.toLowerCase()) || username.includes(query.toLowerCase());
      });
      setFilteredUsers(filtered);
    }
  };

  // Render each user item
  const renderItem = ({ item }: { item: User }) => (
    <View style={[styles.userItem, {backgroundColor: THEME.data == 'LIGHT' ? '#d5d7db':'#1c1c1e'}]}>
      <Image source={{ uri: item.profilePicture }} style={[styles.profileImage,{backgroundColor: THEME.data == 'LIGHT' ? 'gray':'black'}]} />
      <View style={styles.userInfo}>
        <Text style={[styles.userName,{color: THEME.data == 'LIGHT' ? 'black':'white' }]}>{item.name || 'Unknown Name'}</Text>
        <Text style={[styles.userHandle, {color: THEME.data == 'LIGHT' ? 'black':'#aaa'}]}>
          {item.username || 'Unknown Username'}, who you might know, is on Instagram
        </Text>
      </View>
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followText}>Follow</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:THEME.data == 'LIGHT' ? 'white':'black'}]}>
      <View style={styles.searchContainer}>
        <Feather name="search" color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#909090"
        />
      </View>
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    paddingHorizontal: 16,
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    marginTop: 10,
    position: 'relative',
    marginBottom:10,
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
    color: '#fff', // White text for the name
    fontSize: 16,
    fontWeight: 'bold',
  },
  userHandle: {
    fontSize: 14,
  },
  followButton: {
    backgroundColor: '#0d6efd', // Blue background for follow button
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  followText: {
    color: '#fff', // White text for follow button
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SearchUsers;