import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {useNavigation, CommonActions} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [confirm, setConfirm] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);
  // Handle login
  function onAuthStateChanged(user: any) {
    if (user) {
      console.log('##### ', user);
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
      if (user?.uid !== '') {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Home'}],
          }),
        );
      }
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber: any) {
    console.log('_______ ', phoneNumber);
    const reg = /^\+?([0-9]{2})\)?[789]\d{9}$/;
    if (reg.test(phoneNumber) === false) {
      setInvalidPhoneNumber(true);
      console.log('false');
    } else {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      navigation.navigate('Verify');
    }
  }

  return (
    <SafeAreaView>
      <View style={{flexDirection: 'column'}}>
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
              width: Dimensions.get('screen').width,
              alignItems: 'flex-start',
              flexDirection: 'column',
            }}>
            <Text
              style={{
                height: 24,
                fontSize: 18,
                fontWeight: '600',
                marginTop: 24,
                color: '#000000',
              }}>
              Hi Ready to get started ?
            </Text>
            <Text
              style={{
                height: 20,
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
              maxLength={13}
              returnKeyType={'done'}
              onChangeText={setPhoneNumber}
              onEndEditing={()=>{
                if(phoneNumber.length === 0 || phoneNumber.length=== 13){
                  setInvalidPhoneNumber(false);
                }
              }}
              value={phoneNumber}
              placeholder="Mobile no."></TextInput>
            {phoneNumber.length !== 0 && invalidPhoneNumber === true && (
              <KeyboardAvoidingView>
                <Text
                  style={{
                    height: 14,
                    fontSize: 10,
                    fontWeight: '400',
                    marginTop: 1,
                    color: '#FF0000',
                  }}>
                  *please enter valid mobile number. e.g. +918379888926
                </Text>
              </KeyboardAvoidingView>
            )}
            <TouchableOpacity
              style={{
                backgroundColor: '#000000',
                height: 50,
                marginTop: 20,
                borderWidth: 1,
                width: Dimensions.get('screen').width - 32,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                signInWithPhoneNumber(phoneNumber);
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  alignSelf: 'center',
                  color: '#FFFFFF',
                }}>
                Request OTP
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 18,
                marginTop: 8,
                width: Dimensions.get('screen').width - 32,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                console.log('Terms and Condition');
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  alignSelf: 'center',
                  color: '#000000',
                  textDecorationLine: 'underline',
                  textDecorationColor: '#000000',
                }}>
                Terms & Conditions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export {Login};
