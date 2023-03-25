import React, {useEffect, useState,} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import auth from '@react-native-firebase/auth';
import {useNavigation, CommonActions} from '@react-navigation/native';

const Login = () => {
  const [confirm, setConfirm] = useState(null);
  const [userName, setUserName] = React.useState('');
  const [changeUsername, onChangeNumber] = React.useState('');
  const navigation = useNavigation();

  // async function signInWithPhoneNumber(phoneNumber: any) {
  //   console.log('_______ ', phoneNumber);
  //   const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  //   console.log('+++++++ ', confirmation);
  //   setConfirm(confirmation);
  // }

  return (
    <SafeAreaView>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View
          style={{
            paddingHorizontal: 16,
            width: Dimensions.get('screen').width,
            height: 50,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#EEEEEE',
            borderWidth: 0.5,
            borderColor: '#AFB1B6',
            flexDirection: 'row',
          }}>
          {/* <Ionicons
            name="chevron-back-sharp"
            size={28}
            style={{alignSelf: 'center'}}
          /> */}
          <Text style={{fontSize: 20, fontWeight: '600', marginLeft: 10}}>
            Login
          </Text>
        </View>
        <View style={{flex: 1, padding: 16, flexDirection: 'column'}}>
          <View
            style={{
              height: 200,
              width: Dimensions.get('screen').width - 32,
              borderRadius: 8,
              flexWrap: 'wrap',
              backgroundColor: '#D9D9D9',
            }}></View>
          <View
            style={{
              flex: 1,
              width: Dimensions.get('screen').width,
              alignItems: 'flex-start',
              flexDirection: 'column',
            }}>
            <Text
              style={{
                height: 22,
                fontSize: 18,
                fontWeight: '600',
                marginTop: 24,
                color: '#676767',
              }}>
              Hi Ready to get started
            </Text>
            <Text
              style={{
                height: 18,
                fontSize: 16,
                fontWeight: '400',
                marginTop: 20,
              }}>
              To login, please enter your mobile number
            </Text>
            <TextInput
              style={{
                height: 40,
                paddingLeft: 10,
                marginTop: 16,
                borderWidth: 1,
                width: Dimensions.get('screen').width - 32,
                borderRadius: 5,
              }}
              onChangeText={setUserName}
              value={userName}
              placeholder="Mobile no."></TextInput>
            <TouchableOpacity
              style={{
                backgroundColor: '#000000',
                height: 50,
                marginTop: 24,
                borderWidth: 1,
                width: Dimensions.get('screen').width - 32,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                // signInWithPhoneNumber('+1 650-555-3434'); //(userName);
                navigation.dispatch(
                  CommonActions.navigate({
                    name: 'Home',
                  }),
                );
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  alignSelf: 'center',
                  color: '#FFFFFF',
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export {Login};
