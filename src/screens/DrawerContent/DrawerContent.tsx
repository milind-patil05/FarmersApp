import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

function DrawerContent() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={() => console.log('Hi')}>
        <Text>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

export {DrawerContent};
