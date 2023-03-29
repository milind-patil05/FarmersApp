import React, {useState, useEffect} from 'react';
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
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, CommonActions} from '@react-navigation/native';
import Modal from 'react-native-modal';
// import AudioRecorderPlayer, {
//   AVEncoderAudioQualityIOSType,
//   AVEncodingOption,
//   AudioEncoderAndroidType,
//   AudioSourceAndroidType,
//   OutputFormatAndroidType,
// } from 'react-native-audio-recorder-player';
// import type {
//   AudioSet,
//   PlayBackType,
//   RecordBackType,
// } from 'react-native-audio-recorder-player';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {fetchUser} from '../../redux/slices/userSlice';
import {fetchComments} from '../../redux/slices/commentsSlice';
import auth from '@react-native-firebase/auth';
interface State {
  isLoggingIn: boolean;
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
}

function Comment() {
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.userData);
  const commentsData = useSelector(
    (state: RootState) => state.comments.commentsData,
  );

  const getUser = (userId: number) => {
    return userData.filter(user => user && user.id === userId)[0];
  };
  const currentUser = auth().currentUser;
  console.log('currentUser: ', currentUser);


  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchComments());
  }, []);

  const likeCount = (commentId: number) => {
    return commentsData.filter(
      comment => comment && comment.id === commentId && comment.like,
    );
  };
  const unlikeCount = (commentId: number) => {
    return commentsData.filter(
      comment => comment && comment.id === commentId && comment.unlike,
    );
  };

  const navigation = useNavigation();
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [showIcon, setShowIcon] = useState(true);
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:00:00');

  useEffect(() => {
    async function setPermisstions() {
      // audioRecorderPlayer = new AudioRecorderPlayer();
      // audioRecorderPlayer.setSubscriptionDuration(0.1);
      // You can await here
      if (Platform.OS === 'android') {
        try {
          const grants = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            // PermissionsAndroid.PERMISSIONS.WRITE_INTERNAL_STORAGE,
            // PermissionsAndroid.PERMISSIONS.READ_INTERNAL_STORAGE,
          ]);

          console.log('write external stroage', grants);

          if (
            grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.READ_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.RECORD_AUDIO'] ===
              PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('All required permissions are granted');
            return;
            // startAudiRecording();
          } else {
            console.log('All required permissions not granted');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }
    }
    setPermisstions();
  }, []);

  useEffect(() => {
    console.log('1111');
    // Change the state every second or the time given by User.
    startAudiRecording();
    // const interval = setInterval(() => {
    //   setShowIcon(showIcon => !showIcon);
    // }, 1000);
    // return () => clearInterval(interval);
  }, [isVisible]);

  const startAudiRecording = async () => {
    const path = Platform.select({
      ios: 'hello.m4a',
      android: 'sdcard/hello.mp4',
    });
     const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
    };
    console.log('audioSet', audioSet);
    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);

    // const uri = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      setRecordSecs(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      console.log(`Recording started uri: ${uri}`);
      return;
    });
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    console.log('stopped ', result);
  };

  const onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer();
    console.log('startPlay ', msg);
    audioRecorderPlayer.addPlayBackListener(e => {
      if (e.currentPosition === e.duration) {
        console.log('finished');
        audioRecorderPlayer.stopPlayer();
      }
      setCurrentPositionSec(e.currentPosition);
      setCurrentDurationSec(e.duration);
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
      return;
    });
  };

  const onPausePlay = async () => {
    console.log('pause');
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  const renderItem = ({item}: any) => (
    <View
      style={{
        flexDirection: item?.user_id === currentUser ? 'row-reverse' : 'row',
        flex: 1,
        marginTop: 16,
        paddingHorizontal: 16,
        justifyContent:
          item?.user_id === currentUser ? 'flex-end' : 'flex-start',
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
        {getUser(item?.user_id)?.profile ? (
          <Image
            source={{uri: getUser(item?.user_id)?.profile}}
            style={{
              width: 28,
              height: 28,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
        ) : (
          <FontAwesomeIcon
            name="user"
            size={22}
            color={
              item?.user_id === currentUser ? '#000000' : '#FFFFFF'
            }></FontAwesomeIcon>
        )}
      </View>
      <View
        style={{
          backgroundColor: '#DDDDDD',
          width: width - 80,
          marginLeft: item?.user_id === currentUser ? 0 : 4,
          marginRight: item?.user_id === currentUser ? 4 : 4,
          borderBottomRightRadius: 6,
          borderBottomLeftRadius: 6,
          borderTopRightRadius: item?.user_id === currentUser ? 0 : 6,
          borderTopLeftRadius: item?.user_id === currentUser ? 6 : 0,
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
                {getUser(item?.user_id)?.firstName +
                  ' ' +
                  getUser(item?.user_id)?.lastName}
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
              {getUser(item?.user_id)?.city +
                ' ' +
                getUser(item?.user_id)?.state}
            </Text>
          </View>
          <MaterialCommunityIcons
            name={'dots-vertical'}
            size={20}
            color={'#444444'}></MaterialCommunityIcons>
        </View>

        {item?.comment && (
          <Text style={{paddingHorizontal: 5, color: '#111111'}}>
            {item?.comment}
          </Text>
        )}

        {item.image && (
          <Image
            style={{
              marginTop: 20,
              flexWrap: 'wrap',
              width: width - 100,
              height: 100,
            }}
            source={{uri: item.image}}
          />
        )}

        <View style={{flex: 1, paddingTop: 15, justifyContent: 'flex-end'}}>
          <Text
            style={{
              alignSelf: 'flex-end',
              marginBottom: 5,
              marginRight: 5,
              fontSize: 11,
              color: '#444444',
            }}>
            {/* { new Date(item?.createdDate) } */}
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
          data={commentsData}
          keyExtractor={item => item.id}
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
              style={{
                paddingLeft: 10,
                // width: Dimensions.get('screen').width - 32,
              }}></TextInput>
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
      <Modal isVisible={isVisible}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              height: width * 0.63,
              width: width * 0.63,
              backgroundColor: '#FFFFFF',
              alignSelf: 'center',
              flexDirection: 'column',
            }}>
            <IoniconsIcons
              name="close"
              color={'#000000'}
              size={30}
              style={{padding: 5}}
              onPress={() => {
                setIsVisible(false);
              }}
              style={{
                alignSelf: 'flex-end',
                paddingRight: 8,
                paddingTop: 8,
              }}></IoniconsIcons>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: '#117711',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  height: 76,
                  width: 76,
                  borderRadius: 38,
                }}>
                {showIcon === true && (
                  <Image
                    source={require('../../assets/recording.png')}
                    style={{
                      width: 32,
                      height: 32,
                      resizeMode: 'contain',
                      alignSelf: 'center',
                      marginVertical: 16,
                    }}></Image>
                )}
              </View>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                flexDirection: 'column',
              }}>
              <Text
                style={{color: '#555555', alignSelf: 'center', marginTop: 12}}>
                {recordTime}
              </Text>

              {/* <Button
                icon="stop"
                mode="outlined"
                title='STOP'
                style={{marginVertical: 8}}
                onPress={() => onStopRecord()}></Button> */}

              {/* <Text>
                {playTime} / {duration}
              </Text> */}
              {/* <Button
                mode="contained"
                icon="play"
                title='PLAY'
                style={{marginVertical: 8}}
                onPress={() => onStartPlay()}></Button>
              <Button
                icon="pause"
                mode="contained"
                title= "PAUSE"
                style={{marginVertical: 8}}
                onPress={() => onPausePlay()}></Button>
              <Button
                icon="stop"
                mode="outlined"
                title="STOP"
                style={{marginVertical: 8}}
                onPress={() => onStopPlay()}></Button> */}

              <Text
                style={{color: '#555555', alignSelf: 'center', marginTop: 8}}>
                Speak up, recording is going on!
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#000000',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginBottom: 10,
                  marginTop: 16,
                }}
                onPress={() => {
                  setIsVisible(false);
                }}>
                <Text style={{color: '#FFFFFF', fontSize: 16}}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export {Comment};
