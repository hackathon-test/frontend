import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode';
import {formatTime} from '../utils/Date';
import Styles from "../utils/Styles";
import Global from "../utils/Global";
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MyQRCode from './MyQRCode';

export default class CreateSuccess extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: '创建成功',
      headerTitleStyle: Styles.title,
      headerStyle: Styles.headerStyle,
      headerBackTitle: (<View></View>),
      headerLeft: (
        <View style={{marginLeft: 5, borderRadius: 20}}>
          <Button
            type="clear"
            icon={<Icon name="arrow-left" size={20} color={Global.blue} />}
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        </View>
      ),
      headerRight: (
        <View></View>
      )
    }
  };
  constructor(props) {
    super(props)
  }

  render() {
    const lectureInfo = this.props.navigation.getParam('lecture');

    return (
      <View style={styles.container}>
          <View style={{padding:10,marginTop:15,alignItems:'center'}}>
            <Text style={{fontSize:20,minHeight:50,lineHeight:25,maxHeight:50}}>{lectureInfo.title}</Text>
          </View>
          <View style={{flex:1,flexDirection:'row',textAlign:'center',alignItems:'center',fontSize:18,marginTop:5,padding:10}}>
            <Text style={{flex:1,textAlign:'center'}}>主讲人：{lectureInfo.speaker}</Text>
          </View>
          <View style={{flex:1,flexDirection:'row',textAlign:'center',alignItems:'center',fontSize:18,marginTop:5,padding:10}}>
            <Text style={{flex:1,textAlign:'center'}}>开始日期:{formatTime(lectureInfo.start)}</Text>
          </View>
        <View style={[{flex:3},styles.qrcodeContainer]}>
          <MyQRCode lectureId={lectureInfo.id} />
        </View>
      </View>
    );
  }
}


let styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center',
    backgroundColor: 'white',
  },

  lectureContainer: {
    backgroundColor: 'red',
    // width: Dimensions.get('window').width,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    // backgroundColor: '#fff',
  },

  lectureTitle: {
    fontSize: 14
  },

  lectureDetail: {
    fontSize: 10
  },

  successContainer: {
    height: 150,
  },

  successImg: {
    width: 100,
    height: 100,
  },

  qrcodeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})