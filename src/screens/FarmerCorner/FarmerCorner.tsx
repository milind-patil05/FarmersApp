import {Dimensions, FlatList, Image, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import VideoPlayer from 'react-native-video-player';
const CommonPractices = () => {
  const [practiceData, setPracticeData] = useState([]);

  // const getCommonPractices = async () => {
  //   try {
  //     const cropData = await firestore()
  //       .collection('mandi_rates')
  //       .doc('PsnYUAV1lXD5O9Oh7l8A')
  //       .get();
  //     const data = await cropData?._data;
  //     const ratesData = await data?.RatesData;
  //     console.log(ratesData);
  //     setPracticeData(ratesData);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   // getCommonPractices();
  // }, []);

  const data = [
    {
      "id":1,
      "commodity": "Carrot",
      "date": "24-03-2023",
      "state": "Maharashtra",
      "image":"https://firebasestorage.googleapis.com/v0/b/farmersapp-a5a13.appspot.com/o/carret.jpg?alt=media&token=4e178089-fda2-4076-b4e8-f7b2c6585749",
      "metaData" : [
      {
        "id":1,
      "district": "Pune",
      "market": "Khed(Chakan)",
      "max_rate": "Rs. 1,500/Quintal",
      "min_rate": "Rs. 1,000/Quintal"
      },
    {
      "id":2,
      "district": "Ahmednagar",
      "market": "Shrirampur",
      "max_rate": "Rs. 2,000/Quintal",
      "min_rate": "Rs. 1,000/Quintal"
    },
    {
      "id":3,
      "district": "Ahmednagar",
      "market": "Rahata",
      "max_rate": "Rs. 1,500/Quintal",
      "min_rate": "Rs. 1,500/Quintal"
    },
    {
      "id":4,
      "district": "Satara",
      "market": "Satara",
      "max_rate": "Rs. 1,800/Quintal",
      "min_rate": "Rs. 1,500/Quintal"
    },
    {
      "id":5,
      "district": "Mumbai",
      "market": "Mumbai",
      "max_rate": "Rs. 2,600/Quintal",
      "min_rate": "Rs. 1,800/Quintal"
    },
    {
      "id":6,
      "district": "Pune",
      "market": "Pune(Moshi)",
      "max_rate": "Rs. 2,000/Quintal",
      "min_rate": "Rs. 1,000/Quintal"
    },
    {
      "id":7,
      "district": "Pune",
      "market": "Pune",
      "max_rate": "Rs. 1,500/Quintal",
      "min_rate": "Rs. 800/Quintal"
    }
    ]
    }
  ];
  
  const renderMetaData = ({item}) => {
    return (
      <View
        style={{
          margin: 10,
          borderColor: 'black',
          borderRadius: 10,
          borderWidth: 2,
        }}>  
        <Text
          style={{padding: 8, color: 'black', fontSize: 15}}
          numberOfLines={15}>
          Max Rate : {item?.min_rate}
        </Text>
        <Text
          style={{padding: 8, color: 'black', fontSize: 15}}
          numberOfLines={15}>
          Max Rate : {item?.min_rate}
        </Text>
        <Text
          style={{padding: 8, color: 'black', fontSize: 15}}
          numberOfLines={15}>
          Market: {item?.market}
        </Text>
        <Text
          style={{padding: 8, color: 'black', fontSize: 15}}
          numberOfLines={15}>
          District : {item?.district}
        </Text>
      </View>
    );
  }

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
          {item?.commodity}
        </Text>
        <Image
            source={{uri: item?.image}}
            style={{
              width: Dimensions.get('screen').width - 32,
              height: 200,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
        <Text
          style={{padding: 8, color: 'black', fontSize: 15}}
          numberOfLines={15}>
          Date : {item?.date}
        </Text>
        <Text
          style={{padding: 8, color: 'black', fontSize: 15}}
          numberOfLines={15}>
          State : {item?.state}
        </Text>
        <FlatList
        data={item?.metaData}
        renderItem={renderMetaData}
        keyExtractor={(meta) => meta?.id}
      />
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderData}
        keyExtractor={(item) => item?.id}
      />
    </View>
  );
};

export default CommonPractices;
