import React from 'react'
import { Touchable, TouchableOpacity } from 'react-native'
import { Dimensions } from 'react-native'
import { FlatList, Text, View } from 'react-native'
import Video from 'react-native-video'

const Videissue = () => {
    return (
        <View style={{flex:1}}>
            <FlatList data={[
                require('../../../assets/videos/1.mp4'),
                require('../../../assets/videos/2.mp4'),
                require('../../../assets/videos/3.mp4'),
                require('../../../assets/videos/4.mp4'),
                ]}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                renderItem={({item, index})=> {
                    return(
                        <View 
                        style={{
                            width:Dimensions.get('window').width, 
                            height:Dimensions.get('window').height
                        }}>
                            <Video  style={{
                            width:Dimensions.get('window').width, 
                            height:Dimensions.get('window').height
                        }}
                        resizeMode='cover'
                        source={item}
                        />

                        {/* <TouchableOpacity style={{
                            width:Dimensions.get('window').width, 
                            height:Dimensions.get('window').height,
                            position:'absolute',
                            top:0,
                        }}>

                        </TouchableOpacity> */}
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default Videissue;