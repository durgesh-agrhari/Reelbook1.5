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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
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
    image:
      'https://img.fixthephoto.com/blog/images/gallery/news_preview_mob_image__preview_883.jpg',
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
    image: 'https://i.ytimg.com/vi/NBOfvz2iaE0/maxresdefault.jpg',
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
    image:
      'https://i.pinimg.com/originals/ca/3c/6b/ca3c6b76a0f2d3708e06330354b5fae8.jpg',
    link: 'Motivation',
  },
  {
    title: 'Singing',
    image:
      'https://thumbs.dreamstime.com/b/sexy-young-girl-singer-singing-contrast-silhouette-sexy-singer-girl-singing-dancing-sexy-female-red-concert-dress-dancing-173265918.jpg',
    link: 'Motivation',
  },
  {
    title: 'Dancing',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCk6f2rhe5YhpC_tBii2RteOj39kcQRyJImA&s',
    link: 'Dancing',
  },
  {
    title: 'Nature',
    image:
      'https://5.imimg.com/data5/SELLER/Default/2023/3/TF/BK/UW/103578143/3d-nature-wallpaper-500x500.jpg',
    link: 'Motivation',
  },
  {
    title: 'God Video',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH6g7cgN9ldehh_kDnh0PF1R2xNszaQzm_SIDVGZ62SDsHLkuTNvPWHYojsGbBOwazVg4&usqp=CAU',
    link: 'Motivation',
  },
  {
    title: 'Bajan',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcGIlItZm69HFnFKh_ROr8biTG2xQu9lTWXSDK4_a6IwLqcT8f7AE9QuTXo5iR1XSUcoo&usqp=CAU',
    link: 'Motivation',
  },
  {
    title: 'Temple',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ92zihWSb5UoidrJ5NY_ih0HWXVa1V96AsQw&s',
    link: 'Motivation',
  },
];

const categoriesTrips = [
  {
    title: 'GF Talk',
    image:
      'https://t4.ftcdn.net/jpg/04/59/82/89/360_F_459828924_ANMZD5IqA4io5iAKWbK7bsPwnTmjYABC.jpg',
    link: 'Motivation',
  },
  {
    title: 'Speeking',
    image:
      'data:image/png;base64,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',
    link: 'Gym',
  },
  {
    title: 'Interview',
    image:
      'https://static.wixstatic.com/media/4383bd_f3ecb8a1c3e5427291d93fafcea2d4f9~mv2.jpg/v1/fill/w_640,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/4383bd_f3ecb8a1c3e5427291d93fafcea2d4f9~mv2.jpg',
    link: 'Motivation',
  },
  {
    title: 'Trading',
    image:
      'data:image/png;base64,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',
    link: 'Motivation',
  },
  {
    title: 'Bussines',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-bdCOESyvHbw9KspkGSrnxFW_CTA6eOPDkQ&s',
    link: 'Dancing',
  },
  {
    title: 'EarnMony',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8EeQnwM2hMvlE_GHDNTooPCQgrje48fEX2t9jsP23EBAjoALyU7_Qn2cITXX2E2k1zRc&usqp=CAU',
    link: 'Motivation',
  },
  {
    title: 'V-Editing',
    image:
      'data:image/png;base64,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',
    link: 'Motivation',
  },
  {
    title: 'SkinCare',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkwpOqBwO1rmh5dcZ9_xf6ZvfWvWGfTL_DYw&s',
    link: 'Motivation',
  },
  {
    title: 'Animay',
    image:
      'https://i.pinimg.com/236x/62/48/03/624803bee204bc2b7761449dcc502821.jpg',
    link: 'Motivation',
  },
];

const categoriesUpdate = [
  {
    title: 'Youtuber',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAXdgfVxpAQfJLpRo9WBmPZKoq3WYaDW27chTAHpqSAcN-to4v5ILwLl3Xwd8rSj69uuY&usqp=CAU',
    link: 'Motivation',
  },
  {
    title: 'FlimWorld',
    image:
      'https://inc42.com/cdn-cgi/image/quality=75/https://asset.inc42.com/2022/03/Bollywood-celebs-investing-ft-1-1-150x150.jpg',
    link: 'Gym',
  },
  {
    title: 'Magic',
    image:
      'https://media.istockphoto.com/id/537316429/photo/high-contrast-image-of-magician-hand-with-magic-wand.jpg?s=612x612&w=0&k=20&c=GbnLRDGmfQI_x9CQnOsxefKnJLxAAWHbH6PLpTuQQeY=',
    link: 'Motivation',
  },
  {
    title: 'Ai Modal',
    image:
      'https://static.vecteezy.com/system/resources/previews/033/504/750/non_2x/sexy-girl-generative-ai-free-photo.jpg',
    link: 'Motivation',
  },
  {
    title: 'Story',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi8hg5_EibznkZCY8q_FHMgEThpgUE4sQuxg&s',
    link: 'Dancing',
  },
  {
    title: 'RealityShow',
    image:
      'https://www.businessinsider.in/thumb/msid-41691688,width-1200,height-900/five-indian-reality-tv-shows-copied-from-the-west.jpg',
    link: 'Motivation',
  },
];

const CategoryVv = () => {

  const THEME = useSelector(state=> state.theme)
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

  const renderCategoryTrips = ({item}) => (
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

  const renderCategoryUpdate = ({item}) => (
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
    <SafeAreaView style={[styles.container,{backgroundColor:THEME.data == 'LIGHT' ? 'white' : '#1c1c1c'}]}>
      <FlatList
        data={[1, 1, 1, 1, 1, 1]}
        renderItem={({item, index}) => {
          return (
            <View style={{width: '100%'}}>
              {index == 0 && (
                <View style={styles.boxcatrow}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                      name="chevron-back"
                      size={30}
                      style={{marginLeft: 18, color: THEME.data == 'LIGHT' ? 'black' : 'white'}}
                    />
                  </TouchableOpacity>
                  <Text style={styles.cattitle}>Choose Video Category</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('MusicHome')}>
                    <MaterialCommunityIcons
                      name="music-circle-outline"
                      size={30}
                      style={{marginRight: 18, color:THEME.data == 'LIGHT' ? 'black' : 'white'}}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {index == 1 && (
                <View style={{marginTop: 25}}>
                  <Text style={styles.header}>
                    <Text style={{fontSize: 24, textAlign: 'center'}}>👦 </Text>{' '}
                    For Boys Category
                  </Text>
                  <FlatList
                    data={categoriesBoy}
                    renderItem={renderCategoryBoy}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    contentContainerStyle={styles.grid}
                  />
                </View>
              )}
              {index == 2 && (
                <View style={{marginTop: 50}}>
                  <Text style={styles.header}>
                    <Text style={{fontSize: 24, textAlign: 'center'}}>👩‍🦰 </Text>{' '}
                    For Girls Category
                  </Text>
                  <FlatList
                    data={categoriesGirl}
                    renderItem={renderCategoryGirl}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    contentContainerStyle={styles.grid}
                  />
                </View>
              )}
              {index == 3 && (
                <View style={{marginTop: 50}}>
                  <Text style={styles.header}>
                    <Text style={{fontSize: 24, textAlign: 'center'}}>🔥 </Text>{' '}
                    Common Category
                  </Text>
                  <FlatList
                    data={categoriesCommon}
                    renderItem={renderCategoryCommon}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    contentContainerStyle={styles.grid}
                  />
                </View>
              )}

              {index == 4 && (
                <View style={{marginTop: 50}}>
                  <Text style={styles.header}>
                    <Text style={{fontSize: 24, textAlign: 'center'}}>🤑 </Text>{' '}
                    Trips, Learning & Enjoy
                  </Text>
                  <FlatList
                    data={categoriesTrips}
                    renderItem={renderCategoryTrips}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    contentContainerStyle={styles.grid}
                  />
                </View>
              )}
              {index == 5 && (
                <View style={{marginTop: 50, marginBlock: 70}}>
                  <Text style={styles.header}>
                    <Text style={{fontSize: 24, textAlign: 'center'}}>🌐 </Text>{' '}
                    Reel Category Update
                  </Text>
                  <FlatList
                    data={categoriesUpdate}
                    renderItem={renderCategoryUpdate}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    contentContainerStyle={styles.grid}
                  />
                </View>
              )}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1c1c1c',
    // backgroundColor: 'white',
    padding: 10,
  },
  header: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: '#1d4254',
    borderRadius: 10,
    padding: 5,
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
  boxcatrow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cattitle: {
    color: 'gray',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default CategoryVv;
