import React from 'react';
import { Text, TouchableOpacity, View, Linking } from 'react-native';
import {
  CommonActions,
  useNavigation,
  DrawerActions,
} from '@react-navigation/native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { createAsyncThunk } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';

function DrawerContent() {
  const navigation = useNavigation();

  const userSignOut = () => {
    return auth()
      .signOut()
      .then(result => {
        navigation.dispatch(DrawerActions.closeDrawer());
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'Login' }],
          }),
        );
      });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 45,
        paddingLeft: 45,
      }}>
      <IoniconsIcon
        name="md-close"
        size={36}
        onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
        style={{ alignSelf: 'flex-end', paddingRight: 45 }}
      />
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
          navigation.navigate('Settings');
        }}>
        <IoniconsIcon name="settings-sharp" size={26} color={'#000000'} />
        <Text
          style={{
            fontSize: 18,
            alignSelf: 'center',
            marginLeft: 12,
            color: '#000000',
          }}>
          Settings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', marginTop: 24 }}
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
          navigation.navigate('Profile');
        }}>
        <FontAwesomeIcon name="user" size={26} color={'#000000'} />
        <Text
          style={{
            fontSize: 18,
            alignSelf: 'center',
            marginLeft: 12,
            color: '#000000',
          }}>
          Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flexDirection: 'row', marginTop: 24 }}
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
          navigation.navigate('Change Language');
        }}>
        <FontAwesomeIcon name="language" size={26} color={'#000000'} />
        <Text
          style={{
            fontSize: 18,
            alignSelf: 'center',
            marginLeft: 12,
            color: '#000000',
          }}>
          Change Language
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row', marginTop: 24 }}
        onPress={() => {
          Linking.openURL('https://t.me/Dialog101_bot');
        }}>
        <FontAwesome5Icon name="telegram" size={26} color={'#000000'} />
        <Text
          style={{
            fontSize: 18,
            alignSelf: 'center',
            marginLeft: 12,
            color: '#000000',
          }}>
          Telegram Boat
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flexDirection: 'row', marginTop: 24 }}
        onPress={() => {
          userSignOut();
        }}>
        <FontAwesome5Icon name="sign-out-alt" size={26} color={'#000000'} />
        <Text
          style={{
            fontSize: 18,
            alignSelf: 'center',
            marginLeft: 12,
            color: '#000000',
          }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export { DrawerContent };
