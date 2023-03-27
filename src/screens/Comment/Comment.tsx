import React, {useState, useEffect} from 'react';
import {Dimensions, Text, View, Image, FlatList, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, CommonActions} from '@react-navigation/native';

function Comment() {
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  const [menus, setMenus] = React.useState([
    {
      key: '1',
      title: 'Crop Details',
      src: require('../../assets/user_placeholder.png'),
      name: 'firstname lastname',
      address: 'mumbai, maharshtra',
      likeCount: 5,
      dislikeCount: 1,
      commentsCount: 2,
      isDataFromOtherUser: true,
      description:
        'svbjhdfgjhwfkjchenkjgehkjgchekjcgehkghekghkhfekjghefjkvbjkhenhfhjkxefjkgcnefckhbfsekhbvkhcfsnhkkfjghjkehnjkgcefhnughefkgieuhlgkuehlkcgmhkehgcislkjsncgksfgjkhgjkvhkgjshnjkvhdmgbsvhshbjrxghjbghjfbghjscbshbfhjcssfgfs,',
    },
    {
      key: '2',
      title: 'Weather Updates',
      src: require('../../assets/user_placeholder.png'),
      name: 'firstname lastname',
      address: 'mumbai, maharshtra',
      likeCount: 5,
      dislikeCount: 1,
      commentsCount: 2,
      isDataFromOtherUser: true,
      description:
        'svbjhdfgjhslkjsncgksfgjkhgjkvhkgjshnjkvhdmgbsvhshbjrxghjbghjfbghjscbshbfhjcssfgfs,',
    },
    {
      key: '3',
      title: 'Diseage management',
      src: require('../../assets/user_placeholder.png'),
      name: 'firstname lastname',
      address: 'mumbai, maharshtra',
      likeCount: 5,
      dislikeCount: 1,
      commentsCount: 2,
      isDataFromOtherUser: true,
      description:
        'svbjhdfgjhslkjsncgksfgjkhgjkvhkgjshnjkvhdmgbsvhshbjrxghjbghjfbghjscbshbfhjcssfgfs,',
    },
    {
      key: '4',
      title: 'Govenrment schemes',
      src: require('../../assets/user_placeholder.png'),
      name: 'firstname lastname',
      address: 'mumbai, maharshtra',
      likeCount: 5,
      dislikeCount: 1,
      commentsCount: 2,
      isDataFromOtherUser: true,
      description:
        'svbjhdfgjhslkjsncgksfgjkhgjkvhkgjshnjkvhdmgbsvhshbjrxghjbghjfbghjscbshbfhjcssfgfs,',
    },
    {
      key: '5',
      title: 'Farmers Corner',
      src: require('../../assets/user_placeholder.png'),
      name: 'firstname lastname',
      address: 'mumbai, maharshtra',
      likeCount: 5,
      dislikeCount: 1,
      commentsCount: 2,
      isDataFromOtherUser: false,
      description:
        'svbjhdfgjhslkjsncgksfgjkhgjkvhkgjshnjkvhdmgbsvhshbjrxghjbghjfbghjscbshbfhjcssfgfs,',
    },
  ]);
  const navigation = useNavigation();

  // justifyContent : from otherUsers ? ' flex-start' : 'space-around'
  // flexDirection: from otherUsers ? 'row' : 'row-reverse'

  const renderItem = ({item}: any) => (
    <View
      style={{
        flexDirection:
          item?.isDataFromOtherUser === false ? 'row-reverse' : 'row',
        flex: 1,
        marginTop: 16,
        paddingHorizontal: 16,
        justifyContent: item?.isDataFromOtherUser === false ? 'flex-end' : 'flex-start',
      }}>
      <View
        style={{
          backgroundColor: '#888888',
          width: 40,
          height: 40,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FontAwesomeIcon
          name="user"
          size={22}
          color={item?.isDataFromOtherUser === false  ? '#000000' : '#FFFFFF'}></FontAwesomeIcon>
      </View>
      <View
        style={{
          backgroundColor: '#DDDDDD',
          width: width - 80,
          marginLeft:  item?.isDataFromOtherUser === false ? 0 : 4,
          marginRight: item?.isDataFromOtherUser === false ? 4 : 4,
          borderBottomRightRadius: 6,
          borderBottomLeftRadius: 6,
          borderTopRightRadius: item?.isDataFromOtherUser === false ? 0 : 6,
          borderTopLeftRadius: item?.isDataFromOtherUser === false ? 6 : 0,
          padding: 5,
        }}>
        <View
          style={{
            width: width - 100,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'column', paddingLeft: 5}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: '600', fontSize: 14, color: '#000000'}}>
                {item?.name}
              </Text>
              <View
                style={{
                  backgroundColor: '#559544',
                  paddingHorizontal: 4,
                  paddingVertical: 1,
                  flexWrap: 'wrap',
                  borderRadius: 3,
                  marginLeft: 8,
                }}>
                <Text
                  style={{fontWeight: '400', fontSize: 10, color: '#FFFFFF'}}>
                  Proffession
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontWeight: '400',
                marginTop: 2,
                fontSize: 10,
                color: '#666666',
              }}>
              {item?.address}
            </Text>
          </View>
          <MaterialCommunityIcons
            name={'dots-vertical'}
            size={20}
            color={'#444444'}></MaterialCommunityIcons>
        </View>

        <Text style={{paddingHorizontal: 5}}>
          scgnkljsdcghkehknhjkghsdfjkgnsdjkvbakjfbajkbvkjarbvkjwrbfkjbarjknbaerjkfnajkbfvkjasdbvjksdbvjksdnjkvnsdjkvnsdjkvnjksdnvkjsdnvnsdjkvnjksdnvkjnsdjkv
        </Text>

        <View style={{flex: 1, paddingTop: 15, justifyContent: 'flex-end'}}>
          <Text
            style={{
              alignSelf: 'flex-end',
              marginBottom: 5,
              marginRight: 5,
              fontSize: 11,
            }}>
            27 March
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{marginBottom: 64}}>
        <FlatList
          style={{width: Dimensions.get('screen').width}}
          data={menus}
          keyExtractor={item => item.key}
          renderItem={renderItem}
        />
      </View>
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
            marginBottom: 12,
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
              style={{
                paddingLeft: 10,
                // width: Dimensions.get('screen').width - 32,
              }}></TextInput>
          </View>
          
        <View style={{ alignSelf:'center'}}>
            <View
            style={{
              height: 50,
              borderRadius: 25,
              alignSelf: 'flex-start',
              width: 50,
              backgroundColor: '#00005F',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <Image
              source={require('../../assets/recording.png')}
              style={{
                width: 28,
                height: 28,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}></Image>
          </View>

          </View>
        </View>
        
      </View>
    </View>
  );
}

export {Comment};
