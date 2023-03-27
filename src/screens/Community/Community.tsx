import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, Dimensions, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, CommonActions} from '@react-navigation/native';

function Community() {
  const navigation = useNavigation();
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
      description:
        'svbjhdfgjhslkjsncgksfgjkhgjkvhkgjshnjkvhdmgbsvhshbjrxghjbghjfbghjscbshbfhjcssfgfs,',
    },
  ]);

  const renderItem = ({item}: any) => (
    <View style={{flexDirection: 'column', marginRight: 16, flex: 1}}>
      <View
        style={{
          justifyContent: 'flex-start',
          backgroundColor: '#FFFFFF',
          width: Dimensions.get('screen').width,
          borderRadius: 4,
          marginVertical: 10,
          flexWrap: 'wrap',
          flexDirection: 'column',
          paddingHorizontal: 18,
          paddingVertical: 16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              flex: 1,
            }}>
            <Image
              source={item?.src}
              style={{
                width: 28,
                height: 28,
                resizeMode: 'contain',
                marginRight: 16,
                alignSelf: 'center',
              }}></Image>
            <View style={{flexDirection: 'column'}}>
              <Text style={{fontWeight: '600', fontSize: 16, color: '#000000'}}>
                {item?.name}
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  marginTop: 4,
                  fontSize: 12,
                  color: '#666666',
                }}>
                {item?.address}
              </Text>
            </View>
          </View>
          <MaterialCommunityIcons
            name={'dots-vertical'}
            size={20}
            color={'#000000'}></MaterialCommunityIcons>
        </View>
        <Text
          style={{
            fontWeight: '400',
            marginTop: 20,
            flexWrap: 'wrap',
            width: Dimensions.get('screen').width - 36,
            fontSize: 12,
            color: '#222222',
          }}>
          {item?.description}
        </Text>
        <Text
          style={{
            fontWeight: '400',
            marginTop: 20,
            flexWrap: 'wrap',
            width: Dimensions.get('screen').width - 32,
            fontSize: 12,
            color: '#222222',
          }}>
          {`${item?.commentsCount} Comments`}
        </Text>
        <View
          style={{
            width: Dimensions.get('screen').width - 32,
            height: 1,
            backgroundColor: '#888888',
            marginVertical: 2,
          }}></View>
        <View
          style={{
            width: Dimensions.get('screen').width - 32,
            backgroundColor: '#FFFFFF',
            marginVertical: 2,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              marginVertical: 2,
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <AntDesignIcons
              name={'like2'}
              size={20}
              color={'#000000'}></AntDesignIcons>
            <Text
              style={{
                fontWeight: '400',
                flexWrap: 'wrap',
                fontSize: 13,
                alignSelf:'center',
                marginLeft: 5,
                color: '#000000',
              }}>
              {`${item?.likeCount}`}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#FFFFFF',
              marginVertical: 2,
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <AntDesignIcons
              name={'dislike2'}
              size={20}
              color={'#000000'}></AntDesignIcons>
            <Text
              style={{
                fontWeight: '400',
                flexWrap: 'wrap',
                fontSize: 13,
                alignSelf:'center',
                marginLeft: 5,
                color: '#000000',
              }}>
              {`${item?.dislikeCount}`}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#FFFFFF',
              marginVertical: 2,
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
            onPress={() => {
              navigation.navigate('Comment');
            }}>
            <FontAwesomeIcon
              name={'comment-o'}
              size={20}
              color={'#000000'}></FontAwesomeIcon>
            <Text
              style={{
                fontWeight: '400',
                flexWrap: 'wrap',
                fontSize: 13,
                alignSelf:'center',
                marginLeft: 5,
                color: '#000000',
              }}>Comment</Text>
          </TouchableOpacity>

          <View
            style={{
              backgroundColor: '#FFFFFF',
              marginVertical: 2,
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <FontAwesomeIcon
              name={'whatsapp'}
              size={20}
              color={'#000000'}></FontAwesomeIcon>
            <Text
              style={{
                fontWeight: '400',
                flexWrap: 'wrap',
                fontSize: 13,
                alignSelf:'center',
                marginLeft: 5,
                color: '#000000',
              }}>Share</Text>
          </View>
        </View>
        <View
          style={{
            width: Dimensions.get('screen').width - 32,
            height: 1,
            backgroundColor: '#888888',
            marginTop: 5,
            marginBottom:2,
          }}></View>
      </View>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backfaceVisibility: '#D9D9D9',
      }}>
      <View>
        <FlatList
          style={{width: Dimensions.get('screen').width}}
          data={menus}
          keyExtractor={item => item.key}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

export {Community};
