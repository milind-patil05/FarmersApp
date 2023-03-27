import React, {useState, useEffect} from 'react';
import {Dimensions, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, CommonActions} from '@react-navigation/native';

function Comment() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            backgroundColor: '#EEEEEE',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: 50,
              borderWidth: 1,
              borderRadius: 25,
              borderColor: '#AAAAAA',
              alignSelf: 'flex-start',
              justifyContent: 'center',
              width: Dimensions.get('screen').width - 85,
              marginLeft: 16,
            }}>
            <View
              style={{
                height: 40,
                borderRadius: 25,
                alignSelf: 'flex-start',
                width: 40,
                backgroundColor: '#CCCCCC',
                marginLeft: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesomeIcon
                name="user"
                size={22}
                color={'#FFFFFF'}></FontAwesomeIcon>
            </View>
          </View>
          <View
            style={{
              height: 50,
              borderRadius: 25,
              alignSelf: 'flex-start',
              width: 50,
              backgroundColor: '#00006D',
              marginLeft: 10,
            }}></View>
        </View>
      </View>
    </View>
  );
}

export {Comment};
