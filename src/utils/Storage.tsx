import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLangData = async () => {
  const data = await AsyncStorage.getItem('lang');
  return data;
};

export const getTokenS = async () => {
  const token = await AsyncStorage.getItem('@token');
  console.log('asyntoken', token);
  return token;
};

export const getLogin = async () => {
  const data = await AsyncStorage.getItem('login');
  return data;
};

export const getMemberId = async () => {
  const data = await AsyncStorage.getItem('@memberid');
  return data;
};
