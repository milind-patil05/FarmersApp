import React from 'react';
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, CommonActions} from '@react-navigation/native';

function SelectOptions() {
   const navigation = useNavigation();
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingVertical: 18,
        flexDirection:'column',
        paddingHorizontal: 16,
      }}>
      <Text style={{fontSize: 16, color: '#111111', fontWeight: 400}}>
        Select the option to create a new post:
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 16,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          width: width - 32,
          padding: 10,
          borderRadius: 5,
          backgroundColor: '#FFFFFF',
          elevation: 5,
          alignSelf: 'center',
        }}
        onPress={() => {
          navigation.navigate('Take Photo');
        }}>
        <View
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              height: 52,
              width: 52,
              borderRadius: 26,
              backgroundColor: '#DEDEDE',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <EntypoIcon name="camera" size={30} color={'#111111'}></EntypoIcon>
          </View>
        </View>
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <Text
            style={{
              fontSize: 15,
              flexWrap: 'wrap',
              color: '#552222',
              fontWeight: 400,
            }}>
            Take a picture of the disease and get a solution
          </Text>
        </View>
        <View
          style={{
            flex: 0.1,
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <EntypoIcon
            name="chevron-right"
            size={32}
            color={'#333333'}></EntypoIcon>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginTop: 16,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          width: width - 32,
          padding: 10,
          borderRadius: 5,
          backgroundColor: '#FFFFFF',
          elevation: 5,
          alignSelf: 'center',
        }}>
        <View
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              height: 52,
              width: 52,
              borderRadius: 26,
              backgroundColor: '#DEDEDE',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcon name="android-messages" size={34} color={'#111111'}></MaterialCommunityIcon>
          </View>
        </View>
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <Text
            style={{
              fontSize: 15,
              flexWrap: 'wrap',
              color: '#552222',
              fontWeight: 400,
            }}>
            Take a picture of the disease and get a solution
          </Text>
        </View>
        <View
          style={{
            flex: 0.1,
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <EntypoIcon
            name="chevron-right"
            size={32}
            color={'#333333'}></EntypoIcon>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export {SelectOptions};
