import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import Styles from '../utils/Styles'
import Icon from 'react-native-vector-icons/FontAwesome5';
import CommentItem from './CommentItem';
import Global from '../utils/Global'
import Modal from 'react-native-modalbox';

import {SERVER} from "../utils/Constants";
import {formatTime} from "../utils/Date";
import {show_toast} from '../utils/MyToast';
import {save_lecture_history} from "../realm/lecture_history";
import MyQRCode from './MyQRCode';


export default class Comment extends Component {
  static navigationOptions = {
    header:null
  };

  constructor(props) {
    super(props);
    console.log('enter');
    this.state = {
      lectureId: 0,
      lectureTitle: '未知的讲座',
      lectureSpeaker: '',
      lectureStart: '',
      lectureExpire: '',
      commentEditable: false,
      comments: [],
      commentsLastTime: '',
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
    show_toast(url);
    console.log(url);
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    }).then(res => {
      console.log(res);
      show_toast(res);
      res.json().then(async json => {
        // const resp = JSON.parse(json)
        console.log(json)

        await this.setState({
          // lecture: id, title, speaker, start, validityDays, expire
          // lectureId: json['lecture']['id'],
          lectureTitle: json['lecture']['title'],
          lectureSpeaker: json['lecture']['speaker'],
          lectureStart: json['lecture']['start'],
          lectureExpire: json['lecture']['expire'],
          commentEditable: json['editable'],
          comments: json['comments'],
          commentsLastTime: json['lastCommentTime'],
        });

        // 如果已经超出评论时限
        if (!this.state.commentEditable) {
          let msg;
          let nowTime = formatTime(new Date())
          if (nowTime < json['lecture']['start']) {
            msg = '该次讲座未开始，现不能评论哦～'
          } else if (nowTime > json['lecture']['expire']) {
            msg = '该次讲座已到期，现不能评论哦～'
          }
          msg && show_toast(msg)
        }

        // 保存到个人历史记录中
        save_lecture_history({
          id: this.state.lectureId,
          title: this.state.lectureTitle,
          speaker: this.state.lectureSpeaker,
          expire: this.state.lectureExpire,
        })

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

  _isContentValid () {
    return this.state.nickname !== '' && this.state.myComment !== '';
  }

  handleSend = () => {
    if (!this._isContentValid()) {
      Toast.show('昵称和内容都不能为空哦', {
        duration: Toast.durations.LONG,
        position: 0,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: '#C1E0F3',
        textColor: 'black',
        textStyle: {
          fontSize: 14
        }
      })
      return;
    }
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
      console.log(res);
      // TODO 判断返回信息，可能会有错误，屏蔽词
      res.json().then(json => {
        // const resp = JSON.parse(json)
        console.log(json)
        let nowComments = []
        nowComments = nowComments.concat(this.state.comments)
        nowComments.push(json)
        this.setState({
          comments: nowComments,
          myComment: ''
        })
      })
    }).catch(
      err => console.log(err)
    );
  }
  loadmore(){
    //todo fjj gcm
    console.log("load more ")
    let url = `${SERVER}/comments?lectureId=${this.state.lectureId}&lastCommentTime=${this.state.commentsLastTime}`
    fetch(url, {
      method: 'GET'
    }).then(res => {
      console.log(res);
      // TODO 判断返回信息，可能会有错误，屏蔽词
      res.json().then(json => {
        // const resp = JSON.parse(json)
        console.log(json)
        let newComments = json;
        if (newComments.length !== 0) {
          this.setState({
            comments: this.state.comments.concat(newComments),
            commentsLastTime: newComments[newComments.length-1].createdAt
          })
        }
      })
    }).catch(
      err => console.log(err)
    );
  }
  _scroll;
  _flatList;
  render() {
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
                  title={this.state.lectureTitle}/>
          <View style={{marginRight: 5}}>
            <Button
              type="clear"
              icon={<Icon name="qrcode" size={25} color={Global.blue} />}
              onPress={this.showQRCode}
            />
          </View>
        </View>
        <Modal style={[styles.modal]} position={"center"} ref={"modal"} isDisabled={this.state.isDisabled}>
          <MyQRCode lectureId={this.state.lectureId} />
        </Modal>
        <Modal style={[styles.modal2]} position={"center"} ref={"modal2"} isDisabled={this.state.isDisabled}>
          <View style={styles.container}>
            <View style={{padding:10,marginTop:15}}>
              <Text style={{fontSize:18,lineHeight:25}}>{this.state.lectureTitle}</Text>
            </View>
            <View style={{flex:1,flexDirection:'row',textAlign:'center',alignItems:'center',fontSize:16,marginTop:5,padding:20}}>
              <Text style={{flex:1,textAlign:'center'}}>{formatTime(this.state.lectureStart)}</Text>
              <Text style={{flex:1,textAlign:'center'}}>主讲人：{this.state.lectureSpeaker}</Text>
            </View>
          </View>
        </Modal>
        <KeyboardAvoidingView
          // keyboardVerticalOffset={StatusBar.currentHeight+Global.titleHeight}
          behavior='padding' style={{ flex: 1, justifyContent:'flex-end'}}>
          <ScrollView  ref={(scroll)=>this._scroll = scroll}>
          <FlatList
            ref={(flatList)=>this._flatList = flatList}
            data={this.state.comments}
            keyExtractor={item => item.id+''}
            style={{padding:6}}
            renderItem={(item, index) => <CommentItem item={item.item}/>}
          />
          <Button onPress={()=>{this.loadmore()
            this._flatList.scrollToEnd()
            this._scroll.scrollToEnd()}}
                  containerStyle={{flex:1,justifyContent:'center',alignItems:'center'}}  type={'clear'} title={'加载更多'}/>
          </ScrollView>
          <View style={{ backgroundColor: 'transparent'}}>
            <Divider height={0.2}></Divider>
            <View style={{flexDirection: 'row', height:40, justifyContent:'space-between', alignItems: 'center',}}>
              {/* <Text style={{color: 'white', fontSize: 18}}>昵称:</Text> */}
              <View>
                <TextInput
                  editable={this.state.commentEditable}
                  onChangeText={(text) => this.setNickname(text)}
                  value={this.state.nickname}
                  style={styles.nicknameInput} 
                  maxLength={6}
                  minLength={1}
                  placeholder={'在这里输入你的昵称'}/>
              </View>
              <TouchableOpacity style={[styles.sendButton, {disabled: this.state.commentEditable}]} onPress={this.handleSend}>
                <Text style={styles.sendText}>发表</Text>
              </TouchableOpacity>
            </View>
            <View style={{minHeight:40, backgroundColor: 'white'}}>
              <TextInput
                editable={this.state.commentEditable}
                onChangeText={(text) => this.setMyComment(text)}
                value={this.state.myComment}
                multiline={true}
                style={styles.inputTextStyle}
                placeholder='请尽量让自己的发言能帮助到别人'
                returnKeyType='send'
                // TODO max number of lines
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
  nicknameInput: {
    textAlign: 'left',
    fontSize: 16,
    color: 'black',
    borderRadius: 18,
    height: 30,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 10,
    textAlignVertical: 'center',
    marginHorizontal: 10,
  },
  inputTextStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  sendButton: {
    marginRight: 10,
  },
  sendText: {
    fontSize: 16,
    color: Global.blue,
  }
})
