import 'react-native-gesture-handler';
import * as React from 'react';
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
import {DrawerContent} from './src/screens/DrawerContent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator initialRouteName={'Home'}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Community" component={Community} />
      <Tab.Screen name="Weather" component={Weather} />
    </Tab.Navigator>
  );
};

const DrawerComponent = (props: any) => <DrawerContent {...props} />;

const MyDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={DrawerComponent}>
      <Drawer.Screen name="Home" component={MyTabs} />
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
    headerShown: false,
  },
  {
    name: 'Profile',
    component: Profile,
    headerShown: false,
  },
];

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
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
  );
}

export default App;
