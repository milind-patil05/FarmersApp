import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {useNavigation, CommonActions} from '@react-navigation/native';
import OtpInputs from 'react-native-otp-inputs';
import {useRoute} from '@react-navigation/native';
import DB_COLLECTION from '../../utils/constants';
import {useTranslation} from 'react-i18next';

const Verify = () => {
  const {t} = useTranslation();
  const route = useRoute();

  const navigation = useNavigation();
  // If null, no SMS has been sent
  // const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // Handle login
  function onAuthStateChanged(user: any) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Home'}],
        }),
      );
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  async function confirmCode() {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Home'}],
      }),
    );

    // console.log('$$ ', code);
    // try {
    //   console.log(route?.params?.confirm);
    //   let a = await route?.params?.confirm?.confirm(code);
    //   console.log('&&&&& ', a);
    // } catch (error) {
    //   // navigation.dispatch(
    //   //   CommonActions.reset({
    //   //     index: 1,
    //   //     routes: [{name: 'Home'}],
    //   //   }),
    //   // );
    //   console.log('Invalid code.');
    // }
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
            }}>
            <Image
              source={{uri: DB_COLLECTION.LOGIN}}
              style={{
                height: 200,
                width: Dimensions.get('screen').width - 32,
              }}
            />
          </View>
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
              {t('VERIFICATIONCODE')}
            </Text>
            <Text
              style={{
                height: 20,
                fontSize: 16,
                fontWeight: '400',
                marginTop: 20,
              }}>
              {t('TOLOGIN')}
            </Text>
            <View style={{height: 100}}>
              <OtpInputs
                handleChange={code => {
                  setCode(code);
                }}
                numberOfInputs={6}
                autofillFromClipboard={true}
                inputStyles={{
                  borderColor: '#000000',
                  marginHorizontal: 4,
                  borderWidth: 1,
                  fontSize: 18,
                  paddingLeft: 10,
                  paddingRight: 4,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                style={{
                  borderColor: '#000000',
                  flexDirection: 'row',
                  marginTop: 8,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
                autoFocus={true}
              />
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
                  confirmCode();
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    alignSelf: 'center',
                    color: '#FFFFFF',
                  }}>
                  {t('VERIFYOTP')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export {Verify};
