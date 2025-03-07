import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import backendURL, { GET_All_Users } from '../../utils/Strings';

const ChatTabs = () => {
  const THEME = useSelector(state => state.theme);
  const [activeTab, setActiveTab] = useState('Chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchUsers();
    }
  }, [isFocused]);

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
      const filtered = users.filter(user => {
        const name = user.name?.toLowerCase() || '';
        const username = user.username?.toLowerCase() || '';
        return name.includes(query.toLowerCase()) || username.includes(query.toLowerCase());
      });
      setFilteredUsers(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.userItem, { backgroundColor: THEME.data === 'LIGHT' ? '#b4b4b8' : '#1c1c1e' }]}> 
      <Image source={{ uri: item.profilePicture }} style={[styles.profileImage, { backgroundColor: THEME.data === 'LIGHT' ? 'gray' : 'black' }]} />
      <View style={styles.userInfo}>
        <Text style={[styles.userName, { color: THEME.data === 'LIGHT' ? 'black' : 'white' }]}>{item.name || 'Unknown Name'}</Text>
        <Text style={[styles.userHandle, { color: THEME.data === 'LIGHT' ? 'black' : 'white' }]}>{item.username || 'Unknown Username'}</Text>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Chats':
        return <Text style={{ color: THEME.data === 'LIGHT' ? 'black' : 'white', textAlign: 'center' }}>No Chats yet</Text>;
      case 'Request':
        return (
          <View>
            <View style={styles.searchContainer}>
              <Feather name="search" color="gray" style={styles.searchIcon} />
              <TextInput
                style={styles.searchBar}
                placeholder="Search user for chat ....."
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
          </View>
        );
      case 'All Users':
        return (
          <View>
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
              renderItem={renderItem}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.data === 'LIGHT' ? 'white' : 'black' }]}> 
      <View style={styles.tabMenu}>
        {['Chats', 'Request', 'All Users'].map(tab => (
          <TouchableOpacity key={tab} style={styles.tab} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, { color: activeTab === tab ? 'green' : 'gray' }]}>{tab}</Text>
            {activeTab === tab && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  tabIndicator: {
    marginTop: 5,
    height: 2,
    width: 30,
    backgroundColor: 'white',
    borderRadius: 1,
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

export default ChatTabs;


// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   ListRenderItem,
//   TextInput,
// } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {Divider} from 'react-native-elements';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';
// import Entypo from 'react-native-vector-icons/Entypo';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { useIsFocused } from '@react-navigation/native';
// import backendURL, { GET_All_Users } from '../../utils/Strings';
// import { useSelector } from 'react-redux';


// type ChatItem = {
//   id: string;
//   views?: string;
//   image: string;
// };

// type User = {
//   id: string;
//   name: string | null; // Handle cases where name might be null
//   username: string | null; // Handle cases where username might be null
//   profilePicture: string;
// };

// type Tab = 'Chats' | 'Request' | 'All Users';

// const ChatTabs: React.FC = () => {
//   const THEME = useSelector(state=> state.theme)
//   const [activeTab, setActiveTab] = useState<Tab>('Chats');

//   const [searchQuery, setSearchQuery] = useState<string>(''); // Search query state
//   const [users, setUsers] = useState<User[]>([]); // Users state
//   const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // Filtered users for search
//   const isFocused = useIsFocused();

//   useEffect(() => {
//     if (isFocused) {
//       fetchUsers();
//     }
//   }, [isFocused]);

//   // Fetch users from the backend
//   const fetchUsers = async () => {
//     try {
//       const response = await fetch(`${backendURL}${GET_All_Users}`);
//       const data = await response.json();
//       const usersList = data?.data || [];
//       setUsers(usersList);
//       setFilteredUsers(usersList); // Initially, show all users
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   // Handle search query and filter users
//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     if (query.trim() === '') {
//       setFilteredUsers(users); // Reset to all users when search is empty
//     } else {
//       const filtered = users.filter(user => {
//         const name = user.name?.toLowerCase() || ''; // Ensure name is not null
//         const username = user.username?.toLowerCase() || ''; // Ensure username is not null
//         return (
//           name.includes(query.toLowerCase()) ||
//           username.includes(query.toLowerCase())
//         );
//       });
//       setFilteredUsers(filtered);
//     }
//   };

//   // Render each all user 
//   const renderItem = ({item}: {item: User}) => (
//     <View style={[styles.userItem,{backgroundColor:THEME.data == 'LIGHT' ? '#b4b4b8' : '#1c1c1e'}]}>
//       <Image source={{uri: item.profilePicture}} style={[styles.profileImage, {backgroundColor:THEME.data == 'LIGHT' ? 'gray' : 'black'}]} />
//       <View style={styles.userInfo}>
//         <Text style={[styles.userName,{color:THEME.data == 'LIGHT' ? 'black' : 'white'}]}>{item.name || 'Unknown Name'}</Text>
//         <Text style={[styles.userHandle,{color:THEME.data == 'LIGHT' ? 'black' : 'white'}]}>
//           {item.username || 'Unknown Username'}
//         </Text>
//         <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', marginTop:-5}}>
//           <View>
//             <Entypo name="dot-single" color="green" style={{fontSize: 30, marginLeft:-10}} />
//           </View>
//           <View >
//             <Text style={{color: 'green', marginLeft:-5}}>Online</Text>
//           </View>
//         </View>
//       </View>
//       <TouchableOpacity style={styles.messageButton}>
//         <Text style={styles.messageText}>Message</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.followButton}>
//         <Text style={styles.followText}>Follow</Text>
//       </TouchableOpacity>
//     </View>
//   );


//   const renderReel: ListRenderItem<ChatItem> = ({ item }) => (
//     <TouchableOpacity style={styles.reelContainer}>
//       <Image source={{ uri: item.image }} style={styles.reelImage} />
//       {activeTab === 'Chats' && item.views && (
//         <Text style={styles.views}>{item.views}</Text>
//       )}
//     </TouchableOpacity>
//   );

//     // Render each user item
//     const renderUserRequest = ({item}: {item: User}) => (
//       <View style={[styles.userItem, {backgroundColor:THEME.data == 'LIGHT' ? '#b4b4b8' : '#1c1c1e'}]}>
//         <Image source={{uri: item.profilePicture}} style={[styles.profileImage, {backgroundColor:THEME.data == 'LIGHT' ? 'gray' : 'black'}]} />
//         <View style={styles.userInfo}>
//           <Text style={[styles.userName, {color:THEME.data == 'LIGHT' ? 'black' : 'white'}]}>{item.name || 'Unknown Name'}</Text>
//           <Text style={[styles.userHandle, {color:THEME.data == 'LIGHT' ? 'black' : 'white'}]}>
//             {item.username || 'Unknown Username'}
//           </Text>
//           <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', marginTop:-5}}>
//             <View>
//               <Entypo name="dot-single" color="green" style={{fontSize: 30, marginLeft:-10}} />
//             </View>
//             <View >
//               <Text style={{color: 'green', marginLeft:-5}}>Online</Text>
//             </View>
//           </View>
//         </View>
        
//         <TouchableOpacity style={styles.acceptrequest}>
//           <Text style={styles.followText}>Accept request</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.delete}>
//           <AntDesign name='delete' size={30} color='#d9165a' />
//         </TouchableOpacity>
//       </View>
//     );

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'Chats':
//         return (
//           <View>
//             <Text style={{ color: THEME.data == 'LIGHT' ? 'black' : 'white', textAlign: 'center', marginTop: 150 }}>No Chats yet</Text>
//             <Text style={{ color: THEME.data == 'LIGHT' ? 'black' : 'white', textAlign: 'center', marginBottom: 10 }}>Get started by messaging a friend</Text>
//           </View>
//         );
//       case 'Request':
//         return (
//           <View>
//            <View style={styles.searchContainer}>
//             <Feather name="search" color="gray" style={styles.searchIcon} />
//             <TextInput
//               style={styles.searchBar}
//               placeholder="Search for accept request"
//               value={searchQuery}
//               onChangeText={handleSearch}
//               placeholderTextColor="#909090"
//             />
//           </View>
//           <FlatList
//             data={filteredUsers}
//             keyExtractor={item => item.id}
//             renderItem={renderUserRequest}
//           />
//           </View>
//         );
//       case 'All Users':
//         return (
//           <View>
//             {/* Uncomment FlatList below to display all users */}
//             <View style={styles.searchContainer}>
//             <Feather name="search" color="gray" style={styles.searchIcon} />
//             <TextInput
//               style={styles.searchBar}
//               placeholder="Search user for chat"
//               value={searchQuery}
//               onChangeText={handleSearch}
//               placeholderTextColor="#909090"
//             />
//           </View>
//           <FlatList
//             data={filteredUsers}
//             keyExtractor={item => item.id}
//             renderItem={renderItem}
//           />
//           </View>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <SafeAreaView style={[styles.container,{backgroundColor:THEME.data == 'LIGHT' ? 'white' : 'black'}]}>
//       {/* Top Tab Menu */}
//       <View style={styles.tabMenu}>
//         <TouchableOpacity
//           style={styles.tab}
//           onPress={() => setActiveTab('Chats')}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               { color: activeTab === 'Chats' ? 'white' : 'gray' },
//             ]}
//           >
//             Chats
//           </Text>
//           {activeTab === 'Chats' && <View style={styles.tabIndicator} />}
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.tab}
//           onPress={() => setActiveTab('Request')}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               { color: activeTab === 'Request' ? 'white' : 'gray' },
//             ]}
//           >
//             Request
//           </Text>
//           {activeTab === 'Request' && <View style={styles.tabIndicator} />}
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.tab}
//           onPress={() => setActiveTab('All Users')}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               { color: activeTab === 'All Users' ? 'white' : 'gray' },
//             ]}
//           >
//             All Users
//           </Text>
//           {activeTab === 'All Users' && <View style={styles.tabIndicator} />}
//         </TouchableOpacity>
//       </View>

//       {/* Content */}
//       {renderContent()}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   tabMenu: {
//     flexDirection: 'row',
//     backgroundColor: '#121212',
//     justifyContent: 'space-around',
//     borderBottomWidth: 1,
//     borderBottomColor: 'gray',
//   },
//   tab: {
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   tabText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   tabIndicator: {
//     marginTop: 5,
//     height: 2,
//     width: 30,
//     backgroundColor: 'white',
//     borderRadius: 1,
//   },
//   grid: {
//     padding: 5,
//   },
//   reelContainer: {
//     flex: 1,
//     margin: 5,
//     position: 'relative',
//     aspectRatio: 9 / 16,
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   reelImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   views: {
//     position: 'absolute',
//     bottom: 10,
//     left: 10,
//     color: 'white',
//     fontSize: 14,
//     fontWeight: 'bold',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     padding: 5,
//     borderRadius: 5,
//   },
//   // container: {
//   //   flex: 1,
//   //   backgroundColor: '#000', // Black background
//   //   paddingHorizontal: 16,
//   // },
//   searchContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '95%',
//     paddingVertical: 10,
//     marginTop: 10,
//     position: 'relative',
//     marginBottom:10,
//     marginHorizontal:10
//   },
//   searchIcon: {
//     fontSize: 30,
//     opacity: 0.7,
//     position: 'absolute',
//     left: 20,
//     zIndex: 1,
//   },
//   searchBar: {
//     width: '100%',
//     backgroundColor: '#EBEBEB',
//     borderRadius: 10,
//     fontSize: 15,
//     padding: 10,
//     paddingLeft: 50,
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     color: 'gray',
//     fontWeight: '500',
    
//   },
//   userItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     backgroundColor: '#1c1c1e', // Dark background for the user item
//     borderRadius: 8,
//     marginHorizontal:10
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 12,
//     backgroundColor: 'black',
//     borderWidth: 1,
//     borderColor: 'gray',
//   },
//   userInfo: {
//     flex: 1,
//   },
//   userName: {
//     color: '#fff', // White text for the name
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   userHandle: {
//     color: '#aaa', // Gray text for the username and additional info
//     fontSize: 14,
//   },
//   followButton: {
//     backgroundColor: '#0d6efd', // Blue background for follow button
//     borderRadius: 4,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     marginLeft: 8,
//   },
//   acceptrequest:{
//     backgroundColor: '#16239c', // Blue background for follow button
//     borderRadius: 4,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//   },
//   messageButton: {
//     backgroundColor: 'gray', // Blue background for follow button
//     borderRadius: 4,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//   },
//   delete: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//   },
//   followText: {
//     color: '#fff', // White text for follow button
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   messageText: {
//     color: '#fff', // White text for follow button
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 10,
//   },
//   hederText: {
//     color: 'white',
//     fontWeight: '700',
//     fontSize: 18,
//     marginRight: 30,
//   },
// });

// export default ChatTabs;
