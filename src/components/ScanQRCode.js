import React, {Component} from 'react';
import {Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Global from '../utils/Global';
import {RNCamera} from 'react-native-camera';

export default class ScanQRCode extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      cameraWidth: 0,
      cameraHeight: 0,
      focusAreaLeft: 0,
      focusAreaTop: 0,
      focusAreaWidth: 0,
      focusAreaHeight: 0,
      recognizing: false,
      recognize: true,
      pictureUri: '',
    }
    // TODO should be check on iOS, maybe 4:3 is required
    this.cameraRatio = '16:9';
    this.cropSize = 0.7;
    this.cropCenter = 0.5;
    this.edgeLength = 20;
    this.edgeColor = Global.blue;
    this.edgeWidth = 4;
  }

  setCameraFocusArea = async (e) => {
    const { width, height } = e.nativeEvent.layout;
    this.setState({
      cameraWidth: width,
      cameraHeight: height,
      focusAreaLeft: width * (1 - this.cropSize) / 2,
      focusAreaTop: this.cropCenter * (height - width * this.cropSize),
      focusAreaWidth: width * this.cropSize,
      focusAreaHeight: width * this.cropSize
    });
  }

  handleBarCodeRead = (e) => {
    // TODO 加状态位防抖动
    this.props.navigation.navigate('Comment', {lectureId: e.data});
  }

  render() {
    const {cameraWidth, cameraHeight, focusAreaLeft, focusAreaTop, focusAreaWidth, focusAreaHeight} = this.state;

    return (
      <View style={styles.container}>
      {/* <StatusBar translucent={true}/> */}
      <RNCamera
        ref={ref => {this.camera = ref;}}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
        captureAudio={false}
        onLayout={this.setCameraFocusArea}
        onBarCodeRead={this.handleBarCodeRead}
        ratio={this.cameraRatio}
      >
        <View style={styles.backArea}>
          <Image style={styles.backIcon} source={require('../img/back.png')} />
          <TouchableOpacity style={styles.backTextWrapper} onPress={() => this.props.navigation.goBack()} >
            <Text style={styles.backText}>返回</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.mask, {left: 0, top: 0, width: cameraWidth, height: focusAreaTop}]} />
        <View style={[styles.mask, {left: 0, top: focusAreaTop, width: focusAreaLeft, height: focusAreaHeight}]} />
        <View style={[styles.mask, {right: 0, top: focusAreaTop, width: focusAreaLeft, height: focusAreaHeight}]} />
        <View style={[styles.mask, {left: 0, top: focusAreaTop+focusAreaHeight, width: cameraWidth, height: cameraHeight-focusAreaTop-focusAreaHeight}]} />
        <View style={[styles.edge, {left: focusAreaLeft, top: focusAreaTop, width: this.edgeLength, height: this.edgeLength, borderTopColor: this.edgeColor, borderTopWidth: this.edgeWidth, borderLeftColor: this.edgeColor, borderLeftWidth: this.edgeWidth}]} />
        <View style={[styles.edge, {right: focusAreaLeft, top: focusAreaTop, width: this.edgeLength, height: this.edgeLength, borderTopColor: this.edgeColor, borderTopWidth: this.edgeWidth, borderRightColor: this.edgeColor, borderRightWidth: this.edgeWidth}]} />
        <View style={[styles.edge, {left: focusAreaLeft, top: focusAreaTop+focusAreaHeight-this.edgeLength, width: this.edgeLength, height: this.edgeLength, borderBottomColor: this.edgeColor, borderBottomWidth: this.edgeWidth, borderLeftColor: this.edgeColor, borderLeftWidth: this.edgeWidth}]} />
        <View style={[styles.edge, {right: focusAreaLeft, top: focusAreaTop+focusAreaHeight-this.edgeLength, width: this.edgeLength, height: this.edgeLength, borderBottomColor: this.edgeColor, borderBottomWidth: this.edgeWidth, borderRightColor: this.edgeColor, borderRightWidth: this.edgeWidth}]} />

        <View ref={ ref => {this.focusArea = ref;}} style={[styles.focusArea, {left: focusAreaLeft, top: focusAreaTop, width: focusAreaWidth, height: focusAreaHeight}]} />
        <View style={[styles.noticeArea, {left: focusAreaLeft, top: focusAreaTop+focusAreaHeight, width: focusAreaWidth}]}>
          <Text style={styles.notice}>请将讲座二维码放入框内</Text>
        </View>
      </RNCamera>
    </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backArea: {
    position: 'absolute',
    left: 10,
    top: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 999,
  },
  backIcon: {
    width: 20,
    height: 20,
    marginRight: 2,
  },
  backTextWrapper: {
    backgroundColor: 'transparent',
  },
  backText: {
    fontSize: 18,
    color: '#fff',
  },
  mask: {
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.7,
    zIndex: 0,
  },
  edge: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 1000
  },
  recognizeSwitch: {
    position: 'absolute',
    backgroundColor: 'transparent',

  },
  focusArea: {
    position: 'absolute',
    borderWidth: 0.1,
    borderColor: '#d6d7da',
  },
  indicator: {
    position: 'absolute',
    zIndex: 999,
  },
  noticeArea: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    marginTop: 20,
  },
  notice: {
    textAlign: 'center',
    fontSize: 14,
    color: '#c5c5c5',
  }
});

