import React, {Component} from 'react';
import {StatusBar, StyleSheet, View, PermissionsAndroid} from 'react-native';
import {createStackNavigator} from 'react-navigation'; // Version can be specified in package.json
import Styles from "../../utils/Styles";

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

class HomePanel extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: '讲座管理',
      headerTitleStyle: Styles.title,
      headerStyle: Styles.headerStyle,
      headerLeft: (
        <View style={styles.addBtn}/>
      ),
      headerRight: (
        <View style={styles.addBtn}>
        <Button
          style={{borderRadius:20}}
          type="clear"
          icon={<Icon name="plus" size={20} color="white"/>}
          onPress={() => {
            // navigation.navigate('Scanner')
          }}
        />
        </View>
        // <MyView>
        //   <View style={styles.addBtn} onPress={() => {
        //     navigation.navigate('Scanner')
        //   }}>
        //     <Icon
        //       name="plus"
        //       size={20}
        //       color="white"
        //     />
        //   </View>
        // </MyView>
      )
    }
  };

  async componentDidMount () {
    // 请求获取存储权限
  }

  render() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
          <View style={{height: '100%', width: '100%'}}>
          </View>
        </View>
    );
  }
}

const KitStack = createStackNavigator(
  {
    Home: {
      screen: HomePanel,
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerTitleStyle: Styles.title,
      headerStyle: Styles.headerStyle,
    }
  }
);
KitStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

export default KitStack;

var styles = StyleSheet.create({

  addBtn: {
    height: 40,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
