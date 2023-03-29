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
    {key: '5', title: 'Mandi Rates', image: DB_COLLECTION.FARMERS_CORNER},
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

  const data = {
    "central": [
      {
        "id": 1,
        "name": "Adhan Mantri Fasal Bima Yojana",
        "description": "This is a crop insurance scheme that provides financial support to farmers in case of crop failure due to natural calamities, pests, or diseases."
      },
      {
        "id": 2,
        "name": "PM-Kisan Samman Nidhi Yojana",
        "description": "Under this scheme, the government provides financial assistance of Rs. 6,000 per year to small and marginal farmers in three installments."
      },
      {
        "id": 3,
        "name": "National Agriculture Market (e-NAM)",
        "description": "This is an online trading platform for agricultural produce that helps farmers get better prices for their produce by enabling them to sell directly to buyers."
      },
      {
        "id": 4,
        "name": "Soil Health Card Scheme",
        "description": "This scheme provides farmers with information about the health of their soil and the nutrients it needs, helping them make informed decisions about fertilizers and other inputs."
      },
      {
        "id": 5,
        "name": "Rashtriya Krishi Vikas Yojana",
        "description": "This is a centrally sponsored scheme that provides financial assistance to states for the development of agriculture and allied sectors."
      },
      {
        "id": 6,
        "name": "Pradhan Mantri Kisan Sampada Yojana",
        "description": "This scheme aims to create modern infrastructure for food processing and value addition, which can help increase the income of farmers."
      },
      {
        "id": 7,
        "name": "Kisan Credit Card Scheme",
        "description": "This scheme provides farmers with access to credit at an affordable rate of interest, helping them finance their agricultural operations"
      },
      {
        "id": 8,
        "name": "Paramparagat Krishi Vikas Yojana",
        "description": "This scheme promotes organic farming by providing financial assistance to farmers for the adoption of organic farming practices."
      },
      {
        "id": 9,
        "name": "Dairy Entrepreneurship Development Scheme",
        "description": "This scheme provides financial assistance to entrepreneurs for setting up dairy farms and milk processing units"
      },
      {
        "id": 10,
        "name": "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
        "description": "This scheme aims to provide irrigation facilities to farmers to increase their productivity and income"
      },
      {
        "id": 11,
        "name": "National Food Security Mission (NFSM)",
        "description": "This mission aims to increase the production of rice, wheat, and pulses through various interventions such as seed distribution, training, and demonstrations."
      },
      {
        "id": 12,
        "name": "Interest Subvention Scheme for Kisan Credit Card (KCC) holders",
        "description": "This scheme provides farmers with short-term loans at a subsidized interest rate of 7% per annum."
      }
    ],
    "Maharastra": [
      {
        "id": 1,
        "name": "Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY)",
        "description": "This scheme provides health insurance to farmers and their families. It covers medical expenses up to Rs. 1.5 lakh per family per year."
      },
      {
        "id": 2,
        "name": "Baliraja Chetana Abhiyan",
        "description": "This scheme aims to improve the livelihood of small and marginal farmers by providing them with financial assistance, training, and agricultural inputs."
      },
      {
        "id": 3,
        "name": "Chief Minister's Water Conservation Programme",
        "description": "This scheme aims to conserve and manage water resources in the state by promoting the construction of farm ponds, wells, and water harvesting structures."
      },
      {
        "id": 4,
        "name": "Maharashtra State Agriculture Marketing Board (MSAMB)",
        "description": "The MSAMB provides facilities for the marketing of agricultural produce and assists farmers in getting better prices for their crops."
      },
      {
        "id": 5,
        "name": "Maharashtra State Cooperative Marketing Federation (MARKFED)",
        "description": "The MARKFED provides market support to farmers by procuring their produce and ensuring fair prices."
      },
      {
        "id": 6,
        "name": "Krishi Sanjivani Yojana",
        "description": "This scheme aims to promote organic farming and provide farmers with subsidies for the purchase of organic fertilizers and pesticides."
      },
      {
        "id": 7,
        "name": "Mukhyamantri Krishi Sanjivani Yojana",
        "description": "This scheme aims to improve the productivity and income of farmers by providing them with subsidies for the purchase of agricultural equipment, seeds, and fertilizers."
      }
    ],
    "MP": [
      {
        "id": 1,
        "name": "Mukhyamantri Kisan Kalyan Yojana",
        "description": "This scheme aims to provide financial assistance to farmers in case of crop loss due to natural calamities, pests, or diseases. Under this scheme, farmers are provided with a compensation of up to Rs. 10,000 per acre."
      },
      {
        "id": 2,
        "name": "Mukhyamantri Krishak Samriddhi Yojana",
        "description": "This scheme aims to improve the income and livelihood of farmers by providing them with financial assistance and technical support. Under this scheme, farmers are provided with a grant of up to Rs. 25,000 per hectare for various agricultural activities."
      },
      {
        "id": 3,
        "name": "Bhavantar Bhugtan Yojana",
        "description": "This scheme aims to ensure that farmers get a minimum support price for their crops. Under this scheme, farmers are paid the difference between the market price and the minimum support price for their crops."
      },
      {
        "id": 4,
        "name": "Krishi Rin Samadhan Yojana",
        "description": "This scheme aims to provide relief to farmers who are in debt by providing them with a loan waiver of up to Rs. 2 lakh."
      },
      {
        "id": 5,
        "name": "Mukhyamantri Yuva Udyami Yojana",
        "description": "This scheme aims to promote entrepreneurship among the youth of the state. Under this scheme, young entrepreneurs are provided with financial assistance and technical support to start their own businesses."
      },
      {
        "id": 6,
        "name": "Mukhyamantri Krishak Sahayata Yojana",
        "description": "This scheme aims to provide financial assistance to farmers for the purchase of agricultural inputs such as seeds, fertilizers, and pesticides."
      },
      {
        "id": 7,
        "name": "Mukhyamantri Khet Tirth Yojana",
        "description": "This scheme aims to provide farmers with training and exposure visits to learn about new agricultural practices and technologies."
      }
    ]
  };

  useEffect(() => {
        // updateUser()
    //     adddata();
      }, [])

//   async function adddata() {
//      return await firestore().collection("GOV_SCHEME").add(data);
// }

  const customNavigation = (title: any) => {
    if(title != 'Weather Updates' && title != 'Diseage management')
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
