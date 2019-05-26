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
import {lecture_history_test} from "../realm/lecture_history_test";

class HomePanel extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: '乐看',
      headerTitleStyle: Styles.title,
      headerStyle: Styles.headerStyle,
      headerLeft: (
        <View style={styles.backBtn}/>
      ),
      headerRight: (
        <View style={styles.addBtn}>
          <Button
            style={{borderRadius:20}}
            type="clear"
            icon={<Icon name="plus" size={20} color={Global.blue}/>}
            onPress={() => {
              navigation.navigate('CreateLecture')
            }}
          />
        </View>
        // <MyView>
        //   <View style={styles.backBtn} onPress={() => {
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
            <Brief/>
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
