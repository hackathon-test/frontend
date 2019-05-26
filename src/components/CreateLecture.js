import React, {Component} from 'react';
import {StatusBar, Dimensions, Text, Picker, TextInput, StyleSheet, View, PermissionsAndroid, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Global from '../utils/Global';
import { getDate } from '../utils/Date';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {MAX_LECTURE_DURATION, SERVER} from '../utils/Constants';

export default class CreateLecture extends Component {

    constructor (props) {
      super(props);
      this.state = {
        title: 'test',
        speaker: 'test',
        beginTime: '',
        duration: '1',
        isDateTimePickerVisible: false,
        isDurationWarningVisible: false
      }
    }

    handleDateTimePicked = (date) => {
      this.setState({
        beginTime: date.toString(),
        isDateTimePickerVisible: false
      });
    }

    showDateTimePicker = () => {
      this.setState({
        isDateTimePickerVisible: true
      });
    }

    hideDateTimePicker = () => {
      this.setState({
        isDateTimePickerVisible: false
      });
    }

    handleTitleChange = (value) => {
      this.setState({
        title: value
      });
    }

    handleDurationChange = (value) => {
      if (this._isValidDuration(value)) {
        this.setState({
          duration: value,
          isDurationWarningVisible: false
        });
      }
      else {
        this.setState({
          isDurationWarningVisible: true
        });
      }
    }

    handleConfirm = () => {
      fetch(`${SERVER}/lectures`, {
        method: 'POST',
        
      })
    }

    _isValidDuration(str) {
      let n = Math.floor(Number(str));
      return n !== Infinity && String(n) === str && n >= 1 && n <= MAX_LECTURE_DURATION;
    }

    render () {
      return (
        <View style={styles.container}>
          <View style={styles.statusBar}></View>
          <View style={styles.main}>
            <View style={styles.title}>
              <Text style={styles.titleText}>请填写讲座相关信息</Text>
            </View>
            <View style={styles.form}>
              <View style={styles.input}>
                <Text style={styles.label}>讲座课题</Text>
                <TextInput style={styles.textInput} value={this.state.title} onChangeText={this.handleTitleChange}></TextInput>
              </View>
              <View style={styles.input}>
                <Text style={styles.label}>主讲人</Text>
                <TextInput style={styles.textInput} value={this.state.title} onChangeText={this.handleTitleChange}></TextInput>
              </View>
              <View style={styles.input}>
                <Text style={styles.label}>开始时间</Text>
                <TouchableOpacity style={styles.beginTimeButton} activeOpacity={0.8} onPress={this.showDateTimePicker}>
                  <Text style={styles.beginTimeText}>{this.state.beginTime}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.input}>
                <Text style={styles.label}>持续天数</Text>
                <TextInput style={styles.textInput} value={this.state.duration} keyboardType='number-pad' onChangeText={this.handleDurationChange} />
                {this.state.isDurationWarningVisible ? <Text style={styles.warning} >请输入 1~{MAX_LECTURE_DURATION} 间的数字！</Text> : null}
              </View>
            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={this.handleConfirm}>
              <View style={styles.confirmContainer}>
                <Text style={styles.confirmText}>确认创建</Text>
              </View>
            </TouchableOpacity>
            <DateTimePicker 
              mode='datetime' 
              isVisible={this.state.isDateTimePickerVisible} 
              datePickerModeAndroid='spinner'
              timePickerModeAndroid='spinner'
              onConfirm={this.handleDateTimePicked}
              onCancel={this.hideDateTimePicker}
            />
          </View> 
        </View>
      );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  statusBar: {
    height: StatusBar.currentHeight,
    backgroundColor: 'transparent',
  },
  main: {
    height: Dimensions.get('screen').height - StatusBar.currentHeight,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'center',
    justifyContent: 'flex-end',
  },
  titleText: {
    fontSize: Global.fontSize,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    flex: 1,
    width: Dimensions.get('window').width * 0.8,
    marginTop: 50,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 30,
    flexDirection: 'column',

  },
  label: {
    fontSize: Global.fontSizeSmall,
    color: Global.blue,
  },
  textInput: {
    height: 50,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: Global.blue,
    fontSize: Global.fontSize,
    paddingLeft: 0,
    // paddingVertical: 0,
    // borderBottomRadius: 5,
  },
  beginTimeButton: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: Global.blue,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  beginTimeText: {
    fontSize: Global.fontSize,
    color: 'black',
  },
  warning: {
    fontSize: Global.fontSizeSmall,
    color: '#ffd19a',
  },
  confirmButton: {
    height: 50,
    backgroundColor: '#ff0',
    marginBottom: 50,
    width: Dimensions.get('window').width * 0.8,
    borderRadius: 5,
  },
  confirmContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: Global.blue,
    borderRadius: 5,
  },
  confirmText: {
    textAlign: 'center',
    fontSize: Global.fontSize,
    alignSelf: 'center',
  }
});