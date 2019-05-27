import React, {Component} from 'react';
import {Dimensions, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode';
import {formatTime} from '../utils/Date';

export default class CreateSuccess extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const lectureInfo = this.props.navigation.getParam('lecture');

    return (
      <View style={styles.container}>
        <View style={styles.lectureContainer}>
          <View style={styles.lectureTitle}>
            <Text style={{fontSize: 18}}>{lectureInfo.title}</Text>
          </View>
          <View style={styles.lectureDetail}>
            <Text style={{flex: 1, backgroundColor: 'pink'}}>{formatTime(lectureInfo.start)}</Text>
            <Text style={{flex: 1, backgroundColor: 'gray'}}>主讲人：{lectureInfo.speaker}</Text>
          </View>
        </View>

        <View style={styles.successContainer}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={require("../img/success.png")}
              style={styles.successImg}
            />
            <Text>
              创建成功！
            </Text>
          </View>
        </View>

        <View style={styles.qrcodeContainer}>
          <QRCode value={lectureInfo.id}
                  size={200}/>
        </View>
      </View>
    );
  }
}


let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: Dimensions.get('screen').height - StatusBar.currentHeight,
    justifyContent: 'flex-start',
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
    backgroundColor: 'blue'
  },

  successImg: {
    width: 100,
    height: 100,
  },

  qrcodeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
})