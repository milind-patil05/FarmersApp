import 'react-native-gesture-handler';
import * as React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from './src/screens/Home';
import {Community} from './src/screens/Community';
import {Weather} from './src/screens/Weather';
import {Profile} from './src/screens/Profile';
import {Settings} from './src/screens/Settings';
import {Login} from './src/screens/Login';
import {Verify} from './src/screens/Verify';
import {Comment} from './src/screens/Comment';
import {DrawerContent} from './src/screens/DrawerContent';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { Provider } from "react-redux";
import { store } from './src/redux/store';

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
            return(<IoniconsIcon name="home" size={24} color={focused ? '#000000' : '#797979'}/>);
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
            return(<FontAwesomeIcon name="users" size={24} color={focused ? '#000000' : '#797979'}/>);
          },
        }}
        component={Community}
      />
      <Tab.Screen
        name="Weather"
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color, position}) => {
            return (
              <Text
                style={{
                  fontSize: 10.5,
                  color: focused ? '#000000' : '#797979',
                }}>
                Weather
              </Text>
            );
          },
          tabBarIcon: ({color, focused}) => {
            return(<FontAwesomeIcon name="cloud-sun-rain" size={24} color={focused ? '#000000' : '#797979'}/>);
          },
        }}
        component={Weather}
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
    name: 'Weather',
    component: Weather,
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
    name: 'Verify',
    component: Verify,
    headerShown: true,
  },
  {
    name: 'Comment',
    component: Comment,
    headerShown: true,
  },
];

const LoginComponent = (props: any) => <Login {...props} />;

function App() {
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
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;
