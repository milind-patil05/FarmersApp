import React from 'react';
import {
  Dimensions,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Button,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

function PostScreen() {
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
            marginBottom: 16,
            paddingBottom: 16,
            paddingTop: 6,
          }}>
          <View
            style={{
              height: 50,
              borderWidth: 1,
              borderRadius: 25,
              borderColor: '#AAAAAA',
              alignSelf: 'center',
              justifyContent: 'flex-start',
              width: Dimensions.get('screen').width - 100,
              marginLeft: 16,
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: 40,
                borderRadius: 25,
                alignSelf: 'flex-start',
                width: 40,
                alignSelf: 'center',
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
            <TextInput
              placeholder="Write a comment"
              placeholderTextColor={'#444444'}
              value={comment}
              onChangeText={value => setComment(value)}
              style={{
                paddingLeft: 10,
              }}></TextInput>
            <TouchableOpacity onPress={() => requestCameraPermission()}>
              <IoniconsIcons
                style={{marginLeft: 70, marginTop: 13}}
                name="image-outline"
                size={22}
                color={'black'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => (comment.length > 0 ? addComment() : null)}>
              <IoniconsIcons
                style={{marginLeft: 15, marginTop: 13}}
                name="send-outline"
                size={22}
                color={'black'}
              />
            </TouchableOpacity>
          </View>

          <View style={{alignSelf: 'center'}}>
            <TouchableOpacity
              style={{
                height: 50,
                borderRadius: 25,
                alignSelf: 'flex-start',
                width: 50,
                backgroundColor: '#00005F',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10,
              }}
              onPress={() => {
                setIsVisible(true);
              }}>
              <Image
                source={require('../../assets/recording.png')}
                style={{
                  width: 28,
                  height: 28,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export {PostScreen};
