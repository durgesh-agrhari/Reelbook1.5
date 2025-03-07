import { StyleSheet, Text, Touchable, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'

const Chat = ({ item }) => {
    const navigation = useNavigation();
    const { userData } = useSelector(s => s.auth);
    const [messages, setMessages] = useState([]);
    return (
        <TouchableOpacity>
            <View style={styles.userItem}>
                <Image source={{ uri: 'https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg?cs=srgb&dl=pexels-minan1398-675920.jpg&fm=jpg' }} style={styles.profileImage} />
                <View style={styles.userInfo}>
                    <Text style={[styles.userName, { color: THEME.data === 'LIGHT' ? 'black' : 'gray' }]}>{item?.name}</Text>                    <Text style={[styles.userHandle, { color: THEME.data === 'LIGHT' ? 'black' : 'gray' }]}>chat with : {item?.name} </Text>
                </View>
                <TouchableOpacity
                    style={{ backgroundColor: 'white', borderRadius: 10, padding: 8, marginLeft: 5 }}>
                    <AntDesign name='hearto' size={25} color='red' />
                </TouchableOpacity>
            </View>

        </TouchableOpacity>
    )
}

export default Chat

const styles = StyleSheet.create({
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#d9ccf0',
        marginHorizontal: 10,
        marginTop: 5
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
})

// 2:38