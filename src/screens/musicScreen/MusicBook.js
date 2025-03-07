import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View , Dimensions, Image, FlatList, Animated} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import Slider from '@react-native-community/slider';

import songs  from '../../data/data'

const {width, height} = Dimensions.get('window')

const MusicBook = () => {
  const [songIndex, setSongIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(()=> {
    scrollX.addListener(({value})=> {
       console.log(`Scrollx : ${value} | Device width : ${width}`)
       const index = Math.round(value/width);
       setSongIndex(index);
    })
  },[])

  const rendorSongs = ({item, index}) => {
    return(
      <Animated.View style={styles.mainImageRapper}> 
        <View style={[styles.musicrapper, styles.elevation]}>
          <Image source={item.artwork} style={styles.musicImage} />
        </View>
      </Animated.View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.maincontainer}>
        {/* |image */}
        <Animated.FlatList 
         renderItem={rendorSongs}
         data={songs}
         keyExtractor={item => item.id}
         horizontal
         pagingEnabled
         showsHorizontalScrollIndicator={false}
         scrollEventThrottle={16}
         onScroll={Animated.event(
          [
            {
              nativeEvent:{
                 contentOffset : {x : scrollX},
              },
            },
          ],
          {useNativeDriver: true},
         )}
        />
        {/* song content */}
        <View>  ``
          <Text style={styles.songt}>{songs[songIndex].title}</Text>
          <Text style={styles.songa}>{songs[songIndex].artist}</Text>
        </View>
        {/* SLIDER */}
        <View>
          <Slider 
          style={styles.statusbar}
          value={10}
          minimumValue={0}
          maximumValue={100}
          thumbTintColor='#FFD369'
          minimumTrackTintColor='#FFD369'
          maximumTrackTintColor='#fff'
          onSlidingComplete={()=> {}}
          />
        </View>
        {/* music duration */}
        <View style={styles.progressLevelDuration}>
          <Text style={styles.progressLevelText}>00:00</Text>
          <Text style={styles.progressLevelText}>00:00</Text>
        </View>
       
        {/* music controls */}
        <View style={styles.musicControleContainer}>
        <TouchableOpacity>
            <Ionicons name='play-skip-back-outline' size={30} color='#FFD369'/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name='pause-circle' size={50} color='#FFD369'/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='play-skip-forward-outline' size={30} color='#FFD369'/>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomcan}>
        <View style={styles.buttomIcons} >
          <TouchableOpacity>
            <AntDesign name='hearto' size={30} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Feather name='repeat' size={30} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Entypo name='share-alternative' size={30} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Entypo name='dots-three-horizontal' size={30} />
          </TouchableOpacity>
        </View>  
      </View>
    </SafeAreaView>
  )
}

export default MusicBook

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#555'
  },
  maincontainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#22831',
    marginBottom:30,
  },
  bottomcan:{
    width:width,
    alignItems:'center',
    paddingVertical:15,
    borderTopColor:'393E46',
    borderWidth:1,
  },
  buttomIcons:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'80%',
  },
  musicrapper:{
    width:250,
    height:300,
    marginBottom:0,
  },
  musicImage:{
    borderRadius:20,
    width:'100%',
    height:'100%',
  },
  elevation:{
    elevation:5,
    shadowColor:'#ccc',
    shadowOffset:{
      width:5,
      height:5,
    },
    shadowOpacity:0.5,
    shadowRadius:3.84,

  },
  songt:{
     fontSize:18,
     fontWeight:'600',
     textAlign:'center',
     color:'#EEEEEE'
  },
  songa:{
    fontSize:15,
    fontWeight:'300',
    textAlign:'center',
    color:'#EEEEEE'
  },
  statusbar:{
    width:350,
    height:40,
    flexDirection:'row',
  },
  progressLevelDuration:{
     width:350,
     flexDirection:'row',
     justifyContent:'space-between',
  },
  progressLevelText:{
    color:'#fff',
    fontWeight:'500 '
  },
  musicControleContainer:{
    flexDirection:'row',
    alignItems:'center', 
    justifyContent:'space-between',
    width:'60%',
  },
  mainImageRapper:{
     width:width,
     justifyContent:'center',
     alignItems:'center',
  }
})