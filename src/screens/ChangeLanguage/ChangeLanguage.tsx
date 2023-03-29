import React, {useState} from 'react';
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useTranslation} from 'react-i18next';

function ChangeLanguage() {
  const {t, i18n} = useTranslation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('en');
  const [items, setItems] = useState([
    {label: 'English', value: 'en'},
    {label: 'Hindi', value: 'hi'},
    {label: 'Marathi', value: 'mr'},
  ]);
  const [defaultValue, setDefaultValue] = useState(value);
  const {height, width} = Dimensions.get('screen');

  function changingLanguage(value) {
    console.log('___ ', value);
    i18n.changeLanguage(value);
  }

  return (
    <View style={{flex: 1, alignItems: 'center', paddingTop: 50}}>
      <View style={{width: width - 34, flexDirection: 'column', zIndex: 3000}}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{borderRadius: 0, zIndex: 1}}
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}
          listItemContainerStyle={{
            zIndex: 4000,
            elevation: 5,
          }}
        />
      </View>
      <View style={{width: width - 34}}>
        <TouchableOpacity
          onPress={() => {
            changingLanguage(value);
          }}
          style={{
            marginTop: 24,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#111111',
          }}>
          <Text style={{fontSize: 16, fontWeight: '400', color: '#EEEEEE'}}>
            {t('CHANGEAPPLANGUAGE')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export {ChangeLanguage};
