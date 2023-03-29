import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {useNavigation, CommonActions} from '@react-navigation/native';
import DB_COLLECTION from '../../utils/constants';
import FirebaseApp from '@react-native-firebase/app';
import OtpInputs from 'react-native-otp-inputs';
import {addUser, fetchUser} from '../../redux/slices/userSlice';
import {SnackBar} from '../../toast/SnackBar';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const Login = () => {
  const navigation = useNavigation();
  const [confirm, setConfirm] = useState(null);
  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();
  const AllUserData = useSelector((state: RootState) => state.user.userData);
  const [isExist, setIsExist] = useState(false);
  // Handle login
  // function onAuthStateChanged(user: any) {
  //   if (user) {
  //     // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
  //     // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
  //     // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
  //     // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
  //     if (user?.uid !== '') {
  //       navigation.dispatch(
  //         CommonActions.reset({
  //           index: 1,
  //           routes: [{ name: 'Home' }],
  //         }),
  //       );
  //     }
  //   }
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber: any) {

    const reg = /^\+?([0-9]{2})\)?[789]\d{9}$/;
    if (reg.test('+91' + phoneNumber) === false) {
      setInvalidPhoneNumber(true);
    } else {
      const isAlreadyExist = AllUserData.find(
        u => u && u?.mobileNumber === '+91' + phoneNumber,
      );
      setIsExist(isAlreadyExist ? true : false);
      const confirmation = await auth(FirebaseApp.app()).signInWithPhoneNumber(
        '+91' + phoneNumber,
      );
      setConfirm(confirmation);
    }
  }

  async function confirmCode() {
    try {
      await confirm?.confirm(code).then(res => {
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 1,
        //     routes: [{ name: 'Home' }],
        //   }),
        // );

        const userReq = {
          city: 'Pune',
          createdDate: new Date(),
          dob: new Date(),
          firstName: firstName,
          lastName: lastName,
          mobileNumber: phoneNumber,
          id: res?.uid,
          pincode: 411037,
          profile: '',
          state: 'Maharashtra',
          status: true,
          updatedDate: new Date(),
        };
        dispatch(addUser(userReq));

        console.log(userReq);
        navigation.navigate('Home');
      });
    } catch (error) {
      SnackBar('Invalid code, Please enter correct OTP for Login');
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
            }}>
            <Image
              source={{uri: DB_COLLECTION.LOGIN}}
              style={{
                height: 200,
                width: Dimensions.get('screen').width - 32,
              }}
            />
          </View>
          {!confirm ? (
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
                // onEndEditing={()=>{
                //   if(phoneNumber.length === 0 || phoneNumber.length=== 13){
                //     setInvalidPhoneNumber(false);
                //   }
                // }}
                value={phoneNumber}
                placeholder="Mobile no."></TextInput>
              {phoneNumber.length !== 0 &&
                phoneNumber.length === 10 &&
                invalidPhoneNumber === true && (
                  <KeyboardAvoidingView>
                    <Text
                      style={{
                        height: 14,
                        fontSize: 10,
                        fontWeight: '400',
                        marginTop: 1,
                        color: '#FF0000',
                      }}>
                      *please enter valid mobile number. e.g. 8379888926
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
                  // navigation.navigate("Home")
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
                onPress={() => {}}>
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
          ) : (
            <View
              style={{
                width: Dimensions.get('screen').width,
                alignItems: 'flex-start',
                flexDirection: 'column',
              }}>
              {!isExist && (
                <View>
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
                    onChangeText={value => setFirstName(value)}
                    value={firstName}
                    placeholder="First name"
                  />
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
                    onChangeText={value => setLastName(value)}
                    value={lastName}
                    placeholder="Last name"
                  />
                </View>
              )}

              <View
                style={{
                  marginTop: isExist ? 0 : 150,
                }}>
                <Text
                  style={{
                    height: 24,
                    fontSize: 18,
                    fontWeight: '600',
                    // paddingBottom: 5,
                    color: '#000000',
                  }}>
                  Verification Code
                </Text>
                <Text
                  style={{
                    height: 20,
                    fontSize: 16,
                    fontWeight: '400',
                    marginTop: 55,
                  }}>
                  To login, please enter OTP sent via SMS
                </Text>
              </View>
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
                    marginTop: 28,
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
                    !isExist &&
                    firstName?.length > 0 &&
                    lastName?.length > 0 &&
                    code?.length === 6
                      ? confirmCode()
                      : isExist && code?.length === 6
                      ? confirmCode()
                      : SnackBar(
                          'Please enter First name, Last Name & OTP for Login.',
                        );
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '600',
                      alignSelf: 'center',
                      color: '#FFFFFF',
                    }}>
                    Verify OTP
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export {Login};
