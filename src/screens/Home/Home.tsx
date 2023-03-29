import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import firestore from "@react-native-firebase/firestore";

import DB_COLLECTION from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import auth from '@react-native-firebase/auth';
import { useRoute } from '@react-navigation/core';
import { addUser, fetchUser } from '../../redux/slices/userSlice';

const Home = () => {
  const [userName, setUserName] = React.useState('');
  const [changeUsername, onChangeNumber] = React.useState('');
  const route = useRoute();
  const dispatch = useDispatch();

  const [menus] = React.useState([
    { key: '1', title: 'Common Practices', image: DB_COLLECTION.COMMON_PRACTICES },
    { key: '2', title: 'Weather Updates', image: DB_COLLECTION.WEATHER_UPDATES },
    { key: '3', title: 'Diseage management', image: DB_COLLECTION.Dis_MAGEMENT },
    { key: '4', title: 'Govenrment schemes', image: DB_COLLECTION.GOV_SCHEMES },
    { key: '5', title: 'Farmers Corner', image: DB_COLLECTION.FARMERS_CORNER },
  ]);
  const [crops, setCropsData] = React.useState([]);
  useEffect(() => {
    getCropsData();
  }, [])
  const AllUserData = useSelector((state: RootState) => state.user.userData);

  useEffect(() => {
    const isAlreadyExist = AllUserData.find(u => u && u?.mobileNumber === auth()?.currentUser?.phoneNumber);
  // if(!isAlreadyExist){
  //   addUser();
  // }
  createUser();
  }, [])

  const createUser = () => {
    const userReq = {
      city: "Pune",
      createdDate: new Date(),
      dob: new Date(),
      firstName: 'Ajju',
      lastName: 'Ajju',
      mobileNumber: auth()?.currentUser?.phoneNumber,
      id: auth()?.currentUser?.uid,
      pincode: 411037,
      profile: "",
      state: "Maharashtra",
      status: true,
      updatedDate: new Date()
    };
    dispatch(addUser(userReq));
    dispatch(fetchUser());
  }
  const getCropsData = async () => {
    try {
      const cropData = await firestore().collection(DB_COLLECTION.CROP.name).doc(DB_COLLECTION.CROP.id).get();
      const data = await cropData._data.cropData;
      setCropsData(data);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'column' }}>

        <View
          style={{
            height: Dimensions.get('window').height - 60,
            backgroundColor: '#FFFFFF',
            padding: 16,
            flexDirection: 'column',
          }}>

          <View>
            <FlatList
              style={{width: Dimensions.get('window').width - 32}}
              horizontal={true}
              data={crops}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View
                  style={{ flexDirection: 'column', marginRight: 16, flex: 1 }}>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      backgroundColor: '#D9D9D9',
                      height: 80,
                      width: 80,
                      borderRadius: 4,
                      flexWrap: 'wrap',
                    }}>
                    <Image
                      source={{uri: item.image}}
                      style={{
                        height: 80,
                        width: 80
                      }}
                    />
                  </View>
                  <Text style={{marginTop: 8, width: 80}}>
                    {item.crop_name}
                  </Text>
                </View>
              )}
            />
          </View>
          <View
            style={{
              flex: 1,
              width: Dimensions.get('window').width,
              alignItems: 'flex-start',
              flexDirection: 'column',
            }}>
            <Text
              style={{
                height: 30,
                fontSize: 22,
                fontWeight: '600',
                marginTop: 24,
                color: '#000000',
              }}>
              Crop Details
            </Text>
            <View style={{ flex: 1, flexWrap: 'wrap', marginTop: 24, paddingBottom: 84 }}>
              <FlatList
                numColumns={2}
                showsVerticalScrollIndicator={false}
                style={{
                  width: Dimensions.get('window').width - 32,
                }}
                data={menus}
                keyExtractor={item => item.key}
                contentContainerStyle={{
                  flexGrow: 1,
                }}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: 'column', margin: 12, flex: 1 }}>
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        backgroundColor: '#D9D9D9',
                        height: (Dimensions.get('window').width - 40) * 0.5,
                        width: (Dimensions.get('window').width - 60) * 0.5,
                        borderRadius: 8,
                        flexWrap: 'wrap',
                      }}>
                      <Image
                        source={{ uri: item.image }}
                        style={{
                          height: (Dimensions.get('window').width - 40) * 0.5,
                          width: (Dimensions.get('window').width - 60) * 0.5
                        }} />
                    </View>
                    <Text
                      style={{
                        marginTop: 8,
                        width: (Dimensions.get('window').width - 60) * 0.5,
                      }}>
                      {item.title}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export {Home};
