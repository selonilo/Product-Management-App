import React, {Fragment, useEffect} from 'react';

import {theme} from '../core/theme';
import Icon from 'react-native-vector-icons/Feather';
import {HeaderBackButton} from '@react-navigation/elements';
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();
const Tab = AnimatedTabBarNavigator();

const Navigator = () => {
  const headerConfig = {
    headerShown: true,
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: theme.colors.background,
      height: theme.mixins.height * 0.14,
    },
    headerTitleStyle: {
      fontSize: theme.fontSize.FONT_SIZE_21,
      color: theme.colors.darkBlue,
    },
    headerLeftContainerStyle: {width: '100%'},
  };
  function unAuthStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }

  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{...headerConfig, title: 'Ürün Ekleme'}}
        />
      </Stack.Navigator>
    );
  }

  function TabNavigator() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#ffffff',
          inactiveTintColor: theme.colors.white,
        }}
        appearance={{
          tabBarBackground: theme.colors.primary,
          activeTabBackgrounds: theme.colors.darkBlue,
          floating: false,
          whenInactiveShow: 'icon-only',
          dotSize: 'small',
        }}
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          options={{
            title: 'Satış',
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name="credit-card"
                size={size ? size : 24}
                color={focused ? color : '#222222'}
                focused={focused}
                color={color}
              />
            ),
          }}
          listeners={({navigation}) => ({
            tabPress: e => {
              if (navigation.isFocused()) {
                e.preventDefault();
              }
            },
          })}
          name="HomeStack"
          component={HomeStack}
        />

        <Tab.Screen
          options={{
            title: 'Profil',
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name="user"
                size={size ? size : 24}
                color={focused ? color : '#222222'}
                focused={focused}
                color={color}
              />
            ),
          }}
          name="Profile"
          component={Profile}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="unAuthStack"
          component={unAuthStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
