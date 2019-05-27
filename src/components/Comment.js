import React, {Component} from 'react';
import {
  ActivityIndicator,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import {Button,  Badge, Divider} from 'react-native-elements';
import Styles from '../utils/Styles'
import Icon from 'react-native-vector-icons/FontAwesome5';
import CommentItem from './CommentItem';
import Global from '../utils/Global'
import Modal from 'react-native-modalbox';

import {SERVER} from "../utils/Constants";
import {formatTime} from "../utils/Date";

export default class Comment extends Component {
  static navigationOptions = {
    header:null
  };

  constructor(props) {
    super(props);
    this.state = {
      lectureId: 0,
      comments: [],
      nickname: '',
      myComment: '',
      loaded: false,
    };

    this.fetchData = this.fetchData.bind(this)
  }

  async componentDidMount() {
    await this.setState({
      lectureId: this.props.navigation.getParam('lectureId')
    });
    this.fetchData();
  }

  fetchData() {
    let url = `${SERVER}/lectures/${this.state.lectureId}`;
    console.log(url)
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    }).then(res => {
      console.log(res)
      res.json().then(json => {
        // const resp = JSON.parse(json)
        console.log(json)

        this.setState({
          comments: json['comments']
        });
      })
    }).catch(
      err => console.log(err)
    );
  }

  setNickname(nickname) {
    this.setState({
      nickname: nickname,
    })
  }

  setMyComment(myComment) {
    this.setState({
      myComment: myComment,
    })
  }

  showQRCode = () => {
    this.refs.modal.open()
  }

  render() {
    const lecture ={
      id: 'da3b5a4b-0ccd-47b3-83d2-c248e4a11c37',
      title: '美国早期国家构建中的"中立化国家"概念美国早期国家构建中的"中立化国家"概念',
      speaker: '陈振宇',
      start: '2019-05-26T11:25:01.909Z',
      validityDays: 5,
      expireDate: '2019-05-28T11:25',
    }
    const navigation = this.props.navigation
    return (
      <View style={{flex:1}}>
        <View style={[Styles.headerStyle,{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}]}>
          <View style={{marginLeft: 5}}>
            <Button
              type="clear"
              icon={<Icon name="arrow-left" size={20} color={Global.blue} />}
              onPress={() => {
                navigation.navigate('Home')
              }}
            />
          </View>
          <Button style={Styles.title} onPress={()=> {this.refs.modal2.open()}} type={'clear'}
                  title={navigation.getParam('title','未知的讲座')}/>
          <View style={{marginRight: 5}}>
            <Button
              type="clear"
              icon={<Icon name="qrcode" size={25} color={Global.blue} />}
              onPress={this.showQRCode}
            />
          </View>
        </View>
        <Modal style={[styles.modal]} position={"center"} ref={"modal"} isDisabled={this.state.isDisabled}>
          <Text>todo通过当前的id在这里添加二维码</Text>
        </Modal>
        <Modal style={[styles.modal2]} position={"center"} ref={"modal2"} isDisabled={this.state.isDisabled}>
          <View style={styles.container}>
            <View style={{padding:10,marginTop:15}}>
              <Text style={{fontSize:18,lineHeight:25}}>{lecture.title}</Text>
            </View>
            <View style={{flex:1,flexDirection:'row',textAlign:'center',alignItems:'center',fontSize:16,marginTop:5,padding:20}}>
              <Text style={{flex:1,textAlign:'center'}}>{formatTime(lecture.start)}</Text>
              <Text style={{flex:1,textAlign:'center'}}>主讲人：{lecture.speaker}</Text>
            </View>
          </View>
        </Modal>
        <KeyboardAvoidingView
          // keyboardVerticalOffset={StatusBar.currentHeight+Global.titleHeight}
          behavior='padding' style={{ flex: 1, justifyContent:'flex-end'}}>

          <FlatList
            data={this.state.comments}
            keyExtractor={item => item.id+''}
            style={{padding:6}}
            renderItem={(item, index) => <CommentItem item={item.item}/>}
          />

          <View style={{ backgroundColor: 'red'}}>
            <Divider height={1}></Divider>
            <View style={{flexDirection: 'row' ,height:40, justifyContent:'space-between', alignItems: 'center',}}>
              {/* <Text style={{color: 'white', fontSize: 18}}>昵称:</Text> */}
              <View>
                <TextInput
                  onChangeText={(text) => this.setNickname(text)}
                  value={this.state.nickname}
                  style={styles.commentInput} maxLength={6} placeholder={'在这里输入你的昵称'}/>
              </View>
              <Badge onPress={() => {
                let commentData={
                  nickName: this.state.nickname,
                  text: this.state.myComment
                }

                let url = `${SERVER}/comments?lectureId=${this.state.lectureId}`
                fetch(url, {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },

                  body: JSON.stringify(commentData)
                }).then(res => {
                  console.log(res)
                  res.json().then(json => {
                    // const resp = JSON.parse(json)
                    console.log(json)

                    let nowComments = []
                    nowComments = nowComments.concat(this.state.comments)
                    nowComments.push(json)
                    this.setState({
                      comments: nowComments
                    })
                  })
                }).catch(
                  err => console.log(err)
                );
              }}
                     key={'send'} textStyle={styles.badgeTextStyle}
                     badgeStyle={styles.badgeStyle}
                     value={'发送'}
              />
            </View>
            <View style={{minHeight:60, backgroundColor: 'white'}}>
              <TextInput
                onChangeText={(text) => this.setMyComment(text)}
                value={this.state.myComment}
                multiline={true}
                style={styles.inputTextStyle}
                placeholder='在此输入评论内容'
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>

    )
  }
}
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    backgroundColor: 'white',
  },
  modal: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: width*0.8,
    width: width*0.8,
  },
  modal2: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: width*0.5,
    width: width*0.8,
  },
  list: {
    backgroundColor: "#F5FCFF"
  },
  badgeStyle: {
    height: 24,
    // borderRadius: 12,
    backgroundColor: 'white',
    marginRight: 5,
    marginBottom: 8,
    paddingLeft: 3,
    paddingRight: 3,
    alignSelf: 'center',
  },
  badgeTextStyle: {
    fontSize: Global.fontSize - 4,
    textAlignVertical: 'center',
  },
  commentInput:{
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    borderRadius: 18,
    height: 30,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    textAlignVertical: 'center',
    lineHeight: 24
  },
  inputTextStyle: {
    paddingTop: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
  },
})
