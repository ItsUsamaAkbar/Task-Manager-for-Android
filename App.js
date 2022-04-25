// import React from 'react';
// import {View, Text} from 'react-native';
// import {createAppContainer, createStackNavigator} from 'react-navigation';
// import Home from './Screens/Home';
// import Main from './Screens/Main';
// import Login from './Screens/Login';
// import SignUp from './Screens/SignUp';
// import Registration from './Screens/Registration';

// const AppNavigator = createStackNavigator(
//   {
//     Home: Home,
//   },
//   {
//     Main: Main,
//   },
//   {
//     Login: Login,
//   },
//   {
//     SingUp: SignUp,
//   },
//   {
//     AddingTask: Registration,
//   },

//   {
//     initialRouteName: 'Home',
//   },
// );
// export default createAppContainer(AppNavigator);
import React from 'react';
import {Button, View, Text, TouchableHighlight} from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation'; // Version can be specified in package.json
import Home from './Screens/Home';
import Login from './Screens/Login';
import Main from './Screens/Main';
import Signup from './Screens/SignUp';
import Registration from './Screens/Registration';
import firebase from 'firebase/app';
import 'firebase/firestore';
import NavigationService from './NavigationServices';
const AppStack = createStackNavigator(
  {
    HomeRoute: Home,
    LoginRoute: Login,
    SignUpRoute: Signup,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);
const MainStack = createStackNavigator(
  {
    MainRoute: Main,
    RegRoute: Registration,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default createAppContainer(
  createSwitchNavigator({
    Home: AppStack,
    Main: MainStack,
  }),
);
