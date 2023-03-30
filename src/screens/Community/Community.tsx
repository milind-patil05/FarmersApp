import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, Dimensions, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {createPost, fetchPosts} from '../../redux/slices/postsSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {fetchUser} from '../../redux/slices/userSlice';
import {fetchComments} from '../../redux/slices/commentsSlice';

function Community() {
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchPosts());
    dispatch(fetchComments());
    console.log('____ ', postsData);
  }, []);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const postsData = useSelector((state: RootState) => state.posts.postsData);
  const userData = useSelector((state: RootState) => state.user.userData);
  const commentsData = useSelector(
    (state: RootState) => state.comments.commentsData,
  );

  const likeCount = (postId: number) => {
    return postsData.find(post => post && post.id === postId);
  };
  const unlikeCount = (postId: number) => {
    return postsData.find(post => post && post.id === postId);
  };
  const commentCount = (postId: number) => {
    return commentsData.filter(
      comment => comment && comment.post_id === postId,
    );
  };
  const getUser = (userId: number) => {
    return userData.filter(user => user && user.id === userId)[0];
  };

  const addpost = () => {
    const postReq = {
      id: ids.includes(Math.floor(Math.random() * 100000))
        ? Math.floor(Math.random() * 100000)
        : Math.floor(Math.random() * 100000),
      audio: '',
      message: 'abc',
      createdDate: new Date(),
      image: '',
      like: [],
      status: true,
      unlike: [],
      updatedDate: new Date(),
      user_id: '12345',
    };
    dispatch(createPost(postReq));
    dispatch(fetchPosts());
    // setComment("");
    // Keyboard.dismiss()
  };

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
            {getUser(item?.user_id)?.profile && (
              <Image
                source={{uri: getUser(item?.user_id)?.profile}}
                style={{
                  width: 28,
                  height: 28,
                  resizeMode: 'contain',
                  marginRight: 16,
                  alignSelf: 'center',
                }}
              />
            )}

            <View style={{flexDirection: 'column'}}>
              <Text style={{fontWeight: '600', fontSize: 16, color: '#000000'}}>
                {getUser(item?.user_id)?.firstName +
                  ' ' +
                  getUser(item?.user_id)?.lastName}
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  marginTop: 4,
                  fontSize: 12,
                  color: '#666666',
                }}>
                {getUser(item?.user_id)?.city}
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
          {item?.message}
        </Text>
        {item?.image?.assets[0]?.uri && (
        <Image 
        style={{
          marginTop: 20,
          flexWrap: 'wrap',
          width: Dimensions.get('screen').width - 36,
          height: 250
        }} source={{uri: item?.image?.assets[0]?.uri}} /> )}

        <Text
          style={{
            fontWeight: '400',
            marginTop: 20,
            flexWrap: 'wrap',
            width: Dimensions.get('screen').width - 32,
            fontSize: 12,
            color: '#222222',
          }}>
          {`${commentCount(item?.id)?.length} Comments`}
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
                alignSelf: 'center',
                marginLeft: 5,
                color: '#000000',
              }}>
              {likeCount(item?.id)?.like?.length}
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
                alignSelf: 'center',
                marginLeft: 5,
                color: '#000000',
              }}>
              {unlikeCount(item?.id)?.unlike?.length}
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
              navigation.navigate('Comment', {postId: item.id});
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
                alignSelf: 'center',
                marginLeft: 5,
                color: '#000000',
              }}>
              Comment
            </Text>
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
                alignSelf: 'center',
                marginLeft: 5,
                color: '#000000',
              }}>
              Share
            </Text>
          </View>
        </View>
        <View
          style={{
            width: Dimensions.get('screen').width - 32,
            height: 1,
            backgroundColor: '#888888',
            marginTop: 5,
            marginBottom: 2,
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
        {postsData.length > 0 && (
          <FlatList
            style={{width: Dimensions.get('screen').width}}
            data={postsData}
            keyExtractor={item => item?.id}
            renderItem={renderItem}
          />
        )}
      </View>
    </View>
  );
}

export {Community};
