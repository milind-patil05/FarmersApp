/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {FlatList, Image, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import VideoPlayer from 'react-native-video-player';
const CommonPractices = () => {
  const [practiceData, setPracticeData] = useState([]);

  const getCommonPractices = async () => {
    try {
      const cropData = await firestore()
        .collection('crop')
        .doc('f2iUZm8wqvLNB9GFDWot')
        .get();
      const data = await cropData._data;
      const crops = await data.cropData;
      setPracticeData(crops);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCommonPractices();
  }, []);


  const renderDiseaseData = ({data}) => {
    return (
      <View
        style={{
          //   backgroundColor: '#FFF2CC',
          margin: 10,
          // borderColor: 'black',
          borderRadius: 10,
          borderWidth: 2,
        }}>
        <Text
          style={{
            // color: '#19A7CE',
            fontWeight: 'bold',
            fontSize: 17,
            padding: 8,
            textAlign: 'center',
          }}>
          {data?.name}
        </Text>
      </View>
    )
  }


  const renderData = ({item}) => {
    console.log(item?.diseases);

    return (
      <View
        style={{
          //   backgroundColor: '#FFF2CC',
          margin: 10,
          borderColor: 'black',
          borderRadius: 10,
          borderWidth: 2,
        }}>
        <Text
          style={{
            color: '#19A7CE',
            fontWeight: 'bold',
            fontSize: 17,
            padding: 8,
            textAlign: 'center',
          }}>
          {item?.crop_name}
        </Text>
        {/* <Text
          style={{padding: 8, color: 'black', fontSize: 15}}
          numberOfLines={15}>
          {item?.Description}
        </Text> */}
        {/* <Image
            source={{uri: item?.image}}
            style={{
              width: 200,
              height: 100,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          /> */}
          <FlatList
        data={item?.diseases}
        renderItem={renderDiseaseData}
        keyExtractor={data => data?.name}
      />
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={practiceData}
        renderItem={renderData}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default CommonPractices;
