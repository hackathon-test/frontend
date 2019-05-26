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
import {Button,  Badge} from 'react-native-elements';
import Styles from '../utils/Styles'
import Icon from 'react-native-vector-icons/FontAwesome5';
import CommentItem from './CommentItem';
import Global from '../utils/Global'
import {SERVER} from "../utils/Constants";

export default class Comment extends Component {
  static navigationOptions = ({navigation}) => {

    const {params} = navigation.state;
    return {
      title: params ? params.title : '讲座',
      headerTitleStyle: Styles.title,
      headerStyle: Styles.headerStyle,
      headerBackTitle: (<View></View>),
      headerLeft: (
        <View style={{marginLeft: 5}}>
          <Button
            type="clear"
            icon={<Icon name="arrow-left" size={20} color={Global.blue} />}
            onPress={() => {
              navigation.navigate('Home')
            }}
          />
        </View>
      ),
      headerRight: (
        <View style={{marginRight: 5}}>
          <Button
            type="clear"
            icon={<Icon name="qrcode" size={25} color={Global.blue} />}
            onPress={this.showQRCode}
          />
        </View>
      )
    }
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
    // TODO 显示讲座二维码
    console.log('Show QR Code!');
  }

  render() {
    return (

      <KeyboardAvoidingView
        keyboardVerticalOffset={StatusBar.currentHeight + Global.titleHeight}
        behavior='padding' style={{flex: 1, justifyContent: 'flex-end'}}>
        <FlatList
          data={this.state.comments}
          keyExtractor={item => item.id + ''}
          renderItem={(item, index) => <CommentItem item={item.item}/>}
        />

        <View style={{backgroundColor: 'red'}}>
          <View style={{flexDirection: 'row', backgroundColor: '#123456', height: 40, alignItems: 'center',}}>
            <Text style={{color: 'white', fontSize: 18}}>昵称</Text>
            <View>
            <TextInput
              onChangeText={(text) => this.setNickname(text)}
              value={this.state.nickname}
              style={{
              textAlign: 'center',
              fontSize: 16,
              color: 'white',
              backgroundColor: 'gray',
              borderRadius: 18,
              height: 30,
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 10,
              paddingRight: 10,
              textAlignVertical: 'center',
              lineHeight: 24
            }} maxLength={6} placeholder={'输入评论昵称'}/>
            </View>
            <Badge
              onPress={() => {
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
                    nowComments.push(this.state.comments)
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
              value={'发送'}/>
          </View>
          <View style={{minHeight: 40, backgroundColor: 'white'}}>
            {/*TODO editing 可编辑*/}
            <TextInput
              onChangeText={(text) => this.setMyComment(text)}
              value={this.state.myComment}
              multiline={true}
              style={styles.inputTextStyle}
              placeholder='在此输入评论内容'
              // underlineColorAndroid={Global.blue}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  modal: {
    width: width * 0.99,
    height: width * 1.5,
    padding: 10,
    backgroundColor: 'white'

  },
  list: {

    backgroundColor: "#F5FCFF"
  },
  badgeStyle: {
    height: 24,
    borderRadius: 12,
    marginRight: 5,
    marginBottom: 8,
    paddingLeft: 3,
    paddingRight: 3,
  },
  badgeTextStyle: {
    fontSize: Global.fontSize - 4,
    textAlignVertical: 'center',
  },
  inputTextStyle: {
    // padding: 0,
    // paddingBottom: 10,
    // paddingLeft: 5,
    // marginTop: 7,
    // fontSize: 17,
    // marginLeft: 8,
  },
})
