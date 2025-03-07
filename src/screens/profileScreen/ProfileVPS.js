import React, {useState} from 'react';
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
import { useSelector } from 'react-redux';

const ProfileVPS = () => {

  const THEME = useSelector(state=> state.theme)
  const [activeTab, setActiveTab] = useState('Reels');

  const reels = [
    {
      id: '1',
      views: '1.8M',
      image:
        'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg',
    },
    {
      id: '2',
      views: '45.5K',
      image:
        'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg',
    },
    {
      id: '3',
      views: '68.5K',
      image:
        'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg',
    },
    {
      id: '4',
      views: '1.9M',
      image:
        'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg',
    },
    {
      id: '5',
      views: '4.2M',
      image:
        'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg',
    },
    {
      id: '6',
      views: '465K',
      image:
        'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg',
    },
  ];

  const posts = [
    {
      id: '1',
      image:
        'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg',
    },
    {
      id: '2',
      image:
        'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg',
    },
    {
      id: '3',
      image:
        'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg',
    },
  ];

  const tagged = [
    {
      id: '1',
      image:
        'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg',
    },
    {
      id: '2',
      image:
        'https://gsmintro.net/user/images/wallpaper_images/2023/08/9/www.mobilesmspk.net_cute-girl_5538.jpg',
    },
  ];

  const renderReel = ({item}) => (
    <TouchableOpacity style={styles.reelContainer}>
      <Image source={{uri: item.image}} style={styles.reelImage} />
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
            keyExtractor={item => item.id}
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
            keyExtractor={item => item.id}
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
            keyExtractor={item => item.id}
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

      {/* Top Tab Menu */}
      <View style={styles.tabMenu}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab('Reels')}>
          <Text
            style={[
              styles.tabText,
              {color: activeTab === 'Reels' ? '#5536ba' : 'gray'},
            ]}>
            Reels
          </Text>
          {activeTab === 'Reels' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab('Posts')}>
          <Text
            style={[
              styles.tabText,
              {color: activeTab === 'Posts' ? '#5536ba' : 'gray'},
            ]}>
            Posts
          </Text>
          {activeTab === 'Posts' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab('Tagged')}>
          <Text
            style={[
              styles.tabText,
              {color: activeTab === 'Tagged' ? '#5536ba' : 'gray'},
            ]}>
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
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  topBar: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  tabMenu: {
    flexDirection: 'row',
    backgroundColor: 'white',
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

export default ProfileVPS;
