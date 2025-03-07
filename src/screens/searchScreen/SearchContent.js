import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const SearchContent = ({navigation}) => {
  const searchData = [
    {
      id: 0,
      images: [
        require('../../assets/pictures/p1.png'),
        require('../../assets/pictures/p2.png'),
        require('../../assets/pictures/p3.png'),
        require('../../assets/pictures/p4.png'),
        require('../../assets/pictures/p5.png'),
        require('../../assets/pictures/p6.png'),
      ],
    },
    {
      id: 1,
      images: [
        require('../../assets/pictures/p7.png'),
        require('../../assets/pictures/p8.png'),
        require('../../assets/pictures/p3.png'),
        require('../../assets/pictures/p4.png'),
        require('../../assets/pictures/p5.png'),
        require('../../assets/pictures/p1.png'),
      ],
    },
    {
      id: 2,
      images: [
        require('../../assets/pictures/p1.png'),
        require('../../assets/pictures/p6.png'),
        require('../../assets/pictures/p3.png'),
      ],
    },
  ];
  return (
    <View>
      {searchData.map((data, index) => {
        return (
          <View key={index}>
            {data.id === 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  marginHorizontal: 5,
                }}>
                {data.images.map((imageData, imgIndex) => {
                  return (
                    <TouchableOpacity key={imgIndex}>
                      <Image
                        source={imageData}
                        style={{
                          width: 150,
                          height: 175,
                          marginBottom: 5,
                        }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
            {data.id === 1 ? (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: 310,
                    justifyContent: 'space-between',
                  }}>
                  {data.images.slice(0, 4).map((imageData, imgIndex) => {
                    return (
                      <TouchableOpacity key={imgIndex}>
                        <Image
                          source={imageData}
                          style={{
                            width: 145,
                            height: 175,
                            marginBottom: 5,
                            marginRight: 5,
                          }}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <TouchableOpacity>
                  <Image
                    source={data.images[5]}
                    style={{
                      width: 150,
                      height: 350,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
            {data.id === 2 ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}>
                <TouchableOpacity>
                  <Image
                    source={data.images[2]}
                    style={{width: 305, height: 350}}
                  />
                </TouchableOpacity>
                <View
                  style={{flexDirection: 'row', flexWrap: 'wrap', width: 145}}>
                  {data.images.slice(0, 2).map((imageData, imgIndex) => {
                    return (
                      <TouchableOpacity key={imgIndex}>
                        <Image
                          source={imageData}
                          style={{width: 150, height: 170, marginBottom: 5}}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
};

export default SearchContent;
