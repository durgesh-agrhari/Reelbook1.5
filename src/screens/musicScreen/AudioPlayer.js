import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerEvents,
  Event,
  State,
} from 'react-native-track-player';

const tracks = [
  {
    id: '1',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    title: 'Track 1',
    artist: 'Artist 1',
  },
  {
    id: '2',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    title: 'Track 2',
    artist: 'Artist 2',
  },
];

const AudioPlayer = () => {
  const playbackState = usePlaybackState();
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const setup = async () => {
      await setupPlayer();
      await TrackPlayer.add(tracks);
      setCurrentTrack(tracks[0]); // Set initial track
    };
    setup();

    return () => {
      TrackPlayer.destroy(); // Cleanup
    };
  }, []);

  const playPause = async () => {
    if (playbackState === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
    const trackId = await TrackPlayer.getCurrentTrack();
    setCurrentTrack(tracks.find((t) => t.id === trackId));
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
    const trackId = await TrackPlayer.getCurrentTrack();
    setCurrentTrack(tracks.find((t) => t.id === trackId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentTrack?.title || 'Loading...'}</Text>
      <Text style={styles.artist}>{currentTrack?.artist || ''}</Text>

      <View style={styles.controls}>
        <TouchableOpacity onPress={skipToPrevious} style={styles.button}>
          <Text>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={playPause} style={styles.button}>
          <Text>{playbackState === State.Playing ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToNext} style={styles.button}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  artist: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
});

export default AudioPlayer;
