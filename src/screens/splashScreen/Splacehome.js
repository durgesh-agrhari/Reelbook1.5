import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import Splash from './Splash';
import BottomTab from '../../components/BottomTab';

const Splacehome = () => {
  const [isSplace, setIsSplace] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsSplace(false);
    }, 3000);
  });
  return <>{isSplace ? <Splash /> : <BottomTab />}</>;
};

export default Splacehome;

const styles = StyleSheet.create({});
