import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

import InstaStory from 'react-native-insta-story';
import {useNavigation} from '@react-navigation/native';

const StoryCircle = () => {
  const navigation = useNavigation();
  const data = [
    {
      user_id: 1,
      user_image:
        'https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg',
      user_name: 'Ahmet Çağlar Durmuş',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 1 swiped'),
        },
        {
          story_id: 2,
          story_image:
            'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
        },
      ],
    },
    {
      user_id: 2,
      user_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjARhWE3A_4AEhzxqgSuxpe10DOAEg5ZaZ9pffk3f7mnhTBkxoBT3GARtsR5vMf6YfT10&usqp=CAU',
      user_name: 'Ahmet Çağlar Durmuş',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 1 swiped'),
        },
        {
          story_id: 2,
          story_image:
            'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
        },
      ],
    },
    {
      user_id: 3,
      user_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Pb9kbAyroy7cbIHu7j2hwrY-SPpm2tKX6kx8QSMvj7WY1kXK-MY-GdsKjh6cpAsRqt8&usqp=CAU',
      user_name: 'Ahmet Çağlar Durmuş',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 1 swiped'),
        },
        {
          story_id: 2,
          story_image:
            'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
        },
      ],
    },

    {
      user_id: 4,
      user_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8_b9nWL0r-i_BGKXF5YI_PTAsDfXrh8GZVQ&s',
      user_name: 'Ahmet Çağlar Durmuş',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 1 swiped'),
        },
        {
          story_id: 2,
          story_image:
            'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
        },
      ],
    },
    {
      user_id: 5,
      user_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjKEjXXV-U-ZjgAkzgODbnf9Q89IBb224ecySL5gGHsDmM-cicHJlPlmG5GVr2c35tsqo&usqp=CAU',
      user_name: 'Ahmet Çağlar Durmuş',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 1 swiped'),
        },
        {
          story_id: 2,
          story_image:
            'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
        },
      ],
    },
    {
      user_id: 6,
      user_image:
        'https://media.istockphoto.com/id/1176076166/photo/young-girls-of-indian-ethnicity-under-multicolor-umbrella.jpg?s=612x612&w=0&k=20&c=MhLyzbyk-0VIwN8rdbhNg2NwfpGseSLbnU7wZVBnKTc=',
      user_name: 'Ahmet Çağlar Durmuş',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 1 swiped'),
        },
        {
          story_id: 2,
          story_image:
            'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
        },
      ],
    },

    {
      user_id: 7,
      user_image:
        'https://media.istockphoto.com/id/1176076166/photo/young-girls-of-indian-ethnicity-under-multicolor-umbrella.jpg?s=612x612&w=0&k=20&c=MhLyzbyk-0VIwN8rdbhNg2NwfpGseSLbnU7wZVBnKTc=',
      user_name: 'Ahmet Çağlar Durmuş',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 1 swiped'),
        },
        {
          story_id: 2,
          story_image:
            'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
        },
      ],
    },

    {
      user_id: 8,
      user_image:
        'https://media.istockphoto.com/id/1176076166/photo/young-girls-of-indian-ethnicity-under-multicolor-umbrella.jpg?s=612x612&w=0&k=20&c=MhLyzbyk-0VIwN8rdbhNg2NwfpGseSLbnU7wZVBnKTc=',
      user_name: 'Ahmet Çağlar Durmuş',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 1 swiped'),
        },
        {
          story_id: 2,
          story_image:
            'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
        },
      ],
    },

    {
      user_id: 9,
      user_image:
        'https://media.istockphoto.com/id/1176076166/photo/young-girls-of-indian-ethnicity-under-multicolor-umbrella.jpg?s=612x612&w=0&k=20&c=MhLyzbyk-0VIwN8rdbhNg2NwfpGseSLbnU7wZVBnKTc=',
      user_name: 'Ahmet Çağlar Durmuş',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 1 swiped'),
        },
        {
          story_id: 2,
          story_image:
            'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
        },
      ],
    },

    {
      user_id: 10,
      user_image:
        'https://media.istockphoto.com/id/1176076166/photo/young-girls-of-indian-ethnicity-under-multicolor-umbrella.jpg?s=612x612&w=0&k=20&c=MhLyzbyk-0VIwN8rdbhNg2NwfpGseSLbnU7wZVBnKTc=',
      user_name: 'Ahmet Çağlar Durmuş',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 1 swiped'),
        },
        {
          story_id: 2,
          story_image:
            'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
        },
      ],
    },
  ];

  return (
    <View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              // flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <View>
              <Pressable>
                <Image
                  source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIN1gwlCld-PW_qX5QxwNMdPUff8gYhTOe8w&s',
                  }}
                  style={styles.StoryCircle}
                />
                <Text style={{textAlign: 'center'}}>Your Story</Text>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 15,
                    right: 1,
                    zIndex: 1,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.push('StoryPost')}>
                    <Entypo
                      name="circle-with-plus"
                      style={{
                        fontSize: 25,
                        color: '#2596be',
                        backgroundColor: 'white',
                        borderRadius: 100,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </Pressable>
            </View>

            

            <InstaStory
              data={data}
              duration={10}
              avatarSize={90}
              unPressedBorderColor={'red'}
              pressedBorderColor={'green'}
            />
            
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default StoryCircle;

const styles = StyleSheet.create({
  StoryCircle: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor:'gray',
  },
});
