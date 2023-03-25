import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {
  CommonActions,
  useNavigation,
  DrawerActions,
} from '@react-navigation/native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

function DrawerContent() {
  const navigation = useNavigation();

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
        name="close-outline"
        size={30}
        onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
        style={{alignSelf: 'flex-end', paddingRight: 45}}
      />
      <TouchableOpacity
        style={{flexDirection: 'row'}}
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
          navigation.navigate('Settings');
        }}>
        <IoniconsIcon name="settings-sharp" size={24} color={'#000000'} />
        <Text
          style={{
            fontSize: 16,
            alignSelf: 'center',
            marginLeft: 12,
            color: '#000000',
          }}>
          Settings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{flexDirection: 'row', marginTop: 16}}
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
          navigation.navigate('Profile');
        }}>
        <FontAwesomeIcon name="user-circle" size={24} color={'#000000'} />
        <Text
          style={{
            fontSize: 16,
            alignSelf: 'center',
            marginLeft: 12,
            color: '#000000',
          }}>
          Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{flexDirection: 'row', marginTop: 16}}
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer());
           navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [{name: 'Login'}],
                  }),
                );
        }}>
        <FontAwesome5Icon name="sign-out-alt" size={24} color={'#000000'} />
        <Text
          style={{
            fontSize: 16,
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

export {DrawerContent};
