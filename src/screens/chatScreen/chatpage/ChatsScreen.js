import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { View ,Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux';
import Chat from './Chat';

const ChatsScreen = () => {

    const THEME = useSelector(state => state.theme)
    const navigation = useNavigation();
    const { userData } = useSelector(s => s.auth);

    const [options, setOptions] = useState(['Chats']);
    const [chats, setChats] = useState([]);
    const [requests, setRequests] = useState([]);
    // const {toaken,setToken, setUserid, userId} = useContext(AuthContext);


    const chooseOption = option => {
        if (options.includes(option)) {
            setOptions(options.filter(c => c !== option));
        } else {
            setOptions([...options, option]);
        }
    };

    // useEffect(() => {
    //     if (userData._id) {
    //         getrequest();
    //     }
    // }, [userData._id]);

    // useEffect(() => {
    //     if (userData._id) {
    //         getUser();
    //     }
    // }, [userData._id]);

    const getrequest = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/getrequests/${_id}`,)
            setRequests(response)
        } catch (error) {
            console.log("error", error)
        }
    }

    const acceptRequest = async requestId => {
        try {
            const response = await axios.post("https:3000//acceprequest", {
                userId: userData._id,
                requestId: requestId
            })

            if (response.status == 200) {
                await getrequest();
            }
        } catch (error) {
            console.log("error", error)
        }
    }


    const getUser = async () => {
        try{
             const response = await axios.post(`https:3000/user/${userId}`)
             setChats(response.data)
        }catch(error){
            console.log("error fetching user", error);
            throw error
        }
    }
    return (
        <SafeAreaView>
            <View
                style={{
                    flexDirection: 'row',
                    padding: 10,
                    gap: 10,
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }} onPress={() => { navigation.navigate('ProfileScreenc') }}>
                    <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTabqK036YDZSLo2ecQpSj7-bV_mYEqdCqrYA&s" }}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 50
                        }} />
                    <Text>All user</Text>
                </TouchableOpacity>

                <Text> Chats </Text>

                <View style={{
                    justifyContent: 'center',
                    flexDirection: 'row',
                    gap: 5,
                }}>
                    <TouchableOpacity>
                        <Feather name='plus-circle' size={30} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name='meh' size={30} color='black' />
                    </TouchableOpacity>

                </View>
            </View>

            <View style={{ padding: 10 }}>
                <TouchableOpacity
                    onPress={() => chooseOption('Chats')}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <View>
                        <Text>Chats</Text>
                    </View>
                    <Entypo name="chevron-small-down" size={20} color='black' />
                </TouchableOpacity>
            </View>

            <View>
                {
                    options?.includes('Chats') &&
                    (chats?.length > 0 ? (
                        <View>
                            {chats?.map((item, index)=> (
                                <Chat item={item} key={item?._id} />
                            ))}
                        </View>
                    ) : (
                        <View style={{
                            height: 250,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <View>
                                <Text style={{ alignSelf: 'center', color: 'gray' }}>No chat yet </Text>
                                <Text style={{ alignSelf: 'center', color: 'gray', marginTop: 4 }}>No chat yetGet started by messaging friend </Text>
                            </View>

                        </View>
                    ))
                }
            </View>

            <TouchableOpacity
                onPress={() => chooseOption('Requests')}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10 }}
            >
                <View>
                    <Text>Requests</Text>
                </View>
                <Entypo name="chevron-small-down" size={20} color='black' />
            </TouchableOpacity>

            <View style={{ marginVertical: 12 }}>
                {options?.includes("Requests") && (
                    <View>
                        <Text style={{ marginLeft: 10, fontSize: 15, color: 'green' }}>Checkout All the rfequest </Text>

                        <View style={styles.userItem}>
                            <Image source={{ uri: 'https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg?cs=srgb&dl=pexels-minan1398-675920.jpg&fm=jpg' }} style={styles.profileImage} />
                            <View style={styles.userInfo}>
                                <Text style={[styles.userName, { color: THEME.data === 'LIGHT' ? 'black' : 'gray' }]}>Mahi Panday</Text>
                                {/* <Text style={[styles.userHandle, { color: THEME.data === 'LIGHT' ? 'black' : 'gray' }]}>mahipanday</Text> */}
                                <Text style={[styles.userHandle, { color: THEME.data === 'LIGHT' ? 'black' : 'gray' }]}>message : can we connect? </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => acceptRequest(item?.from?._id)}
                                style={{ padding: 10, backgroundColor: 'gray', borderRadius: 10, paddingLeft: 15, paddingRight: 15 }}>
                                <Text style={{ alignSelf: 'center', color: 'white' }}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ backgroundColor: 'white', borderRadius: 10, padding: 8, marginLeft: 5 }}>
                                <AntDesign name='delete' size={25} color='red' />
                            </TouchableOpacity>
                        </View>

                        {requests.map((item, index) => {
                            <TouchableOpacity>
                                <View style={[styles.userItem, { backgroundColor: THEME.data === 'LIGHT' ? '#b4b4b8' : '#1c1c1e', marginHorizontal: 10 }]}>
                                    <Image source={{ uri: item.profilePicture }} style={styles.profileImage} />
                                    <View style={styles.userInfo}>
                                        <Text style={[styles.userName, { color: THEME.data === 'LIGHT' ? 'black' : 'gray' }]}>{item?.from?.name || 'Unknown Name'}</Text>
                                        <Text style={[styles.userHandle, { color: THEME.data === 'LIGHT' ? 'black' : 'gray' }]}>{item?.from?.username || 'Unknown Username'}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={{ padding: 10, backgroundColor: 'gray', borderRadius: 10, paddingLeft: 30, paddingRight: 30 }}>
                                        <Text style={{ alignSelf: 'center', color: 'white' }}>Chat</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* // for demo  */}
                                <View style={styles.userItem}>
                                    <Image source={{ uri: 'https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg?cs=srgb&dl=pexels-minan1398-675920.jpg&fm=jpg' }} style={styles.profileImage} />
                                    <View style={styles.userInfo}>
                                        <Text style={[styles.userName, { color: THEME.data === 'LIGHT' ? 'black' : 'gray' }]}>Mahi Panday{item?.from?.name}</Text>
                                        {/* <Text style={[styles.userHandle, { color: THEME.data === 'LIGHT' ? 'black' : 'gray' }]}>mahipanday</Text> */}
                                        <Text style={[styles.userHandle, { color: THEME.data === 'LIGHT' ? 'black' : 'gray' }]}>message : can we connect? {item?.message}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => acceptRequest(item?.from?._id)}
                                        style={{ padding: 10, backgroundColor: 'gray', borderRadius: 10, paddingLeft: 15, paddingRight: 15 }}>
                                        <Text style={{ alignSelf: 'center', color: 'white' }}>Accept</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ backgroundColor: 'white', borderRadius: 10, padding: 8, marginLeft: 5 }}>
                                        <AntDesign name='delete' size={25} color='red' />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        })}
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

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

export default ChatsScreen