import React, {Component} from 'react';
import {Dimensions, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Button} from "react-native-elements";
import QRCode from 'react-native-qrcode';
import Modal from 'react-native-modalbox';
import Global from "../utils/Global";
import {formatTime} from '../utils/Date';

export default class CreateSuccess extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    console.log('------')
    console.log(this.props.lecture)

    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.lectureContainer}>
            <View style={styles.lectureTitle}>
              <Text style={{fontSize: 18}}>{this.props.lecture.title}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', fontSize: 10}}>
              <Text style={{flex: 1}}>{formatTime(this.props.lecture.timestamp)}</Text>
              <Text style={{flex: 1}}>主讲人：{this.props.lecture.professor}</Text>
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
        </View>

        <Modal style={{justifyContent: 'center', alignItems: 'center', height: 300, width: 300}}
               position={"center"}
               ref={"qrcodeModal"}>
          <QRCode value={this.props.lecture.id}
                  size={200}/>
          <Button style={styles.btn}
                  onPress={() => {
                    // TODO 实现保存到相册
                  }}>
            {/* TODO btn 样式不生效*/}
            保存到相册
          </Button>
          <Text style={styles.text}>分享给其他人，一起进入讨论吧！</Text>
        </Modal>
      </View>
    );
  }
}


let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },

  main: {
    height: Dimensions.get('screen').height - StatusBar.currentHeight,
    flexDirection: 'column',
    alignItems: 'center',
  },

  lectureContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },

  lectureTitle: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'flex-start'

  },

  successContainer: {
    height: 200,
  },
  
  successImg: {
    width: 150,
    height: 150,
  },

  btn: {
    width: 125,
    height: 40,
  },

})