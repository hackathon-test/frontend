import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createAppContainer, createBottomTabNavigator} from 'react-navigation';
import HomePanel from './HomePanel'

const TabNavigator = createBottomTabNavigator({
    Home: HomePanel,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'briefcase-medical';
        } else if (routeName === 'Group') {
          iconName = 'clinic-medical';
        } else if (routeName === 'User') {
          iconName = 'user';
        }
        return <Icon name={iconName} size={25} color={tintColor}/>
      },
      tabBarOptions: {
        activeTintColor: '#1D81D1',
        inactiveTintColor: 'gray'
      }
    }),
  });

export default createAppContainer(HomePanel);
