import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import QRCode from 'react-native-qrcode';
import Modal from 'react-native-modalbox';

export default class CreateSuccess extends Component {

  constructor(props) {
    super(props)

    this.state = {
      lectureId: '1234567890',
    }
  }

  render() {
    return (
      <View style={{justifyContent: 'flex-end'}}>
        <View style={{marginTop: 80}}>
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

        <View style={{marginBottom: 150}}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button buttonStyle={styles.btn}
                    title="进入讲座"
                    onPress={() => {
                      // TODO this.props.navigation.navigate('')
                    }}
                    icon={
                      <Icon name={"connectdevelop"}
                            size={15}
                            color={"white"}
                      />
                    }
            />

            <Button buttonStyle={styles.btn}
                    title="二维码"
                    onPress={() => {
                      this.refs.qrcodeModal.open()
                    }}
                    icon={
                      <Icon name={"qrcode"}
                            size={15}
                            color={"white"}
                      />
                    }
            />
          </View>
        </View>

        <Modal style={{justifyContent: 'center', alignItems: 'center', height: 300, width: 300}}
               position={"center"}
               ref={"qrcodeModal"}>
          <QRCode value={this.state.lectureId}
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
  successImg: {
    width: 150,
    height: 150,
  },

  btn: {
    width: 125,
    height: 40,
  },

})