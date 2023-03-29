import {FlatList, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import VideoPlayer from 'react-native-video-player';
const CommonPractices = () => {
  const [practiceData, setPracticeData] = useState([]);

  const getCommonPractices = async () => {
    try {
      const cropData = await firestore()
        .collection('GOV_SCHEME')
        .doc('WrvJEpk8cA437Yp1tbES')
        .get();
      const data = await cropData._data;
      setPracticeData(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCommonPractices();
  }, []);

  const renderData = ({item}) => {
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
          {item?.name}
        </Text>

        <Text
          style={{padding: 8, color: 'black', fontSize: 15}}
          numberOfLines={15}>
          {item?.description}
        </Text>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={practiceData?.central}
        renderItem={renderData}
        keyExtractor={item => item.id}
      />
      <FlatList
        data={practiceData?.Maharashtra}
        renderItem={renderData}
        keyExtractor={item => item.id}
      />
      <FlatList
        data={practiceData?.MP}
        renderItem={renderData}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default CommonPractices;
