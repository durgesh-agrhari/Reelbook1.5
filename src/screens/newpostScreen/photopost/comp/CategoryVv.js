import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const categoriesBoy = [
  {
    title: 'Motivation',
    image:
      'https://i.pinimg.com/originals/fa/46/fa/fa46fabeafa02cd231b6c75a0a3a2d11.jpg',
    link: 'Motivation',
  },
  {
    title: 'Gym',
    image:
      'https://w0.peakpx.com/wallpaper/105/816/HD-wallpaper-sports-fitness-brown-eyes-brunette-girl-gym-model-woman.jpg',
    link: 'Gym',
  },
  {
    title: 'Sports',
    image: 'https://im.rediff.com/cricket/2023/jan/17kohli1.jpg?w=670&h=900',
    link: 'Motivation',
  },
  {
    title: 'Girls',
    image:
      'https://photosnow.org/wp-content/uploads/2024/04/cute-girl-pic-cartoon_17.jpg',
    link: 'Motivation',
  },
  {
    title: 'Attitude',
    image:
      'https://cdn.lazyshop.com/files/9cf1cce8-c416-4a69-89ba-327f54c3c5a0/product/166f296a084c378a004d21fcf78d04f9.jpeg?x-oss-process=style%2Fthumb',
    link: 'Motivation',
  },
  {
    title: 'Bhojpuri',
    image:
      'https://source.boomplaymusic.com/group10/M00/04/28/3230e655b91b4422bf9badcbbf9ee649_464_464.jpg',
    link: 'Motivation',
  },
  {
    title: 'Sayari',
    image:
      'https://sc0.blr1.cdn.digitaloceanspaces.com/article/153856-eamvrlxriu-1611577633.jpeg',
    link: 'Motivation',
  },
  {
    title: 'Lovemusic',
    image:
      'https://img.freepik.com/premium-photo/lofi-music-beautiful-anime-girl-listen-music_485374-1330.jpg',
    link: 'Motivation',
  },
  {
    title: 'Comedy',
    image:
      'https://imgeng.jagran.com/images/2024/05/08/article/image/thegreatindiankapilshow-1715169002824.jpg',
    link: 'Motivation',
  },
  {
    title: 'CareLover',
    image:
      'https://zeldazon.com/wp-content/uploads/2024/07/f93c5190-5a9d-4dca-9573-b082b7f28f1a-1.jpg',
    link: 'Motivation',
  },
  {
    title: 'BykeLover',
    image:
      'https://zeldazon.com/wp-content/uploads/2024/07/f93c5190-5a9d-4dca-9573-b082b7f28f1a-1.jpg',
    link: 'Motivation',
  },
  {
    title: 'Selfie Pose',
    image:
      'https://zeldazon.com/wp-content/uploads/2024/07/f93c5190-5a9d-4dca-9573-b082b7f28f1a-1.jpg',
    link: 'Motivation',
  },
];

const categoriesGirl = [
    {
      title: 'Parlour',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxWMlgfivmUvNK4Ro0IG4T-KtYWuNJbhkzZQ&s',
      link: 'Motivation',
    },
    {
      title: 'Mehndi',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfOEBJMjpR7cUI5dDRCQTbC0vfDM2jYEu3rA&s',
      link: 'Gym',
    },
    {
      title: 'Sweet Selfie',
      image: 'https://img.fixthephoto.com/blog/images/gallery/news_preview_mob_image__preview_883.jpg',
      link: 'Motivation',
    },
    {
      title: 'Nail Art',
      image:
        'https://i.pinimg.com/736x/e0/0c/81/e00c814d2820c76438efbee151e4d21e.jpg',
      link: 'Motivation',
    },
    {
      title: 'Hair Style',
      image:
        'https://i.pinimg.com/236x/82/a2/40/82a240dd15dcfd5bc84c2542662e0f75.jpg',
      link: 'Motivation',
    },
    {
      title: 'Art Sketch',
      image:
        'https://i.ytimg.com/vi/NBOfvz2iaE0/maxresdefault.jpg',
      link: 'Motivation',
    },
    {
      title: 'Cat Lover',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQevnx5C6GKq7-fprp4g7iIU9rXVrIMKBqINT8_zP_u1F_79FHp3kgH-LAwxC8QoN5uop0&usqp=CAU',
      link: 'Motivation',
    },
    {
      title: 'Dog Lover',
      image:
        'https://t4.ftcdn.net/jpg/01/16/17/35/360_F_116173569_djlZMlMzdRG1fPd71tvhJ11Y8EEopjkJ.jpg',
      link: 'Motivation',
    },
    {
      title: 'Cooking',
      image:
        'https://hips.hearstapps.com/hmg-prod/images/one-pot-meals-1616159616.jpg?crop=1.00xw:1.00xh;0,0&resize=640:*',
      link: 'Motivation',
    },
  ];


  const categoriesCommon = [
    {
      title: 'CareLover',
      image:
        'https://preview.redd.it/here-she-is-the-new-temerario-what-do-yall-think-v0-ezkkox8152jd1.jpg?width=1080&crop=smart&auto=webp&s=45dcc449b83073c44a879377600c83593bf61026',
      link: 'Motivation',
    },
    {
      title: 'BykeLover',
      image:
        'https://i.pinimg.com/236x/45/fb/f5/45fbf5364558bc1f3a155122279d8ad3.jpg',
      link: 'Gym',
    },
    {
      title: 'Salfie Pose',
      image: 'https://i.pinimg.com/originals/ca/3c/6b/ca3c6b76a0f2d3708e06330354b5fae8.jpg',
      link: 'Motivation',
    },
    {
      title: 'Nail Art',
      image:
        'https://i.pinimg.com/736x/e0/0c/81/e00c814d2820c76438efbee151e4d21e.jpg',
      link: 'Motivation',
    },
    {
      title: 'Hair Style',
      image:
        'https://i.pinimg.com/236x/82/a2/40/82a240dd15dcfd5bc84c2542662e0f75.jpg',
      link: 'Motivation',
    },
    {
      title: 'Art Sketch',
      image:
        'https://i.ytimg.com/vi/NBOfvz2iaE0/maxresdefault.jpg',
      link: 'Motivation',
    },
    {
      title: 'Cat Lover',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQevnx5C6GKq7-fprp4g7iIU9rXVrIMKBqINT8_zP_u1F_79FHp3kgH-LAwxC8QoN5uop0&usqp=CAU',
      link: 'Motivation',
    },
    {
      title: 'Dog Lover',
      image:
        'https://t4.ftcdn.net/jpg/01/16/17/35/360_F_116173569_djlZMlMzdRG1fPd71tvhJ11Y8EEopjkJ.jpg',
      link: 'Motivation',
    },
    {
      title: 'Cooking',
      image:
        'https://hips.hearstapps.com/hmg-prod/images/one-pot-meals-1616159616.jpg?crop=1.00xw:1.00xh;0,0&resize=640:*',
      link: 'Motivation',
    },
  ];
const CategoryVv = () => {
  const navigation = useNavigation();
  const renderCategoryBoy = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(item.link)}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={{marginLeft: 5}}>
          <AntDesign name="playcircleo" size={15} color="#0681bf" />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryGirl = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(item.link)}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={{marginLeft: 5}}>
          <AntDesign name="playcircleo" size={15} color="#0681bf" />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryCommon = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(item.link)}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={{marginLeft: 5}}>
          <AntDesign name="playcircleo" size={15} color="#0681bf" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.header}>
            <Text style={{fontSize: 24, textAlign: 'center'}}>👦 </Text> For
            Boys Category
          </Text>
          <FlatList
            data={categoriesBoy}
            renderItem={renderCategoryBoy}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            contentContainerStyle={styles.grid}
          />
        </View>
        <View style={{marginTop:50}}>
          <Text style={styles.header}>
            <Text style={{fontSize: 24, textAlign: 'center'}}>👩‍🦰 </Text>  For Girls Category
          </Text>
          <FlatList
            data={categoriesGirl}
            renderItem={renderCategoryGirl}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            contentContainerStyle={styles.grid}
          />
        </View>

        <View style={{marginTop:50}}>
          <Text style={styles.header}>
            <Text style={{fontSize: 24, textAlign: 'center'}}>🔥 </Text>  Common Category
          </Text>
          <FlatList
            data={categoriesCommon}
            renderItem={renderCategoryCommon}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            contentContainerStyle={styles.grid}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    padding: 10,
  },
  header: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor:'#1d4254',
    borderRadius:10,
    padding:5
  },
  grid: {
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#2c2c2c',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 105,
    height: 105,
    borderRadius: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default CategoryVv;
