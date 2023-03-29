import 'react-native-gesture-handler';
import * as React from 'react';
import {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from './src/screens/Home';
import {Community} from './src/screens/Community';
import {Profile} from './src/screens/Profile';
import {Settings} from './src/screens/Settings';
import {Login} from './src/screens/Login';
import {Verify} from './src/screens/Verify';
import {Comment} from './src/screens/Comment';
import {PostScreen} from './src/screens/PostScreen';
import {DrawerContent} from './src/screens/DrawerContent';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Toast from 'react-native-toast-message';
import ToastComponent from './src/toast/ToastComponent';
import {SelectOptions} from './src/screens/SelectOptions';
import {TakePhoto} from './src/screens/TakePhoto';
import CommonPractices from './src/screens/CommonPratices/CommonPractices';
import DiseaseManagement from './src/screens/DiseaseManagement/DiseaseManagement';
import WeatherUpdate from './src/screens/WeatherUpdate/WeatherUpdate';
import GovernmentScheme from './src/screens/GovernmentScheme/GovernmentScheme';
import FarmerCorner from './src/screens/FarmerCorner/FarmerCorner';
import {ChangeLanguage} from './src/screens/ChangeLanguage';
// import i18n, {ModuleType} from 'i18next';
// import {initReactI18next} from 'react-i18next';
import {getLangData, getLogin} from './src/utils/Storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import i18next from './src/utils/Languages/i18n';
import {useTranslation} from 'react-i18next';
import FarmAssistBot from './src/screens/FarmAssistBot/FarmAssistBot';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator initialRouteName={'Home'}>
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color, position}) => {
            return (
              <Text
                style={{
                  fontSize: 10.5,
                  color: focused ? '#000000' : '#797979',
                }}>
                Home
              </Text>
            );
          },
          tabBarIcon: ({color, focused}) => {
            return (
              <IoniconsIcon
                name="home"
                size={24}
                color={focused ? '#000000' : '#797979'}
              />
            );
          },
        }}
        component={Home}
      />
      <Tab.Screen
        name="Community"
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color, position}) => {
            return (
              <Text
                style={{
                  fontSize: 10.5,
                  color: focused ? '#000000' : '#797979',
                }}>
                Community
              </Text>
            );
          },
          tabBarIcon: ({color, focused}) => {
            return (
              <FontAwesomeIcon
                name="users"
                size={24}
                color={focused ? '#000000' : '#797979'}
              />
            );
          },
        }}
        component={Community}
      />
      <Tab.Screen
        name="FarmAssistBot"
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color, position}) => {
            return (
              <Text
                style={{
                  fontSize: 10.5,
                  color: focused ? '#000000' : '#797979',
                }}>
                FarmAssistBot
              </Text>
            );
          },
          tabBarIcon: ({color, focused}) => {
            return (
              <FontAwesomeIcon
                name="robot"
                size={24}
                color={focused ? '#000000' : '#797979'}
              />
            );
          },
        }}
        component={FarmAssistBot}
      />
    </Tab.Navigator>
  );
};

const DrawerComponent = (props: any) => <DrawerContent {...props} />;

const MyDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={DrawerComponent}>
      <Drawer.Screen name="FarmAssist" component={MyTabs} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

const routes: any[] = [
  {
    name: 'Home',
    component: MyDrawer,
    headerShown: false,
  },
  {
    name: 'Community',
    component: Community,
    headerShown: false,
  },
  {
    name: 'FarmAssistBot',
    component: FarmAssistBot,
    headerShown: false,
  },
  {
    name: 'Settings',
    component: Settings,
    headerShown: true,
  },
  {
    name: 'Profile',
    component: Profile,
    headerShown: true,
  },
  {
    name: 'Verify OTP',
    component: Verify,
    headerShown: true,
  },
  {
    name: 'Comment',
    component: Comment,
    headerShown: true,
  },
  {
    name: 'Select Options',
    component: SelectOptions,
    headerShown: true,
  },
  {
    name: 'Create New Post',
    component: PostScreen,
    headerShown: true,
  },
  {
    name: 'Take Photo',
    component: TakePhoto,
    headerShown: true,
  },
  {
    name: 'Change Language',
    component: ChangeLanguage,
    headerShown: true,
  },
];

const LoginComponent = (props: any) => <Login {...props} />;

function App() {
  const {t, i18n} = useTranslation();
  const toastConfig = {
    error: ({props}) => <ToastComponent {...props} />,
  };

  useEffect(() => {
    getLangData().then(async lang => {
      if (!lang) {
        await AsyncStorage.setItem('lang', 'en');
        i18n.changeLanguage('en');
      }
    });
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginComponent}
            options={{title: 'Login'}}
          />
          {routes &&
            routes.length > 0 &&
            routes.map(route => (
              <Stack.Screen
                key={route.name}
                name={route.name}
                component={route.component}
                options={{
                  headerShown: route.headerShown,
                }}
              />
            ))}
          <Stack.Screen name="Common Practices" component={CommonPractices} />
          <Stack.Screen name="Weather Updates" component={WeatherUpdate} />
          <Stack.Screen
            name="Diseage management"
            component={DiseaseManagement}
          />
          <Stack.Screen
            name="Govenrment schemes"
            component={GovernmentScheme}
          />
          <Stack.Screen name="Mandi Rates" component={FarmerCorner} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast
        position="bottom"
        bottomOffset={65}
        config={toastConfig}
        autoHide={true}
        visibilityTime={3000}
      />
    </Provider>
  );
}

export default App;
