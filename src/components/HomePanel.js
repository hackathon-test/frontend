import React, {Component} from 'react';
import {StatusBar, StyleSheet, View, PermissionsAndroid} from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation'; // Version can be specified in package.json
import Styles from "../utils/Styles";
import Brief from "./Brief";
import { Button } from 'react-native-elements';
import Global from '../utils/Global';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Comment from './Comment';
import CreateLecture from './CreateLecture';
import ScanQRPanel from './ScanQRCode';
import {lecture_history_test} from "../realm/lecture_history_test";
import CreateSuccess from './CreateSuccess';

class HomePanel extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: '乐看',
      headerTitleStyle: Styles.title,
      headerStyle: Styles.headerStyle,
      headerLeft: (
        <View />
      ),
      headerRight: (
        <View style={styles.addBtn}>
          <Button
            style={{borderRadius:20}}
            type="clear"
            icon={<Icon name="plus" size={20} color={Global.blue}/>}
            onPress={() => {
              navigation.navigate('CreateLecture');
            }}
          />
        </View>
      )
    }
  };

  async componentDidMount () {
    // 请求获取存储权限
  }

  render() {

    const lecture ={
      id: 'da3b5a4b-0ccd-47b3-83d2-c248e4a11c37',
      title: '美国早期国家构建中的"中立化国家"概念美国早期国家构建中的"中立化国家"概念',
      professor: '陈振宇',
      timestamp: '2019-05-26T11:25:01.909Z'
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
          <View style={{height: '100%', width: '100%'}}>
            <Brief/>
            {/*<CreateSuccess lecture={lecture}/>*/}
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
    Comment:{
      screen: Comment
    },
    CreateLecture: {
      screen: CreateLecture
    },
    ScanQR: {
      screen: ScanQRPanel
    }
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

export default createAppContainer(KitStack);

var styles = StyleSheet.create({
  addBtn: {
    height: 40,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
