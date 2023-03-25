import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';

const Home = () => {
  const [userName, setUserName] = React.useState('');
  const [changeUsername, onChangeNumber] = React.useState('');
  const [menus, setMenus] = React.useState([
    {key: '1', title: 'Crop Details'},
    {key: '2', title: 'Weather Updates'},
    {key: '3', title: 'Diseage management'},
    {key: '4', title: 'Govenrment schemes'},
    {key: '5', title: 'Farmers Corner'},
  ]);

  const Item = (item: any) => (
    <View
      style={{
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      }}>
      <Text style={{fontSize: 32}}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView>
      <View style={{flexDirection: 'column'}}>
        {/* <View
          style={{
            paddingHorizontal: 16,
            width: Dimensions.get('screen').width,
            height: 50,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#EEEEEE',
            borderWidth: 0.5,
            borderColor: '#AFB1B6',
            flexDirection: 'row',
          }}>
          <Text style={{fontSize: 20, fontWeight: '600', marginLeft: 10}}>
            Hi Username, Welcome !
          </Text>
        </View> */}
        <View
          style={{
            height: Dimensions.get('screen').height - 60,
            backgroundColor: '#FFFFFF',
            padding: 16,
            flexDirection: 'column',
          }}>
          <View>
            <FlatList
              style={{width: Dimensions.get('screen').width - 32}}
              horizontal={true}
              data={menus}
              keyExtractor={item => item.key}
              renderItem={({item}) => (
                <View
                  style={{flexDirection: 'column', marginRight: 16, flex: 1}}>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      backgroundColor: '#D9D9D9',
                      height: 80,
                      width: 80,
                      borderRadius: 4,
                      flexWrap: 'wrap',
                    }}></View>
                  <Text style={{marginTop: 8, width: 80}}>{item.title}</Text>
                </View>
              )}
            />
          </View>
          {/* <View style={{height: 200, width: Dimensions.get('screen').width-32, borderRadius:8 ,flexWrap: 'wrap',backgroundColor:'#D9D9D9'}}></View> */}

          <View
            style={{
              flex: 1,
              width: Dimensions.get('screen').width,
              alignItems: 'flex-start',
              flexDirection: 'column',
            }}>
            <Text
              style={{
                height: 30,
                fontSize: 22,
                fontWeight: '600',
                marginTop: 24,
                color: '#000000',
              }}>
              Crop Details
            </Text>
            {/* <TouchableOpacity style={{ backgroundColor:'#000000' , height: 50, marginTop: 24, borderWidth: 1, width:Dimensions.get('screen').width-32, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{ fontSize: 20, fontWeight: '600', alignSelf:'center',color:'#FFFFFF' }}>Login</Text>
                </TouchableOpacity> */}
            <View style={{flex:1, flexWrap:'wrap', marginTop:24, paddingBottom:84}}>
              <FlatList
                numColumns={2}
                showsVerticalScrollIndicator={false}
                style={{
                  width: Dimensions.get('screen').width - 32,
                }}
                data={menus}
                keyExtractor={item => item.key}
                contentContainerStyle={{
                  flexGrow: 1,
                }}
                renderItem={({item}) => (
                  <View style={{flexDirection: 'column', margin: 12, flex: 1}}>
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        backgroundColor: '#D9D9D9',
                        height: (Dimensions.get('screen').width - 40) * 0.5,
                        width: (Dimensions.get('screen').width - 60) * 0.5,
                        borderRadius: 8,
                        flexWrap: 'wrap',
                      }}></View>
                    <Text
                      style={{
                        marginTop: 8,
                        width: (Dimensions.get('screen').width - 60) * 0.5,
                      }}>
                      {item.title}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export {Home};
