import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProfileVP = () => {
  const [activeTab, setActiveTab] = useState('Reels');

  const reels = [
    { id: '1', views: '1.8M', image: 'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg' },
    { id: '2', views: '45.5K', image: 'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg' },
    { id: '3', views: '68.5K', image: 'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg' },
    { id: '4', views: '1.9M', image: 'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg' },
    { id: '5', views: '4.2M', image: 'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg' },
    { id: '6', views: '465K', image: 'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg' },
    { id: '7', views: '465K', image: 'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg' },
    { id: '8', views: '465K', image: 'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg' },
    { id: '9', views: '465K', image: 'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg' },
    { id: '10', views: '465K', image: 'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg' },
    { id: '11', views: '1.8M', image: 'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg' },
    { id: '12', views: '45.5K', image: 'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg' },
  ];

  const posts = [
    { id: '1', image: 'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg' },
    { id: '2', image: 'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg' },
    { id: '3', image: 'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg' },
  ];

  const tagged = [
    { id: '1', image: 'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg' },
    { id: '2', image: 'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg' },
  ];

  const renderReel = ({ item }) => (
    <TouchableOpacity style={styles.reelContainer}>
      <Image source={{ uri: item.image }} style={styles.reelImage} />
      {activeTab === 'Reels' && <Text style={styles.views}>{item.views}</Text>}
    </TouchableOpacity>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Reels':
        return (
          <FlatList
            data={reels}
            renderItem={renderReel}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={styles.grid}
            showsVerticalScrollIndicator={false}
          />
        );
      case 'Posts':
        return (
          <FlatList
            data={posts}
            renderItem={renderReel}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={styles.grid}
            showsVerticalScrollIndicator={false}
          />
        );
      case 'Tagged':
        return (
          <FlatList
            data={tagged}
            renderItem={renderReel}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={styles.grid}
            showsVerticalScrollIndicator={false}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.topBar}>
        <MaterialIcons name="grid-view" size={24} color="white" />
        <Text style={styles.title}>Profile</Text>
        <MaterialIcons name="camera-alt" size={24} color="white" />
      </View>

      {/* Top Tab Menu */}
      <View style={styles.tabMenu}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab('Reels')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'Reels' ? 'white' : 'gray' },
            ]}
          >
            Reels
          </Text>
          {activeTab === 'Reels' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab('Posts')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'Posts' ? 'white' : 'gray' },
            ]}
          >
            Posts
          </Text>
          {activeTab === 'Posts' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab('Tagged')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'Tagged' ? 'white' : 'gray' },
            ]}
          >
            Tagged
          </Text>
          {activeTab === 'Tagged' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      </View>

      {/* Content */}
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topBar: {
    height: 50,
    backgroundColor: '#121212',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  tabMenu: {
    flexDirection: 'row',
    backgroundColor: '#121212',
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
  grid: {
    padding: 5,
  },
  reelContainer: {
    flex: 1,
    margin: 5,
    position: 'relative',
    aspectRatio: 9 / 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  reelImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  views: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderRadius: 5,
  },
});

export default ProfileVP;










// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
// } from 'react-native';
// import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';

// const ProfileVP = () => {
//   const reels = [
//     { id: '1', views: '1.8M', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThFeLElF48T6McgTDVz6k2-O72RDm07s9Mdg&s' },
//     { id: '2', views: '45.5K', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThFeLElF48T6McgTDVz6k2-O72RDm07s9Mdg&s' },
//     { id: '3', views: '68.5K', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThFeLElF48T6McgTDVz6k2-O72RDm07s9Mdg&s' },
//     { id: '4', views: '1.9M', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThFeLElF48T6McgTDVz6k2-O72RDm07s9Mdg&s' },
//     { id: '5', views: '4.2M', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThFeLElF48T6McgTDVz6k2-O72RDm07s9Mdg&s' },
//     { id: '6', views: '465K', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThFeLElF48T6McgTDVz6k2-O72RDm07s9Mdg&s' },
//   ];

//   const renderReel = ({ item }) => (
//     <TouchableOpacity style={styles.reelContainer}>
//       <Image source={{ uri: item.image }} style={styles.reelImage} />
//       <Text style={styles.views}>{item.views}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Top App Bar */}
//       <View style={styles.topBar}>
//         <MaterialIcons name="grid-view" size={24} color="white" />
//         <Text style={styles.title}>Reels</Text>
//         <MaterialIcons name="camera-alt" size={24} color="white" />
//       </View>

//       {/* Reels Grid */}
//       <FlatList
//         data={reels}
//         renderItem={renderReel}
//         keyExtractor={(item) => item.id}
//         numColumns={3}
//         contentContainerStyle={styles.grid}
//         showsVerticalScrollIndicator={false}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   topBar: {
//     height: 50,
//     backgroundColor: '#121212',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15,
//   },
//   title: {
//     fontSize: 18,
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   grid: {
//     padding: 5,
//   },
//   reelContainer: {
//     flex: 1,
//     margin: 5,
//     position: 'relative',
//     aspectRatio: 9 / 16, // Ensures a 9:16 aspect ratio for videos
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
// });

// export default ProfileVP;
