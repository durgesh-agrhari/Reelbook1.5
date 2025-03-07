import {createContext, useContext, useEffect, useState} from 'react';
import backendURL from '../utils/Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setAuthData} from '../redux/AuthSlice';
// import {useDispatch} from 'react-redux';
// import {setAuthData} from '../redux/AuthSlice';

const InstaContext = createContext();

const USER_TOKEN = 'tokenab';

const InstaState = ({children}) => {
  const [name, setname] = useState('');
  const [userToken, setuserToken] = useState(null);
  const dispatch = useDispatch();
  // const dispatch = useDispatch();

  useEffect(() => {
    checkToken();
  }, []);

  const changeName = name => {
    setname(name);
  };

  const checkToken = async () => {
    const token = await AsyncStorage.getItem(USER_TOKEN);
    setuserToken(token);
    dispatch(setAuthData(token));
  };

  const removeToken = async () => {
    setuserToken(null);
    dispatch(setAuthData(null));
    await AsyncStorage.removeItem(USER_TOKEN);
  };

  const userLogin = (fdata, setloader, setErrormsg, navigation) => {
    fetch(`${backendURL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fdata),
    })
      .then(res => res.json())
      .then(async data => {
        if (data.error) {
          setloader(false);
          setErrormsg(data.error);
          if (data.email == 'email does not match') {
            setErrormsg(data.error);
          } else {
            setErrormsg(data.error);
          }
        } else {
          setloader(false);
          // alert('Login successfuly');
          // dispatch(setAuthData(data.data));
          await AsyncStorage.setItem(USER_TOKEN, data.data, () => {
            checkToken();
          });
          // let token = await AsyncStorage.getAllKeys()
          // AsyncStorage.setItem('isLoggedIn', json.stringify(true));
          // setuserToken(token);
          navigation.navigate('BottomTab');
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <InstaContext.Provider
      value={{
        name,
        changeName,
        userLogin,
        checkToken,
        userToken,
        setuserToken,
        removeToken,
      }}>
      {children}
    </InstaContext.Provider>
  );
};

export const useInstaContext = () => {
  return useContext(InstaContext);
};

export default InstaState;
