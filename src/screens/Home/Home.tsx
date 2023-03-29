/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import DB_COLLECTION from '../../utils/constants';
import {useDispatch} from 'react-redux';
import {fetchUser} from '../../redux/slices/userSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [menus] = React.useState([
    {
      key: '1',

      title: 'Common Practices',

      image: DB_COLLECTION.COMMON_PRACTICES,
    },
    {key: '2', title: 'Weather Updates', image: DB_COLLECTION.WEATHER_UPDATES},
    {key: '3', title: 'Diseage management', image: DB_COLLECTION.Dis_MAGEMENT},
    {key: '4', title: 'Govenrment schemes', image: DB_COLLECTION.GOV_SCHEMES},
    {key: '5', title: 'Farmers Corner', image: DB_COLLECTION.FARMERS_CORNER},
  ]);

  const [crops, setCropsData] = React.useState([]);

  useEffect(() => {
    getCropsData();

    dispatch(fetchUser());
  }, []); // const createUser = () => { //   const userReq = { //     city: "Pune", //     createdDate: new Date(), //     dob: new Date(), //     firstName: route?.params?.firstName, //     lastName: route?.params?.lastName, //     mobileNumber: route?.params?.mobile, //     id: auth()?.currentUser?.uid, //     pincode: 411037, //     profile: "", //     state: "Maharashtra", //     status: true, //     updatedDate: new Date() //   }; //   dispatch(addUser(userReq)); //   dispatch(fetchUser()); // } // const AllUserData = useSelector((state: RootState) => state.user.userData); // console.log(" first name in home outside ",route?.params?.firstName); // useEffect(() => { //   if (AllUserData) { //     console.log(" first name in home inside",route?.params?.firstName); //     const isAlreadyExist = AllUserData.find(u => u && u?.mobileNumber === route?.params?.mobile); //     console.log(isAlreadyExist ?  true : false); //     const res = isAlreadyExist ?  true : false; //     if (!res && route?.params?.firstName && route?.params?.lastName) { //       createUser(); //       console.log('inside'); //     } //   } // }, [])

  const getCropsData = async () => {
    try {
      const cropData = await firestore()
        .collection(DB_COLLECTION.CROP.name)
        .doc(DB_COLLECTION.CROP.id)
        .get();
      const data = await cropData._data.cropData;
      setCropsData(data);
    } catch (err) {
      console.log(err);
    }
  };
  const customNavigation = (title: any) => {
    navigation.navigate(title);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
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
              renderItem={({item}) => (
                <View
                  style={{flexDirection: 'column', marginRight: 16, flex: 1}}>
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
                        width: 80,
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
            <View
              style={{
                flex: 1,

                flexWrap: 'wrap',

                marginTop: 24,

                paddingBottom: 84,
              }}>
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
                renderItem={({item}) => (
                  <View style={{flexDirection: 'column', margin: 12, flex: 1}}>
                    <TouchableOpacity
                      onPress={() => customNavigation(item.title)}>
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
                          source={{uri: item.image}}
                          style={{
                            height: (Dimensions.get('window').width - 40) * 0.5,
                            width: (Dimensions.get('window').width - 60) * 0.5,
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          marginTop: 8,

                          width: (Dimensions.get('window').width - 60) * 0.5,
                        }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('Select Options');
          }}
          style={styles.touchableOpacityStyle}>
          <MaterialCommunityIcons
            name="message-reply-text-outline"
            color={'#FFFFFF'}
            size={33}></MaterialCommunityIcons>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },

  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },

  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },

  touchableOpacityStyle: {
    position: 'absolute',
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#464646',
    borderRadius: 27,
  },

  floatingButtonStyle: {
    width: 50,
    height: 50,
    backgroundColor: '#333333',
  },
});

export {Home};
