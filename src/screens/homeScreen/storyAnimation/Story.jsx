import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useRef, useState } from 'react'
import { Animated, Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
const { height, width } = Dimensions.get('window')

import AntDesign from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';

const Story = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [content, setContent] = useState([
        {
            content: 'https://w0.peakpx.com/wallpaper/386/296/HD-wallpaper-korean-girl-cute-nancy-momoland-cute-nancy-nancy-momoland.jpg',
            type: 'image',
            text: 'Mysore Palace ',
            views: '120',
            finish: 0,
        },
        {
            content: 'https://videos.pexels.com/video-files/29781546/12796978_360_640_50fps.mp4',
            type: 'video',
            text: 'My story',
            views: '120',
            finish: 0,
        },
        {
            content: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT04-78c2dpC1CZWHSI_SFo9m9DzuklFJgdqfCQNxkw1Xl7V4DknmglQaXKNFYJ2YaKBzk&usqp=CAU',
            type: 'image',
            text: 'Nature Love',
            views: '256',
            finish: 0,
        },
        {
            content: 'https://videos.pexels.com/video-files/29616171/12745149_360_640_60fps.mp4',
            type: 'video',
            text: 'Video zone ',
            views: '120',
            finish: 0,
        },
        {
            content: 'https://i.pinimg.com/videos/thumbnails/originals/a5/cc/83/a5cc83aef8bc663c28f02fb867cbca13.0000000.jpg',
            type: 'image',
            // text: 'Pleaser to meet',
            views: '642k',
            finish: 0,
        },

    ]);

    const [end, setEnd] = useState(0);
    const [current, setCorrent] = useState(0);
    const [load, setLoad] = useState(false);
    const progress = useRef(new Animated.Value(0)).current;

    const start = () => {
        if(content[current].type == 'video'){
            if(load){
                Animated.timing(progress, {
                    toValue: 1,
                    duration:20000,
                    useNativeDriver: false,
                }).start(({ finished }) => {
                    if (finished) {
                        next();
                    }
                });
            }
           
        } else{
            Animated.timing(progress, {
                toValue: 1,
                duration:5000,
                useNativeDriver: false,
            }).start(({ finished }) => {
                if (finished) {
                    next();
                }
            });
        }
    };

    const play = () => {
        start(end);
    }

    const next = () => {
        if (current != content.length - 1) {
            let tempdata = content;
            tempdata[current].finish = 1;
            setContent(tempdata);
            setCorrent(current + 1)
            progress.setValue(0);
        } else {
            close();
        }
    };

    const previous = () => {
        if (current-1 >= 0) {
            let tempdata = content;
            tempdata[current].finish = 0;
            setContent(tempdata);
            progress.setValue(0);
            setCorrent(current - 1)
        } else {
            close();
        }
    };

    const close = () => {
        progress.setValue(0);
        navigation.goBack();
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            {
                content[current].type == 'video' ? (
                    <Video 
                    source={{ uri: content[current].content }} 
                    resizeMode='cover'
                    paused={false}
                    onReadyForDisplay={play()}
                    onLoad={x=> {
                        setLoad(true);
                        start();
                    }}
                    style={{ height: height, width: width }} />
                ):(
                    <Image 
                    source={{ uri: content[current].content }} 
                    onLoadEnd={()=> {
                        progress.setValue(0)
                        start()
                    }}
                    style={{ height: height, width: width }}
                    />
                )
            }
           

            <View style={{ width: width, position: 'absolute', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }}>
                {content.map((item, index) => {
                    return (
                        <View 
                        style={{ 
                            flex: 1,
                             height: 3, 
                             backgroundColor: 'rgba(255,255,255,.5)', 
                             marginLeft: 10,
                              marginTop: 10,
                              flexDirection:'row',
                              }}>
                            <Animated.View 
                            style={{ 
                                flex: current == index ? progress : content[index].finish,
                                 height: 3, 
                                //  backgroundColor: 'rgb(113, 74, 206)',
                                backgroundColor: 'rgba(255,255,255,1)',
                            }} ></Animated.View>
                        </View>
                    )
                })}

            </View>

            {/* profile and close button */}

            <View 
            style={{
                width:width,
                height:50,
                flexDirection:'row',
                justifyContent:'space-between',
                position:'absolute',
                top:30,
            }}>
                <View 
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                }}>
                    <Image source={{uri : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWkuElYV_CFghupgAQlLw6oT9Aeh3A7mm8eA&s"}}
                    style={{
                        width:40, height:40, borderRadius:20, marginLeft:20
                    }}
                    />
                  <Text style={{fontSize:16, fontWeight:'600', marginLeft:15, color:'white'}}>{route.params.name}</Text>
                </View>
                <View>
                    <TouchableOpacity style={{marginRight:20}} onPress={()=> {close();}}>
                        <AntDesign name='close' size={30} color='white'  />
                    </TouchableOpacity>
                </View>
            </View>
           
           {/* bottom view */}
            <View 
            style={{
                width:width,
                flexDirection:'row',
                justifyContent:'center',
                position:'absolute',
                alignItems:'center',
                bottom:60,
            }}>
                <View style={{
                    backgroundColor:'#95a6ad',
                    padding:10,
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                    <TouchableOpacity>
                    <Text style={{color:'white', fontSize:18, alignSelf:'center'}}>{ content[current].text}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View 
            style={{
                width:width,
                flexDirection:'row',
                justifyContent:'center',
                position:'absolute',
                alignItems:'center',
                bottom:20,
            }}>
                <View style={{
                    backgroundColor:'#223242',
                    padding:10,
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                    <TouchableOpacity>
                    <Text style={{color:'white', fontSize:18, alignSelf:'center'}}> views : { content[current].views} </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* this for left right swap code */}
            <View style={{ width: width, height, height, position: 'absolute', top: 70, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ width: '30%', height: '100%' }}
                    onPress={() => {
                        previous();
                        // if (current > 0) {
                        //     setCorrent(current - 1)
                        // }
                    }}
                ></TouchableOpacity>

                <TouchableOpacity style={{ width: '30%', height: '100%' }}
                    onPress={() => {
                        next();
                        // if (current != content.length - 1) {
                        //     setCorrent(current + 1)
                        // }
                    }}
                ></TouchableOpacity>
            </View>
        </View>
    )
}


export default Story