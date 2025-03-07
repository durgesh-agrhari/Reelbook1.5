import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import PermissionsPage from './PermissionsPage';
import NoCameraDeviceError from './NoCameraDeviceError';

const VideoRecorder = () => {
  //   const {hasPermission, requestPermission} = useCameraPermission();
  //   const {hasPermission, requestPermission} = useMicrophonePermission();

  const device = useCameraDevice('back');
  const {hasPermission} = useCameraPermission();

  if (!hasPermission) return <PermissionsPage />;
  if (device == null) return <NoCameraDeviceError />;

  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
};

export default VideoRecorder;

const styles = StyleSheet.create({});
